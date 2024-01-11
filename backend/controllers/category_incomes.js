const CategoryIncomes = require('../models/category_incomes');
const Income = require('../models/income');
const jwt = require('jsonwebtoken');
const moment = require('moment');


// CREATE
exports.createCategory = (req, res, next) => {
  const  name  = req.body.name;
  const idUser  = req.body.idUser;
  console.log(idUser); 
  
  const category = new CategoryIncomes({ name, idUser });

  category.save()
    .then(() => res.status(201).json({ message: 'Category created!' }))
    .catch(error => res.status(400).json({ error }));
};
// DELETE
exports.deleteCategory = (req, res, next) => {
  const { id } = req.params;

  CategoryIncomes.deleteOne({ _id: id })
    .then(() => res.status(200).json({ message: 'Category deleted!' }))
    .catch(error => res.status(400).json({ error }));
};


// GET ALL
exports.getAllCategories = (req, res, next) => {
  CategoryIncomes.find()
    .populate('incomes') // get spendings link to the category
    .then(categories => res.status(200).json(categories))
    .catch(error => res.status(400).json({ error }));
};

// GET BYIDUSER

exports.getByIDUser = (req, res, next) => {
  const { id } = req.params;
  CategoryIncomes.find({ idUser: id })
    .then(categories => {
      console.log("category_incomes")
      console.log(categories)
      res.status(200).json({ categories });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

// DELETE ALL CATEGORIES
exports.deleteAllCategories = (req, res, next) => {
  CategoryIncomes.deleteMany()
    .then(() => res.status(200).json({ message: 'All categories deleted!' }))
    .catch(error => res.status(400).json({ error }));
};


// GET TOTAL INCOMES BETWEEN TWO DATES FOR CATEGORY
exports.getTotalIncomesBetweenDates = (req, res, next) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body; 
  const formattedStartDate = moment(startDate, 'YYYY-MM').startOf('month');
  const formattedEndDate = moment(endDate, 'YYYY-MM').endOf('month');
  
  console.log(formattedStartDate, formattedEndDate)

  CategoryIncomes.findById(id)
    .populate({
      path: 'incomes',
      match: {
        date: {
          $gte: formattedStartDate,
          $lte: formattedEndDate
        }
      },
      select: 'value date'
    })
    .then(category => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      console.log(category.incomes);
      const incomes = category.incomes.filter(s => s.date >= formattedStartDate && s.date <= formattedEndDate);
      console.log(incomes);
      const totalIncome = incomes.reduce((total, s) => total + s.value, 0);
      res.status(200).json({ total_income_between_dates: totalIncome });
    })
    .catch(error => res.status(500).json({ error }));
};

// GET INCOMESTOTALS FOR EACH CATEGORY BY USER
exports.getEachCategoryIncomesTotal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;
    const formattedStartDate = moment(startDate, 'YYYY-MM').startOf('month');
    const formattedEndDate = moment(endDate, 'YYYY-MM').endOf('month');
    console.log(formattedStartDate, formattedEndDate, id);
 
    const categoryTotals = await CategoryIncomes.find({ idUser: id });
 
    // Formatage des résultats en un objet avec le nom de la catégorie comme clé et liste des dépenses
    const categoryIncomesTotal = {};
 
    // Parcourir chaque catégorie
    for (const category of categoryTotals) {
      const incomesDetails = await Income.find({
        _id: { $in: category.incomes }, // Rechercher les dépenses associées à la catégorie
        date: { $gte: formattedStartDate, $lte: formattedEndDate } // Filtrer par intervalle de dates
      });
 
      // Calculer la somme des valeurs de dépenses
      const totalValue = incomesDetails.reduce((total, income) => total + income.value, 0);
 
      // Ajouter les détails à l'objet de résultats
      categoryIncomesTotal[category.name] = totalValue;
    }
 
    res.status(200).json(categoryIncomesTotal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
