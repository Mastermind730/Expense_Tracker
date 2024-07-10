"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { FullBudget } from "@/app/types";

import React, { useEffect, useState } from "react";
import { PenBoxIcon } from "lucide-react";

type EditBudgetProps = {
  budgetList: FullBudget | undefined;
  refreshData:()=>void;
};

const EditBudget: React.FC<EditBudgetProps> = ({ budgetList,refreshData }) => {
  const [name, setName] = useState<string | undefined>(budgetList?.name);
  const [amount, setAmount] = useState<number | undefined>(budgetList?.amount);
  const [emojiIcon, setEmojiIcon] = useState(budgetList?.icon);
  const [openEmojiDialog, setOpenEmojiDialog] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const user=useUser();
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setEmojiIcon(emojiData.emoji);
    setOpenEmojiDialog(false);
  };

  useEffect(()=>{
    if(budgetList){
      setEmojiIcon(budgetList.icon)
      setName(budgetList.name)
      setAmount(budgetList.amount)
    }
  },[budgetList])
  const updateBudget=async()=>{
    try {
      const id=budgetList?.id;
      const data = {id ,name, amount, user, emojiIcon };
      // console.log(data);

      const result = await axios.post("/api/updateBudget", data);
      refreshData();
      // console.log(result);


      if (result && result.status === 200) {
        
        toast(" Budget updated!");
        setIsDialogOpen(false); // Close the dialog
      } else {
        toast("Failed to create budget. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast("An error occurred. Please try again.");
    }


  }

  return (
    <div className="mx-2">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <PenBoxIcon />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-4">
                <Button size={"lg"} onClick={() => setOpenEmojiDialog(true)} variant={"outline"}>
                  {emojiIcon}
                </Button>
                {openEmojiDialog && (
                  <div className="absolute z-20">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    defaultValue={budgetList?.name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g New Budget"
                    className="mt-2"
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    defaultValue={budgetList?.amount}
                    type="number"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="e.g 5000$"
                    className="mt-2"
                  />
                </div>
                <Button onClick={() => updateBudget()} disabled={!(name && amount)} className="mt-5 w-full">
                  Update  Budget
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
