import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = ({ appName, logo }: { appName: string; logo: string }) => {
  return (
    <nav className="fixed flex-between z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src={logo}
          alt="logo"
          width={400}
          height={400}
          className="w-9 h-9 max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden ">
          {appName}
        </p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
