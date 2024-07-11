"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FullBudget } from "@/app/types";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpenses from "../_components/AddExpenses";
import ExpenseList from "../_components/ExpenseList";
import { Expenses } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Edit, MoveLeftIcon, PenBoxIcon, PenIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

const Page = ({ params }: { params: Params }) => {
  const [budgetList, setBudgetList] = useState<FullBudget>();
  const [edit,setEdit]=useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expenses[]>();
  const id = Number(params.id);
  const router = useRouter();

  const getExpensesList = useCallback(async () => {
    try {
      const response = await axios.post(`/api/getExpenses`, { id });
      setExpenses(response.data);
    } catch (error) {
      setError("Error fetching expenses");
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchBudgets = useCallback(async () => {
    try {
      const response = await axios.get("/api/getBudgets");
      const budgets = response.data.budgets.filter(
        (budget: FullBudget) => budget.id === id
      );
      setBudgetList(budgets[0]);
      getExpensesList();
    } catch (error) {
      setError("Error fetching budgets");
      console.error("Error fetching budgets:", error);
    } finally {
      setLoading(false);
    }
  }, [id, getExpensesList]);

  const deleteExpense = async (expenseId: number) => {
    try {
      await axios.post("/api/deleteExpense", { id: expenseId });
      setExpenses(expenses?.filter((expense) => expense.id !== expenseId));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const deleteBudget = async () => {
    try {
      await axios.post("/api/deleteBudget", { id });
      toast("Budget deleted successfully.");
      router.replace("/dashboard/budgets");
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MoveLeftIcon className="hover:text-gray-700 cursor-pointer" onClick={()=>router.replace("/dashboard/budgets")}  />
          My Expenses
        </h2>
      </div>

      <div className="flex justify-end mb-2">
        {/* <Button onClick={()=>setEdit(true)} className="mx-3"><PenBoxIcon/>Edit</Button>
        {edit && <EditBudget/>} */}
        <EditBudget budgetList={budgetList} refreshData={fetchBudgets}/>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="flex items-center gap-2">
              <TrashIcon /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your budget along with the expenses inside it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteBudget}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgetList ? (
          <BudgetItem budget={budgetList} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpenses refreshData={fetchBudgets} budgetId={id} />
      </div>

      <div className="mt-6">
        <h2 className="font-bold text-lg mb-4">Latest Expenses</h2>
        <ExpenseList deleteExpense={deleteExpense} expenseList={expenses} />
      </div>
    </div>
  );
};

export default Page;
