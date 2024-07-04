import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log(body);
    // Check if request body is empty or missing required fields
    if (!body || !body.user) {
     return new NextResponse("User required ",{status:400})
    }

    const email = body.user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      return new NextResponse("Email required ",{status:401})

    }

    const budget = await prisma.budgets.findFirst({
      where: {
        createdBy: email,
      },
    });

    console.log(budget);

    return NextResponse.json(budget);
  } catch (err: any) {
    console.error("Error processing request:", err);
    return new NextResponse("Internal Error Occurred", { status: 500 });
  }
}
