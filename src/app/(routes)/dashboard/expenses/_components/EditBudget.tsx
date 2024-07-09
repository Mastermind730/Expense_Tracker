"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import axios from "axios";
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import EmojiPicker from 'emoji-picker-react';


  import React, { useState } from 'react'
import { PenBoxIcon } from "lucide-react";
  
  const EditBudget = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [emojiIcon, setEmojiIcon] = useState("😊");
  const [openEmojiDialog, setOpenEmojiDialog] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
      <div>
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button><PenBoxIcon/>Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-4'>
                <Button size={"lg"} onClick={() => setOpenEmojiDialog(true)} variant={"outline"}>{emojiIcon}</Button>
                <div className='absolute z-20'>
                  <EmojiPicker
                    open={openEmojiDialog}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji)
                      setOpenEmojiDialog(false)
                    }}
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Name</h2>
                  <Input onChange={(e) => setName(e.target.value)} placeholder='e.g New Budget' className='mt-2' />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                  <Input type='number' onChange={(e) => setAmount(e.target.value)} placeholder='e.g 5000$' className='mt-2' />
                </div>
                <Button onClick={()=>{}} disabled={!(name && amount)} className='mt-5 w-full'>Create new Budget</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>
    )
  }
  
  export default EditBudget