import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // const {user}=useUser();
        if (!body.name || !body.amount) {
            return new NextResponse("Bad Request: Missing name or amount", { status: 401 });
        }
        let amount=Number(body.amount)
        const newBudget = await prisma.budgets.update({
            where: { id: body.id },
            data: {
                name: body.name,
                amount:amount,
                icon:body.icon
            }
        });
        // console.log("budget created");
        return NextResponse.json(newBudget, { status: 200 });
    } catch (error: any) {
        console.error("Error creating budget:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
