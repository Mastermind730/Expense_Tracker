import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async  function POST(request:Request){
    
    const body=await request.json();
    if (!body || !body.user) {
        return new NextResponse("User required ",{status:400})
       }
   
       const email = body.user?.primaryEmailAddress?.emailAddress;
   
       if (!email) {
         return new NextResponse("Email required ",{status:401})
   
       } 

       try{
        const budgets=await prisma.budgets.findMany({
            where:{
                createdBy:email,
            },
            include:{
                expenses:true,
            },
        });

        const expenses=budgets.flatMap(budget=>budget.expenses);
        // console.log(expenses);
        return NextResponse.json(expenses);
       }catch(error:any){
        return new NextResponse("Internal Server Error",{status:500});
       }


}