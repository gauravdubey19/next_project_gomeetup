import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GOOM",
  description: "Video Calling/Meeting app",
  icons: { icon: "/icons/logo.svg" },
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar appName="GoMeetUp" logo="/icons/logo.svg" />
      <div className="flex">
        <Sidebar />
        <section className="min-h-screen flex flex-1 flex-col px-6 pb-6 pt-28 sm:px-14 max-md:pb-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
      {/* Footer */}
    </main>
  );
};

export default HomeLayout;
