const CategorySpendings = require('../models/category_spendings');
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


// GET BYIDUSER




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
  console.log(id)
  CategorySpendings.find({ idUser: id })
    .then(categories => {
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
  
  console.log(formattedStartDate, formattedEndDate)
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




