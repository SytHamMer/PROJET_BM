const CategoryIncomes = require('../models/category_incomes');
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





// GET TOTAL INCOMES BETWEEN TWO DATES
exports.getTotalSpendingsBetweenDates = (req, res, next) => {
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
