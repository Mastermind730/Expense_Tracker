"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';

interface AddExpensesProps{
  refreshData:()=>void;
  budgetId:number;
}

const AddExpenses:React.FC<AddExpensesProps> = ({refreshData,budgetId}) => {
    const [name,setName]=useState("");
    const [amount,setAmount]=useState("");
    const[loading,setLoading]=useState(false)
    const addNewExpense=async ()=>{
      setLoading(true)
      const data={name,amount,budgetId};
        const result=await axios.post("/api/addExpense",data);
        if (result && result.status === 200) {
          refreshData();
          toast("New expense created!");
          setName("");
          setAmount("");
        }
        setLoading(false)
    }
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
                <Button onClick={()=>addNewExpense()} disabled={!(name&&amount) ||loading} className='mt-2 w-full' >
                  {loading?<Loader className='animate-spin'/>:"Add New Expense"}
                  </Button>
    </div>
  )
}

export default AddExpenses