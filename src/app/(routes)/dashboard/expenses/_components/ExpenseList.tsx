"use client";
import { Expenses } from '@prisma/client';
import { TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';

interface ExpenseListProps {
    expenseList: Expenses[] | undefined;
    deleteExpense:(id:any)=>void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenseList,deleteExpense }) => {
    

    

    if (!expenseList) {
        return null; // Return null if expenses is undefined
    }
   

    return (
        <div className='mt-3'>
            <h2 className=' my-2 text-2xl font-bold'>Latest Expenses</h2>
            <div className='grid grid-cols-4 bg-slate-200 p-2'>
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                <h2>Action</h2>
            </div>
            {expenseList.map((expense) => (
                <div key={expense.id} className='grid grid-cols-4 bg-slate-50 p-2'>
                    <h2>{expense.name}</h2>
                    <h2>{expense.amount}</h2>
                    <h2>{new Date(expense.createdAt).toLocaleDateString()}</h2>
                    <h2>
                        <TrashIcon 
                            className='text-red-600 hover:text-red-700 cursor-pointer' 
                            onClick={() => deleteExpense(expense.id)} 
                        />
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default ExpenseList;
