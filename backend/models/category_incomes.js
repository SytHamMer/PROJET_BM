const mongoose = require('mongoose');

const categoryIncomesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence l'ID de l'utilisateur
  incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }] // Référence les dépenses liées à cette catégorie
});

module.exports = mongoose.model('Category_Incomes', categoryIncomesSchema);
