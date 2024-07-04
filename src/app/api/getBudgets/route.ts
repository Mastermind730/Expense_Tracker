import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request:Request){
    try {
            const budgets=await prisma.budgets.groupBy({
                by:['id','name','amount','icon','createdBy'],
                _sum:{
                    amount:true,
                },
                _count:{
                    id:true,
                },
            });


            const expenses=await prisma.expenses.groupBy({
                by:["budgetId"],
                _sum:{
                    amount:true
                },
                _count:{
                    id:true
                },
            });

            const expensesMap = expenses.reduce((acc:any, expense) => {
                acc[expense.budgetId] = {
                  totalSpend: expense._sum.amount,
                  totalItem: expense._count.id,
                };
                return acc;
              }, {});
          
              const formattedBudgets = budgets.map(budget => ({
                id: budget.id,
                name: budget.name,
                amount: budget.amount,
                icon: budget.icon,
                createdBy: budget.createdBy,
                totalSpend: expensesMap[budget.id]?.totalSpend || 0,
                totalItem: expensesMap[budget.id]?.totalItem || 0,
              }));

              return NextResponse.json({budgets:formattedBudgets},{status:200});
    } catch (error:any) {
        console.log("error occured while fetching data",error)
        return new NextResponse("Internal Server Error",{status:500})
    }
}