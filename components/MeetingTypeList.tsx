"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import MeetingModal from "./MeetingModal";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isInstantMeeting" | "isJoiningMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    des: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        return toast({
          title: "❗ Please selete a date & time.",
          txtColor: "text-[#ff3333]",
        });
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call.");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const des = values.des || "Instant meeting.";

      await call.getOrCreate({
        data: { starts_at: startsAt, custom: { description: des } },
      });

      setCallDetails(call);

      if (!values.des) router.push(`meeting/${call.id}`);
      toast({ title: "Meeting Created!" });
    } catch (error) {
      console.log(error);
      toast({
        title: "❗ Failed to create meeting.",
        txtColor: "text-[#ff3333]",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  return (
    <>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <HomeCard
          img={"/icons/add-meeting.svg"}
          title="New Meeting"
          des="Start an instant meeting."
          handleClick={() => setMeetingState("isInstantMeeting")}
          bg="bg-orange-600"
        />
        <HomeCard
          img={"/icons/join-meeting.svg"}
          title="Join Meeting"
          des="Via a invitation link."
          handleClick={() => setMeetingState("isJoiningMeeting")}
          bg="bg-yellow-600"
        />
        <HomeCard
          img={"/icons/schedule.svg"}
          title="Schedule Meeting"
          des="Plan your meeting."
          handleClick={() => setMeetingState("isScheduleMeeting")}
          bg="bg-blue-1"
        />
        <HomeCard
          img={"/icons/recordings.svg"}
          title="View Recordings"
          des="Check out your recordings."
          handleClick={() => router.push("/recordings")}
          bg="bg-purple-600"
        />
        {!callDetails ? (
          <MeetingModal
            isOpen={meetingState === "isScheduleMeeting"}
            onClose={() => setMeetingState(undefined)}
            handleClick={createMeeting}
            title="Create Meeting on Schedule"
          >
            <div className="flex flex-col gap-3">
              <label
                htmlFor=""
                className="text-base text-normal text-sky-1 leading-[22px]"
              >
                Add a description
              </label>
              <Textarea
                onChange={(e) => setValues({ ...values, des: e.target.value })}
                className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="w-full flex flex-col gap-2.5">
              <label
                htmlFor=""
                className="text-base text-normal text-sky-1 leading-[22px]"
              >
                Select Date & Time
              </label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-dark-2 p-2 focus:outline-none"
              />
            </div>
          </MeetingModal>
        ) : (
          <MeetingModal
            isOpen={meetingState === "isScheduleMeeting"}
            onClose={() => setMeetingState(undefined)}
            handleClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast({ title: "Link copied" });
            }}
            title="Meeting Created"
            btnText="Copy Meeting Link"
            btnIcon="/icons/copy.svg"
            img="/icons/checked.svg"
          />
        )}
        <MeetingModal
          isOpen={meetingState === "isInstantMeeting"}
          onClose={() => setMeetingState(undefined)}
          handleClick={createMeeting}
          title="Start an Instant Meeting"
          btnText="Start Meeting"
        />
        <MeetingModal
          isOpen={meetingState === "isJoiningMeeting"}
          onClose={() => setMeetingState(undefined)}
          handleClick={() => router.push(values.link)}
          title="Enter the meeting link here"
          btnText="Join Meeting"
        >
          <Input
            placeholder="Meeting link"
            onChange={(e) => setValues({ ...values, link: e.target.value })}
            className="border-none bg-slate-800 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </MeetingModal>
      </section>
    </>
  );
};

export default MeetingTypeList;

interface HomeCardProps {
  img: string;
  title: string;
  des: string;
  bg: string;
  handleClick: () => void;
}

export const HomeCard = ({
  img,
  title,
  des,
  handleClick,
  bg,
}: HomeCardProps) => {
  return (
    <>
      <div
        onClick={handleClick}
        className={`w-full xl:max-w-[270p] min-h-[260px] ${bg} px-4 py-6 cursor-pointer flex flex-col justify-between rounded-xl`}
      >
        <div className="flex-center glassmorphism size-12 rounded-md">
          <Image src={img} alt={title} width={27} height={27} />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg font-normal">{des}</p>
        </div>
      </div>
    </>
  );
};
