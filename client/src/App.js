import React, { useState } from 'react';
import { WagmiConfig, createClient } from 'wagmi';
import LoanList from './components/LoanList';
import AddLoan from './components/AddLoan';
import BorrowLoan from './components/BorrowLoan';
import axios from 'axios';

// Create a Wagmi client
const client = createClient({
  autoConnect: true,
  provider: (provider) => provider,
});

const App = () => {
  const [loans, setLoans] = useState([]);
  const [editingLoan, setEditingLoan] = useState(null);

  const handleAddLoan = (newLoan) => {
    setLoans((prevLoans) => [...prevLoans, newLoan]);
  };

  const handleDeleteLoan = (id) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan._id !== id));
  };

  const handleEditLoan = (loan) => {
    setEditingLoan(loan);
  };

  const handleUpdateLoan = async (updatedLoan) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/loans/${updatedLoan._id}`, updatedLoan);
      setLoans((prevLoans) =>
        prevLoans.map((loan) => (loan._id === response.data._id ? response.data : loan))
      );
      setEditingLoan(null);
    } catch (error) {
      console.error('Error updating loan:', error);
    }
  };

  const handleBorrowLoan = (loan) => {
    setLoans((prevLoans) => [...prevLoans, loan]);
  };

  return (
    <WagmiConfig client={client}>
      <div>
        <h1>TimeSwap V2</h1>
        <AddLoan onAdd={handleAddLoan} editingLoan={editingLoan} onUpdate={handleUpdateLoan} />
        <LoanList loans={loans} onDelete={handleDeleteLoan} onEdit={handleEditLoan} />
        <BorrowLoan onBorrow={handleBorrowLoan} />
      </div>
    </WagmiConfig>
  );
};

export default App;
