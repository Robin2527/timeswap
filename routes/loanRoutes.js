const express = require('express');
const { getAllLoans, createLoan, getLoanById, deleteLoan, updateLoan,
    lendLoanController,
  borrowLoanController,
 } = require('../controllers/loanController');
const router = express.Router();

// Get all loans
router.get('/loans', getAllLoans);

// Create a new loan
router.post('/loans', createLoan);

// Get a single loan by ID
router.get('/loans/:id', getLoanById);

// Delete a loan
router.delete('/loans/:id', deleteLoan);

// update a loan
router.put('/loans/:id', updateLoan);

// Lend a loan
router.post('/loan/lend', lendLoanController);

// Borrow a loan
router.post('/borrow/:id', borrowLoanController);

module.exports = router;
