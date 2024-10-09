const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  collateral: {
    type: String,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Loan', loanSchema);