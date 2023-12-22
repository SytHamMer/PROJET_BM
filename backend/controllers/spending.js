const Spending = require('../models/spending');
const Category = require('../models/category'); // Import category
const jwt = require('jsonwebtoken');

//create category 
exports.createSpending = async (req, res, next) => {
    const { value, category } = req.body;

    try {
        const newSpending = await Spending.create({ value, category });

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

// delete SPENDING
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
