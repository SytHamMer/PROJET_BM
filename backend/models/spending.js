const mongoose = require('mongoose');

const spendingSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category_Spendings', required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Spending', spendingSchema);
