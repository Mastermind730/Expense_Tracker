"use client";
import React, { useEffect, useState, useCallback } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useUser();
  const [budgets, setBudgets] = useState<any[]>([]); // Adjust type as per your data structure

  const fetchBudgets = useCallback(async () => {
    try {
      if (!user) {
        console.error("User not found");
        return;
      }

      const response = await axios.post('/api/getExistingBudget', { user });
      
      setBudgets(response.data); // Assuming response.data contains budgets
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  }, [user]); // Dependency added to useCallback

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]); // Dependency added to useEffect

  useEffect(() => {
    if (!budgets) {
      router.replace("/dashboard/budgets");
    }
  }, [budgets, router]);
  // console.log(budgets);
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
