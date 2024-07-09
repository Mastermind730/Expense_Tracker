import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check if request body is empty or missing required fields
    if (!body || !body.id) {
      return new NextResponse("id required", { status: 400 });
    }

    const id = Number(body.id);
    if (isNaN(id)) {
      return new NextResponse("Invalid id", { status: 400 });
    }

    await prisma.expenses.deleteMany({
        where: { budgetId:id },
    })


    const budget = await prisma.budgets.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(budget);
  } catch (err: any) {
    console.error("Error processing request:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
