"use client";
import { useUser } from '@clerk/nextjs';
import React, { useCallback, useEffect, useState } from 'react';
import CardInfo from './_components/CardInfo';
import axios from 'axios';
import BarChartDash from './_components/BarChartDash';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseList from './expenses/_components/ExpenseList';
import { Expenses } from '@prisma/client';

const Page = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const { user } = useUser();

  const getExpenses = useCallback(async () => {
    if (!user) return;
    try {
      const res = await axios.post("/api/getAllExpenses", { user });
      const data = await res.data;
      console.log(data);
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }, [user]);

  const fetchBudgets = useCallback(async () => {
    try {
      const response = await axios.get('/api/getBudgets');
      const budgets = await response.data.budgets;
      setBudgets(budgets);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  }, []);
  const deleteExpense = async (expenseId: number) => {
    try {
      await axios.post("/api/deleteExpense", { id: expenseId });
      setExpenses(expenses?.filter((expense) => expense?.id !== expenseId));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
    getExpenses();
  }, [fetchBudgets, getExpenses]);

  return (
    <div className='p-2'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
      <p className='text-gray-500'>Here&apos;s what&apos;s happening with your money. Let&apos;s manage your expenses.</p>
      <CardInfo budget={budgets} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDash budgetList={budgets} />
          <ExpenseList expenseList={expenses} deleteExpense={deleteExpense}/>
        </div>
        <div className='grid gap-2'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgets && budgets.map((item, index) => (
            <BudgetItem budget={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
