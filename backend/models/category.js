const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  monthly_limit: { type: Number, required: true },
  spendings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spending' }] // Référence les dépenses liées à cette catégorie
});

module.exports = mongoose.model('Category', categorySchema);
