"use client";

import React, { useEffect, useState } from "react";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isCamMicToggledOn, setIsCamMicToggledOn] = useState(false);
  const call = useCall();

  if (!call)
    throw new Error("useCall must be used within StreamCall component.");

  useEffect(() => {
    if (isCamMicToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isCamMicToggledOn, call?.camera, call?.microphone]);

  return (
    <>
      <div className="w-full h-screen flex-center flex-col gap-3 text-white">
        <h1 className="text-2xl font-bold">Setup</h1>
        <VideoPreview />
        <div className="h-16 flex-center gap-3">
          <label htmlFor="" className="flex-center gap-2 font-medium">
            <input
              type="checkbox"
              checked={isCamMicToggledOn}
              onChange={(e) => setIsCamMicToggledOn(e.target.checked)}
              className=""
            />
            Join with mic & camera off
          </label>
          <DeviceSettings />
        </div>
        <Button
          className="text-xl rounded-md bg-green-500 px-4 py-2.5"
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </>
  );
};

export default MeetingSetup;
