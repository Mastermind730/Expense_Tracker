import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import prisma from "@/lib/prismadb";
import { Budgets } from "@prisma/client";

const useExistingBudget = () => {
  const { user } = useUser();

  const [budget, setBudget] = useState<Budgets | null>(null);

  useEffect(() => {
    const fetchBudget = async () => {
      if (!user) {
        return;
      }
      console.log(user);

      const email = user.primaryEmailAddress?.emailAddress;

      if (!email) {
        return;
      }

      try {
        const budget = await prisma.budgets.findFirst({
          where: {
            createdBy: email,
          },
        });
        console.log(budget);
        setBudget(budget);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchBudget();
  }, [user]);

  return { budget };
};

export default useExistingBudget;
