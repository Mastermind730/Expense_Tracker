"use client";
import { useUser } from '@clerk/nextjs';
import { Expenses } from '@prisma/client';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import ExpenseList from './_components/ExpenseList';

const Page = () => {
    const [expenses, setExpenses] = useState<Expenses[]>();
  
    // const id = Number(params.id);
    
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

    useEffect(()=>{
        getExpenses();
    },[getExpenses])
 
      const deleteExpense = async (expenseId: number) => {
        try {
          await axios.post("/api/deleteExpense", { id: expenseId });
          setExpenses(expenses?.filter((expense) => expense.id !== expenseId));
        } catch (error) {
          console.error("Error deleting expense:", error);
        }
      };
    
  return (
    <div className='w-full h-full items-center justify-center'>
        <ExpenseList expenseList={expenses} deleteExpense={deleteExpense}/>
    </div>
  )
}

export default Page