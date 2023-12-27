const mongoose = require('mongoose');

const categoryIncomesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }]
});

module.exports = mongoose.model('Category_Incomes', categoryIncomesSchema);
