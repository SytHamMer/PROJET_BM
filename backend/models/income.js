const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  name : {type : String},
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category_Incomes', required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

});

module.exports = mongoose.model('Income', incomeSchema);
