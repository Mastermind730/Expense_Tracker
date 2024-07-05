"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FullBudget } from "@/app/types";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpenses from "../_components/AddExpenses";

const Page = ({ params }: { params: Params }) => {
  const [budgetList, setBudgetList] = useState<FullBudget>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // console.log(params.id)
  const id = Number(params.id);
  // console.log(id);
  const fetchBudgets = useCallback(async () => {
    try {
      const response = await axios.get("/api/getBudgets");
      // console.log(response);
      const budgets = response.data.budgets.filter(
        (budget: FullBudget) => budget.id === id
      );
      // console.log(budgets[0])
      setBudgetList(budgets[0]);
    } catch (error) {
      setError("Error fetching budgets");
      console.error("Error fetching budgets:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  // console.log(budgetList);
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
    </div>
  );
};

export default Page;
