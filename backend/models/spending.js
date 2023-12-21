// const mongoose = require('mongoose');


// const spendingSchema = new mongoose.Schema({
//     value : Number,
//     date:{ type: Date, default: Date.now }
// })

// module.exports = mongoose.model("Spending", spendingSchema);
const mongoose = require('mongoose');

const spendingSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true } 
});

module.exports = mongoose.model('Spending', spendingSchema);
