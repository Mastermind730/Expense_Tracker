import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.name || !body.amount) {
            return new NextResponse("Fields are required", { status: 401 });
        }

        // Fetch the budget corresponding to the budgetId
        const budget = await prisma.budgets.findUnique({
            where: {
                id: body.budgetId, // Ensure the field name matches your schema
            },
        });

        if (!budget) {
            return new NextResponse("Budget not found", { status: 404 });
        }

        const currentDate = new Date().toISOString().split('T')[0];

        const expense = await prisma.expenses.create({
            data: {
                name: body.name,
                amount: parseFloat(body.amount), // Ensure amount is stored as a number
                createdAt: currentDate, // current date
                budgetId: body.budgetId, // Ensure the field name matches your schema
            },
        });

        return NextResponse.json(expense, { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
