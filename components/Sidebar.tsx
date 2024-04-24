"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky w-fit h-screen left-0 top-0 flex flex-col justify-between bg-dark-1 p-6 pt-20 text-white max-sm:hidden lg:w-[264px]">
      {/* Sidebar */}
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route; // || pathname.startsWith(link.route)

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center justify-start p-4 rounded-lg overflow-hidden hover:shadow-md hover:shadow-[#3cf8ffae]",
                { "bg-blue-1": isActive }
              )}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
