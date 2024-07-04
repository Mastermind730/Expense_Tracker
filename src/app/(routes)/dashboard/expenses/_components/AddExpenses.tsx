"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const addNewExpense=()=>{

}

const AddExpenses = () => {
    const [name,setName]=useState("");
    const [amount,setAmount]=useState("");
  return (
    <div  className='border p-5 rounded-lg mx-2'>
        <h2 className='font-bold text-2xl'>Add Expense</h2>
        <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Expense Name</h2>
                  <Input onChange={(e) => setName(e.target.value)} placeholder='e.g Bedroom Decor' className='mt-2' />
                </div>
        <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                  <Input onChange={(e) => setAmount(e.target.value)} placeholder='e.g 1000' className='mt-2' />
                </div>
                <Button onClick={()=>addNewExpense()} disabled={!(name&&amount)} className='mt- w-full' >Add New Expense</Button>
    </div>
  )
}

export default AddExpenses