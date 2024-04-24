"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";

const EndCallBtn = () => {
  const router = useRouter();
  const call = useCall();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;
  return (
    <>
      <Button
        onClick={async () => {
          await call.endCall();
          router.push("/");
        }}
        className="bg-red-500 hover:bg-red-400"
      >
        End call of everyone
      </Button>
    </>
  );
};

export default EndCallBtn;
