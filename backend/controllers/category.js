const Category = require('../models/category');
const jwt = require('jsonwebtoken');

// CREATE
exports.createCategory = (req, res, next) => {
  const { name, monthly_limit } = req.body;
  const category = new Category({ name, monthly_limit });

  category.save()
    .then(() => res.status(201).json({ message: 'Category created!' }))
    .catch(error => res.status(400).json({ error }));
};
// DELETE
exports.deleteCategory = (req, res, next) => {
  const { id } = req.params;

  Category.deleteOne({ _id: id })
    .then(() => res.status(200).json({ message: 'Category deleted!' }))
    .catch(error => res.status(400).json({ error }));
};


// GET ALL
exports.getAllCategories = (req, res, next) => {
  Category.find()
    .populate('spendings') // get spendings link to the category
    .then(categories => res.status(200).json(categories))
    .catch(error => res.status(400).json({ error }));
};
