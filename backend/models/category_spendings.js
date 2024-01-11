const mongoose = require('mongoose');

const categorySpendingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  monthly_limit: { type: Number, required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  spendings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spending' }] // Référence les dépenses liées à cette catégorie
});

module.exports = mongoose.model('Category_Spendings', categorySpendingsSchema);