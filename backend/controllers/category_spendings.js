const CategorySpendings = require('../models/category_spendings');
const Spending = require('../models/spending');
const jwt = require('jsonwebtoken');
const moment = require('moment');


// CREATE
exports.createCategory = (req, res, next) => {
  const { name, monthly_limit, idUser } = req.body;
  const category = new CategorySpendings({ name, monthly_limit,idUser });

  category.save()
    .then(() => res.status(201).json({ message: 'Category created!' }))
    .catch(error => res.status(400).json({ error }));
};




// DELETE
exports.deleteCategory = (req, res, next) => {
  const { id } = req.params;

  CategorySpendings.deleteOne({ _id: id })
    .then(() => res.status(200).json({ message: 'Category deleted!' }))
    .catch(error => res.status(400).json({ error }));
};


// GET ALL
exports.getAllCategories = (req, res, next) => {
  CategorySpendings.find()
    .populate('spendings') // get spendings link to the category
    .then(categories => res.status(200).json(categories))
    .catch(error => res.status(400).json({ error }));
};






// DELETE ALL CATEGORIES
exports.deleteAllCategories = (req, res, next) => {
  CategorySpendings.deleteMany()
    .then(() => res.status(200).json({ message: 'All categories deleted!' }))
    .catch(error => res.status(400).json({ error }));
};
// GET MONTHLY LIMIT
exports.getMonthlyLimit = (req, res, next) => {
  const { id } = req.params;

  CategorySpendings.findById(id)
    .select('monthly_limit')
    .then(category => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ monthly_limit: category.monthly_limit });
    })
    .catch(error => res.status(500).json({ error }));
};




// GET BYIDUSER

exports.getByIDUser = (req, res, next) => {
  const { id } = req.params;
  CategorySpendings.find({ idUser: id })
    .then(categories => {
      // console.log("category_spendings")
      // console.log(categories)
      res.status(200).json({ categories });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

// GET TOTAL SPENDING BETWEEN TWO DATES
exports.getTotalSpendingsBetweenDates = (req, res, next) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body; 
  const formattedStartDate = moment(startDate, 'YYYY-MM').startOf('month');
  const formattedEndDate = moment(endDate, 'YYYY-MM').endOf('month');
  
  // console.log(formattedStartDate, formattedEndDate)
  CategorySpendings.findById(id)
    .populate({
      path: 'spendings',
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
      console.log(category.spendings);
      const spendings = category.spendings.filter(s => s.date >= formattedStartDate && s.date <= formattedEndDate);
      console.log(spendings);
      const totalSpending = spendings.reduce((total, s) => total + s.value, 0);
      res.status(200).json({ total_spending_between_dates: totalSpending });
    })
    .catch(error => res.status(500).json({ error }));
};

// GET TOTAL BUDGET BETWEEN TWO DATES
exports.getTotalBudget = (req, res, next) => {
  const { id } = req.params;
  let amount = 0;

  CategorySpendings.find({
    idUser: id,})
  .then(categories => {
    categories.forEach((c) => {
      amount += c.monthly_limit;
    });
    res.status(200).json({ amount });  
  })
  .catch(error => {
    res.status(400).json({ error: error.message });
  });
};

// GET SPENDINGTOTALS FOR EACH CATEGORY BY USER
exports.getEachCategorySpendingsTotal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;
    const formattedStartDate = moment(startDate, 'YYYY-MM').startOf('month');
    const formattedEndDate = moment(endDate, 'YYYY-MM').endOf('month');
    console.log(formattedStartDate, formattedEndDate, id);
 
    const categoryTotals = await CategorySpendings.find({ idUser: id });
 
    // Formatage des résultats en un objet avec le nom de la catégorie comme clé et liste des dépenses
    const categorySpendingsTotal = {};
 
    // Parcourir chaque catégorie
    for (const category of categoryTotals) {
      const spendingsDetails = await Spending.find({
        _id: { $in: category.spendings }, // Rechercher les dépenses associées à la catégorie
        date: { $gte: formattedStartDate, $lte: formattedEndDate } // Filtrer par intervalle de dates
      });
 
      // Calculer la somme des valeurs de dépenses
      const totalValue = spendingsDetails.reduce((total, spending) => total + spending.value, 0);
 
      // Ajouter les détails à l'objet de résultats
      categorySpendingsTotal[category.name] = {
        monthlyLimit: category.monthly_limit,
        totalValue: totalValue
      };
    }
 
    res.status(200).json(categorySpendingsTotal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
