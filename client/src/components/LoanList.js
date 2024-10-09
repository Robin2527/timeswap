import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoanList = ({ onDelete, onEdit }) => {
	const [loans, setLoans] = useState([]);

	useEffect(() => {
		const fetchLoans = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/loans');
				setLoans(response.data);
			} catch (error) {
				console.error('Error fetching loans:', error);
			}
		};

		fetchLoans();
	}, []);

	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:5000/api/loans/${id}`);
		onDelete(id);
	};

	const handleEdit = (loan) => {
		onEdit(loan);
	};


	return (
		<div>
			<h2>Loan List</h2>
			<ul>
				{loans.map((loan) => (
					<li key={loan._id}>
						Amount: {loan.amount}, Collateral: {loan.collateral}, Interest Rate: {loan.interestRate}%, Duration: {loan.duration} days {" "}
						<button onClick={() => handleEdit(loan)}>Edit</button> {" "}
						<button onClick={() => handleDelete(loan._id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LoanList;
