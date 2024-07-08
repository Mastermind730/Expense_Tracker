"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FullBudget } from "@/app/types";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpenses from "../_components/AddExpenses";
import ExpenseList from "../_components/ExpenseList";
import { Expenses } from "@prisma/client";

const Page = ({ params }: { params: Params }) => {
  const [budgetList, setBudgetList] = useState<FullBudget>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // console.log(params.id)

  const [expenses,setExpenses]=useState<Expenses[]>();
  const id = Number(params.id);
  // console.log(id);

const getExpensesList=useCallback(async()=>{
  try {
    const response = await axios.post(`/api/getExpenses`,{id});
    // console.log(response);
    
    // console.log(budgets[0])
    setExpenses(response.data);
    // console.log(response.data);
  } catch (error) {
    setError("Error fetching budgets");
    console.error("Error fetching budgets:", error);
  } finally {
    setLoading(false);
  }

},[id])

  const fetchBudgets = useCallback(async () => {
    try {
      const response = await axios.get("/api/getBudgets");
      // console.log(response);
      const budgets = response.data.budgets.filter(
        (budget: FullBudget) => budget.id === id
      );
      getExpensesList();
      // console.log(budgets[0])
      setBudgetList(budgets[0]);
    } catch (error) {
      setError("Error fetching budgets");
      console.error("Error fetching budgets:", error);
    } finally {
      setLoading(false);
    }
    
  }, [id,getExpensesList]);

  const deleteExpense = async (id: number) => {
    try {
        await axios.post("/api/deleteExpense", { id });
        setExpenses(expenses?.filter(expense => expense.id !== id));
    } catch (error) {
        console.error("Error deleting expense:", error);
    }
}

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  // console.log(expenses);
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
        {budgetList ? (
          <BudgetItem budget={budgetList} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
      <AddExpenses refreshData={()=>fetchBudgets()} budgetId={id}/>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseList deleteExpense={deleteExpense} expenseList={expenses}/>
      </div>
    </div>
  );
};

export default Page;
