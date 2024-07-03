"use client";
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import BudgetItem from './BudgetItem'
import axios from 'axios';
const BudgetList = () => {
   const [budgetList,setBudgetList]=useState([]);
   useEffect(() => {
    const fetchBudgets = async () => {
      const response = await axios.get('/api/budgets');
      
      setBudgetList(response.data);
    };

    fetchBudgets();
  }, []);
  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget/>
        {budgetList.map((budget, index) => (
  <BudgetItem key={index} budget={budget} />
))}

        </div>
    </div>
  )
}

export default BudgetList