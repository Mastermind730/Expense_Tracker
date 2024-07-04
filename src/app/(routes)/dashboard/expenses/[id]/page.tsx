"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FullBudget } from "@/app/types";

const Page = ({ params }: { params: Params }) => {
  const [budgetList, setBudgetList] = useState<FullBudget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = useCallback(async () => {
    try {
      const response = await axios.get("/api/getBudgets");
      const budgets = response.data.budgets.filter(
        (budget: FullBudget) => budget.id === params.id
      );
      setBudgetList(budgets);
    } catch (error) {
      setError("Error fetching budgets");
      console.error("Error fetching budgets:", error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  // console.log(budgetList);
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">My Expenses</h2>
      
    </div>
  );
};

export default Page;
