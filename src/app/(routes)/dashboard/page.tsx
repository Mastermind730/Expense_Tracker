"use client";
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import axios from 'axios';
import BarChartDash from './_components/BarChartDash';
import BudgetItem from './budgets/_components/BudgetItem';

const Page = () => {
  const [budget,setBudget]=useState([]);
    const fetchBudgets = async () => {
        try {
          const response = await axios.get('/api/getBudgets');
          setBudget(response.data.budgets);
        } catch (error) {
          console.error('Error fetching budgets:', error);
        }
      };
    
      useEffect(() => {
        fetchBudgets();
      }, []);
  const {user}=useUser();
  return (
    <div className='p-2'>
      <h2 className='font-bold text-3xl'>Hii,{user?.fullName} </h2>
      <p className='text-gray-500'>Here&apos; what happening with your money. Lets manage your expenses</p>
      <CardInfo budget={budget}/>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
          <div className='md:col-span-2'>

<BarChartDash budgetList={budget}/>
          </div>
          <div className='grid gap-5'>
            <h2 className='font-bold text-lg'>Latest Budgets</h2>
{budget.map((item,index)=>(
  <BudgetItem budget={item} key={index}/>
))}
          </div>
      </div>
    </div>
  )
}

export default Page