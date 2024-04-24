"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useGetById } from "@/hooks/useGetCallById";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import Loader from "@/components/Loader";

const Meeting = () => {
  const { id } = useParams(); // { params: { id } }: { params: { id: string } }
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetById(id);

  if (!isLoaded || isCallLoading) return <Loader />;
  return (
    <>
      <div className="w-full h-screen">
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetupComplete ? (
              <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
            ) : (
              <MeetingRoom />
            )}
          </StreamTheme>
        </StreamCall>
      </div>
    </>
  );
};

export default Meeting;

// Meeting Room: #{params.id}
