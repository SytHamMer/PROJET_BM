const Income = require('../models/income');
const CategoryIncomes = require('../models/category_incomes'); // Import category
const jwt = require('jsonwebtoken');

//create income 
exports.createIncome = async (req, res, next) => {
    const { value, category,idUser } = req.body;

    try {
        const newIncome = await Income.create({ value, category,idUser });

        // add the spending to the category
        await CategoryIncomes.findByIdAndUpdate(
            category,
            { $push: { incomes: newIncome._id } },
            { new: true } 
        );

        res.status(201).json({ message: 'Income created!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create income' });
    }
};

// delete Income
exports.deleteIncome = async (req, res, next) => {
    const incomeId = req.params.id;

    try {

        const income = await Income.findById(incomeId);
        const categoryId = income.category;

        await Income.deleteOne({ _id: incomeId });

        await CategoryIncomes.findByIdAndUpdate(
            categoryId,
            { $pull: { income: incomeId } },
            { new: true } 
        );

        res.status(200).json({ message: 'income deleted!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete income' });
    }
};


// GET ALL INCOMES
exports.getAllIncomes = (req, res, next) => {
    Income.find()
        .then(incomes => res.status(200).json(incomes))
        .catch(error => res.status(400).json({ error }));
};

// GET BYIDUSER

exports.getByIDUser = (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    Income.find({ idUser: id })
      .then(incomes => {
        res.status(200).json({ incomes });
      })
      .catch(error => {
        res.status(400).json({ error });
      });
  };


// DELETE ALL INCOMES

exports.deleteAllIncomes = (req, res, next) => {
    Income.deleteMany()
      .then(() => res.status(200).json({ message: 'All incomes deleted!' }))
      .catch(error => res.status(400).json({ error }));
  };

//GET SUM ALL INCOMES

exports.getSumAllIncomes = async (req, res, next) => {
    try {
        const result = await Income.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$value' }
                }
            }
        ]);

        if (result.length > 0) {
            res.status(200).json({ total_income: result[0].total });
        } else {
            res.status(200).json({ total_income: 0 });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get sum of all incomes' });
    }
};
