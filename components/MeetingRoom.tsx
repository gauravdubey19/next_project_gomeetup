"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import EndCallBtn from "./EndCallBtn";
import { Button } from "./ui/button";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

// how !! works (used in isPersonalRoom)
// 'personal' => !'personal' => false => !false => true
// undefined => !undefined =? true => false

const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED)
    return (
      <>
        <div className="w-full h-screen flex-center flex-col gap-4">
          <h1 className="text-xl text-red-600">
            Meeting has ended by the admin
          </h1>
          <Button
            onClick={() => router.push("/")}
            className="bg-dark-1 hover:bg-slate-800 text-white p-4 shadow-sm shadow-slate-700"
          >
            Back to home page
          </Button>
        </div>
        <Loader />
      </>
    );
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };
  return (
    <>
      <div className="relative w-full h-screen pt-4 text-white overflow-hidden">
        <div className="relative size-full flex-center">
          <div className="size-full max-w-[1000px] flex items-center">
            <CallLayout />
          </div>
          <div
            className={cn("h-[calc(100vh-86px)] hidden ml-2", {
              "show-block": showParticipants,
            })}
          >
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        </div>
        <div className="w-full fixed bottom-0 flex-center flex-wrap gap-5">
          <CallControls onLeave={() => router.push("/")} />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex-center cursor-pointer border-none outline-none rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              <DropdownMenuLabel>Change Layout</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["Grid", "Speaker-Left", "Speaker-Right"].map((item, i) => (
                <>
                  <div key={i} className="">
                    <DropdownMenuItem
                      onClick={() => {
                        setLayout(item.toLowerCase() as CallLayoutType);
                      }}
                      className="cursor-pointer"
                    >
                      {item}
                    </DropdownMenuItem>
                  </div>
                </>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <CallStatsButton />

          <button
            onClick={() => setShowParticipants((prev) => !prev)}
            className="flex-center cursor-pointer border-none outline-none rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
          >
            <Users size={20} />
          </button>

          {!isPersonalRoom && <EndCallBtn />}
        </div>
      </div>
    </>
  );
};

export default MeetingRoom;
