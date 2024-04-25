"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetCalls } from "@/hooks/useGetCalls";
import { useToast } from "./ui/use-toast";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";

const CallList = ({
  type,
}: {
  type: "previous" | "upcoming" | "recordings";
}) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "previous":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };
  const getNoCallsMsg = () => {
    switch (type) {
      case "previous":
        return "No Previous Calls/Meetings";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls/Meetings";
      default:
        return "";
    }
  };
  const { toast } = useToast();
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
        setRecordings(recordings);
      } catch (error) {
        console.log(error);
        toast({
          title: "❗ Something went wrong, please try again later.",
          txtColor: "text-[#ff3333]",
        });
      }
    };
    if (type === "recordings") fetchRecordings();
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallsMsg = getNoCallsMsg();
  // console.log(calls);

  if (isLoading) return <Loader />;
  return (
    <>
      <div
        className={`grid ${
          type === "previous"
            ? "grid-cols-2 md:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        } gap-5`}
      >
        {calls && calls.length > 0 ? (
          calls.map((meeting: Call | CallRecording) => (
            <MeetingCard
              key={(meeting as Call).id}
              icon={
                type === "previous"
                  ? "/icons/previous.svg"
                  : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
              }
              title={
                (meeting as Call).state?.custom?.description ||
                (meeting as CallRecording).filename?.substring(0, 20) ||
                "Personal Meeting"
              }
              date={
                (meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time?.toLocaleString()
              }
              isPreviousMeeting={type === "previous"}
              link={
                type === "recordings"
                  ? (meeting as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                      (meeting as Call).id
                    }`
              }
              buttonIcon1={
                type === "recordings" ? "/icons/play.svg" : undefined
              }
              buttonText={type === "recordings" ? "Play" : "Start"}
              handleClick={
                type === "recordings"
                  ? () => router.push(`${(meeting as CallRecording).url}`)
                  : () => router.push(`/meeting/${(meeting as Call).id}`)
              }
            />
          ))
        ) : (
          <h1 className="text-2xl font-bold text-white">{noCallsMsg}</h1>
        )}
      </div>
    </>
  );
};

export default CallList;
