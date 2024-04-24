"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={"/icons/hamburger.svg"}
            alt="menu"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-dark-1">
          <SheetHeader>
            <SheetClose asChild>
              <Link href={"/"} className="flex items-center gap-1">
                <Image
                  src={"/icons/logo.svg"}
                  alt="logo"
                  width={32}
                  height={32}
                  className="max-sm:size-10"
                />
                <p className="text-[26px] font-extrabold text-white max-sm:hidden ">
                  GOOM
                </p>
              </Link>
            </SheetClose>
          </SheetHeader>
          <div className="h-[clac(100vh-72px)] flex flex-col justify-between overflow-y-auto">
            <section className="h-full flex flex-col gap-6 pt-16 text-white">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.route; // || pathname.startsWith(link.route)

                return (
                  <>
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.route}
                        className={cn(
                          "w-full max-w-60 flex gap-4 items-center p-4 rounded-lg",
                          { "bg-blue-1": isActive }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className="text-lg font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  </>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
