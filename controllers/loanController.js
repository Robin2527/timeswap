const Loan = require('../models/Loan');
const { lendLoan, borrowLoan } = require('../services/loanService');

// Get all loans
const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new loan
const createLoan = async (req, res) => {
    console.log("--------")
  const loan = new Loan({
    amount: req.body.amount,
    collateral: req.body.collateral,
    interestRate: req.body.interestRate,
    duration: req.body.duration
  });

  try {
    const newLoan = await loan.save();
    res.status(201).json(newLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single loan by ID
const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a loan
const deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.json({ message: 'Loan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateLoan = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedLoan = await Loan.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedLoan) {
        return res.status(404).json({ message: 'Loan not found' });
      }
  
      res.json(updatedLoan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const lendLoanController = async (req, res) => {
    try {
      const loanData = req.body;
      const newLoan = await lendLoan(loanData);
      res.status(201).json(newLoan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const borrowLoanController = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await borrowLoan(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: error.message });
    }
  };

  const calculateInterest = (principal, rate, duration) => {
    return (principal * rate * duration) / 100; // Example simple interest formula
  };
  
  // Simulated loan maturity check
  const checkMaturity = (loan) => {
    const currentDate = new Date();
    const dueDate = new Date(loan.dueDate);
    return currentDate > dueDate;
  };
  
  // Simulate borrowing functionality
  const borrow = async (req, res) => {
    const loan = await Loan.findById(req.params.id);
  
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
  
    const { collateral, rate, duration } = req.body; // Simulated loan details from frontend
  
    // Calculate debt and interest (simulating TimeSwap behavior)
    const interest = calculateInterest(loan.amount, rate, duration);
    const totalDebt = loan.amount + interest;
  
    loan.status = 'borrowed';
    loan.interest = interest;
    loan.totalDebt = totalDebt;
    loan.collateral = collateral;
    
    await loan.save();
  
    return res.json({
      message: 'Loan borrowed successfully',
      loan: {
        ...loan.toObject(),
        interest,
        totalDebt,
      },
    });
  };
  
  // Simulate loan repayment functionality
  const repayLoan = async (req, res) => {
    const loan = await Loan.findById(req.params.id);
  
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
  
    if (checkMaturity(loan)) {
      return res.status(400).json({ error: 'Loan is already matured, cannot repay' });
    }
  
    const { amountPaid } = req.body;
  
    if (amountPaid >= loan.totalDebt) {
      loan.status = 'repaid';
    } else {
      loan.totalDebt -= amountPaid;
    }
  
    await loan.save();
  
    return res.json({ message: 'Loan repaid', loan });
  };

module.exports = {
  getAllLoans,
  createLoan,
  getLoanById,
  deleteLoan,
  updateLoan,
  lendLoanController,
  borrowLoanController,
  borrow,
  repayLoan,
};
