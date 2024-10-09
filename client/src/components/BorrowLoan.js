import React, { useState } from 'react';
import axios from 'axios';

const BorrowLoan = ({ onBorrow }) => {
  const [loanId, setLoanId] = useState('');

  const handleBorrow = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/borrow/${loanId}`);
      onBorrow(response.data.loan);
      alert(response.data.message);
    } catch (error) {
      console.error('Error borrowing loan:', error);
      alert('Failed to borrow loan.');
    }
    setLoanId('');
  };

  

  return (
    <form onSubmit={handleBorrow}>
      <h2>Borrow Loan</h2>
      <input
        type="text"
        placeholder="Loan ID"
        value={loanId}
        onChange={(e) => setLoanId(e.target.value)}
        required
      />
      <button type="submit">Borrow</button>
    </form>
  );
};

export default BorrowLoan;
