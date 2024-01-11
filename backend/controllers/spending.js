const Spending = require('../models/spending');
const Category = require('../models/category_spendings'); // Import category
const jwt = require('jsonwebtoken');
const moment = require('moment');


// CREATE SPENDING 
exports.createSpending = async (req, res, next) => {
    const { name, value, date, category,idUser } = req.body;

    try {
        const newSpending = await Spending.create({ name, value, date, category,idUser });

        // add the spending to the category
        await Category.findByIdAndUpdate(
            category,
            { $push: { spendings: newSpending._id } },
            { new: true } 
        );

        res.status(201).json({ message: 'Spending created!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create spending' });
    }
};

// DELETE SPENDING

exports.deleteSpending = async (req, res, next) => {
    const spendingId = req.params.id;

    try {

        const spending = await Spending.findById(spendingId);
        const categoryId = spending.category;

        await Spending.deleteOne({ _id: spendingId });

        await Category.findByIdAndUpdate(
            categoryId,
            { $pull: { spending: spendingId } },
            { new: true } 
        );

        res.status(200).json({ message: 'Spending deleted!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete spending' });
    }
};


// GET ALL SPENDING

exports.getAllSpendings = (req, res, next) => {
    Spending.find()
        .then(spendings => res.status(200).json(spendings))
        .catch(error => res.status(400).json({ error }));
};


// GET BYIDUSER

exports.getByIDUser = (req, res, next) => {
    const { id } = req.params;
    // console.log(id)
    Spending.find({ idUser: id })
      .then(spendings => {
        res.status(200).json({ spendings });
      })
      .catch(error => {
        res.status(400).json({ error });
      });
  };

// DELETE ALL SPENDINGS

exports.deleteAllSpendings = (req, res, next) => {
    Spending.deleteMany()
      .then(() => res.status(200).json({ message: 'All spendings deleted!' }))
      .catch(error => res.status(400).json({ error }));
  };

// GET ALL SPENDING

exports.getSpendingstwoDates = (req, res, next) => {

    const { id } = req.params;
    let amount = 0;
    const { startDate, endDate } = req.body; 
    const formattedStartDate = moment(startDate, 'YYYY-MM').startOf('month');
    const formattedEndDate = moment(endDate, 'YYYY-MM').endOf('month');

    Spending.find({
        idUser: id ,
        date: {
                $gte: formattedStartDate,
                $lte: formattedEndDate
                    }    })
    .then(spendings => {spendings.forEach((spending)=>{
        amount += spending.value
        // console.log(spending.value)
    })
    res.status(200).json(amount)}
        )
    .catch(error => res.status(400).json({ error }));
};

exports.getSpendingsSixMonths = async (req, res, next) => {
    const { id } = req.params;
    const today = moment();
    const budgetHistory = [];
  
    for (let i = 0; i < 6; i++) {
      const startDate = today.clone().subtract(i, 'months').startOf('month').toDate();
      const formattedStartDate = moment(startDate).startOf('month');
      const formattedEndDate = moment(startDate).endOf('month');

      try {
        const spendings = await Spending.find({
          idUser: id,
          date: {
            $gte: formattedStartDate,
            $lt: formattedEndDate,
          },
        });
        const totalSpending = spendings.reduce((total, spending) => total + spending.value, 0);
        budgetHistory.push({ startDate: formattedStartDate.format('YYYY-MM'), totalSpending });
      } catch (error) {
        console.error(`Error calculating spending for month ${i}: ${error}`);
        budgetHistory.push({ startDate: formattedStartDate.format('YYYY-MM'), totalSpending: 0 });
      }
    }
  
    res.json(budgetHistory.reverse());
  };
  