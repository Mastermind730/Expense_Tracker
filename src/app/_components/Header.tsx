"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center shadow-md border">
      <Image alt="logo" src={"./logo.svg"} width={130} height={130} />
      {isSignedIn ? <UserButton />:
      <Link href={"/sign-in"}>
      <Button>Get Started</Button>
      </Link>  }
    </div>
  );
};

export default Header;
