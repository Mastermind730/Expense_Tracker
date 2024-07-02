import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { useUser } from "@clerk/nextjs";
export async function POST(request: Request) {
    try {
        const body = await request.json();
        // const {user}=useUser();
        if (!body.name || !body.amount) {
            return new NextResponse("Bad Request: Missing name or amount", { status: 400 });
        }

        const newBudget = await prisma.budgets.create({
            data: {
                name: body.name,
                amount: body.amount,
                createdBy:body.user?.primaryEmailAddress?.emailAddress,
                icon:body.emojiIcon
            },
        });
        console.log("budget created");
        return NextResponse.json(newBudget, { status: 400 });
    } catch (error: any) {
        console.error("Error creating budget:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
