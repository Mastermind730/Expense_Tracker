"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import EmojiPicker from 'emoji-picker-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import axios from "axios";
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
const CreateBudget = () => {
    const [emojiIcon,setemojiIcon]=useState("😊");
    const [openEmojiDialog,setOPenemojiDialog]=useState(false);
    const [name,setName]=useState("");
    const [amount,setAmount]=useState("");
    const {user}=useUser();

    const onCreateBudget = async () => {
      try {
          const data = { name, amount, user, emojiIcon };
          // console.log(data);
  
          const result = await axios.post("/api/createBudget", data);
          console.log(result);
  
          if (result && result.status === 200) {
              // logic to check if data is posted correctly
              toast("New Budget created!");
          } else {
              toast("Failed to create budget. Please try again.");
          }
      } catch (error) {
          console.error(error);
          toast("An error occurred. Please try again.");
      }
  };
  
  return (
    <div>
       
        <Dialog>
  <DialogTrigger asChild>
  <div className='bg-slate-100 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md p-10'>
            <h2 className='text-2xl'>+</h2>
            <h2>Create New Budget</h2>
        </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new Budget</DialogTitle>
      <DialogDescription>
        <div className='mt-4'>
        <Button size={"lg"} onClick={()=>setOPenemojiDialog(true)} variant={"outline"}>{emojiIcon}</Button>
        <div className='absolute'>
            <EmojiPicker
            open={openEmojiDialog}
            onEmojiClick={(e)=>{setemojiIcon(e.emoji)
                setOPenemojiDialog(false)
            }}
            />
        </div>
        <div className='mt-2'>
            <h2 className='text-black font-medium my-1'>Budget Name</h2>
            <Input onChange={(e)=>setName(e.target.value)} placeholder='e.g New Budget' className='mt-2' />
        </div>
        <div className='mt-2'>
            <h2 className='text-black font-medium my-1'>Budget Amount</h2>
            <Input type='number' onChange={(e)=>setAmount(e.target.value)} placeholder='e.g 5000$' className='mt-2' />
        </div>
        <Button onClick={()=>onCreateBudget()} disabled={!(name && amount)} className='mt-5 w-full'>Create new Budget</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default CreateBudget