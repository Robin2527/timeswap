import React, { useState, useEffect } from 'react';

// import { CONTRACT_ADDRESSES, ABI } from './contracts';

// // Example usage
// const lendingContractAddress = CONTRACT_ADDRESSES.lendingContract;
// const lendingContractABI = ABI.lendingABI;


const AddLoan = ({ onAdd, editingLoan, onUpdate }) => {
  const [amount, setAmount] = useState('');
  const [collateral, setCollateral] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (editingLoan) {
      setAmount(editingLoan.amount);
      setCollateral(editingLoan.collateral);
      setInterestRate(editingLoan.interestRate);
      setDuration(editingLoan.duration)
    }
  }, [editingLoan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loanData = { amount, collateral, interestRate, duration };

    if (editingLoan) {
      onUpdate({ ...editingLoan, ...loanData });
    } else {
      onAdd(loanData);
    }
    setAmount('');
    setCollateral('');
    setInterestRate('');
    setDuration('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingLoan ? 'Edit Loan' : 'Add Loan'}</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Collateral"
        value={collateral}
        onChange={(e) => setCollateral(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Interest Rate"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      {" "}
      <button type="submit" >{editingLoan ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default AddLoan;
