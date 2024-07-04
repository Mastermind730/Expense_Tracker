import { UserButton } from "@clerk/nextjs";
import {
    LayoutDashboardIcon,
    PiggyBank,
    ReceiptText,
    ShieldCheck,
  } from "lucide-react";
  import Image from "next/image";
import Link from "next/link";
import path from "path";
  import React from "react";
  
  interface MenuItem {
    id: number;
    name: string;
    icon: React.ElementType;
    path:string;
  }
  
  const SideNav = () => {
    const menuList: MenuItem[] = [
      {
        id: 1,
        name: "Dashboard",
        icon: LayoutDashboardIcon,
        path:"/dashboard"
      },
      {
        id: 2,
        name: "Budgets",
        icon: PiggyBank,
        path:"/dashboard/budgets"

      },
      {
        id: 3,
        name: "Expenses",
        icon: ReceiptText,
        path:"/dashboard/expenses"

      },
      {
        id: 4,
        name: "Upgrade",
        icon: ShieldCheck,
        path:"/upgrade"

      },
    ];
  
    return (
      <div className="h-screen p-5 border shadow-sm">
        <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
        <div className="mt-5">
          {menuList.map((item: MenuItem) => (
            <div key={item.id} className="mt-5">
              <Link href={item.path}>
              <h2 className={`flex gap-2 mb-2 items-center text-gray-500 font-medium cursor-pointer hover:text-primary hover:bg-blue-100 rounded-md p-5 ${path==item.path &&'text-primary bg-bllue-100'}`}>
                <item.icon  />
                {item.name}
              </h2>
              </Link>
            </div>
          ))}
        </div>
        <div className="fixed bottom-10 p-5 flex gap-2 items-center">
<UserButton/>
Profile
        </div>
      </div>
    );
  };
  
  export default SideNav;
  