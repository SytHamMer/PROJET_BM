const Income = require('../models/income');
const CategoryIncomes = require('../models/category_incomes'); // Import category
const jwt = require('jsonwebtoken');
const moment = require('moment');

//create income 
exports.createIncome = async (req, res, next) => {
    const { value,date, category,idUser } = req.body;
    console.log("DANS LE BACK")

    try {
        const newIncome = await Income.create({ value, date, category,idUser });

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

exports.getIncomestwoDates = (req, res, next) => {
    const { id } = req.params;
    let amount = 0;
    const { startDate, endDate } = req.body; 
    const formattedStartDate = moment(startDate, 'YYYY-MM').startOf('month');
    const formattedEndDate = moment(endDate, 'YYYY-MM').endOf('month');
    Income.find({
        idUser: id ,
        date: {
                $gte: formattedStartDate,
                $lte: formattedEndDate
                    }    })
    .then(incomes => {incomes.forEach((income)=>{
        amount += income.value
        console.log(income.value)
    })
    res.status(200).json(amount)}
        )
    .catch(error => res.status(400).json({ error }));
};