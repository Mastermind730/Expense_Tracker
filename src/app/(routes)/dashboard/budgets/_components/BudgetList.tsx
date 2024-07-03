"use client";
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import BudgetItem from './BudgetItem';
import axios from 'axios';

const BudgetList: React.FC = () => {
  const [budgetList, setBudgetList] = useState([]);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('/api/getBudgets');
      setBudgetList(response.data.budgets);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={fetchBudgets} />
        {budgetList?.length>0?budgetList.map((budget, index) => (
          <BudgetItem key={index} budget={budget} />
        ))
      :[1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className='w-full bg-slate-200 rounded-md h-[150px] animate-pulse'>

        </div>
      ))
      }
      </div>
    </div>
  );
};

export default BudgetList;
