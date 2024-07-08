import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log(body);
    // Check if request body is empty or missing required fields
    if (!body ) {
     return new NextResponse("id required ",{status:400})
    }
    console.log(body);
    const id=Number(body.id);


    

    const expense = await prisma.expenses.findMany({
      where: {
        budgetId: id,
      },
    });

    // console.log(expense);

    return NextResponse.json(expense);
  } catch (err: any) {
    console.error("Error processing request:", err);
    return new NextResponse("Internal Error Occurred", { status: 500 });
  }
}
