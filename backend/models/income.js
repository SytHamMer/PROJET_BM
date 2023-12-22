const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category_Incomes', required: true } 
});

module.exports = mongoose.model('Income', incomeSchema);
