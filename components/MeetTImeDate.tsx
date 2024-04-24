"use client";

import React, { useEffect, useState } from "react";

const MeetTImeDate = () => {
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();

  useEffect(() => {
    const intervalID = setInterval(() => {
      const currTime = new Date();
      setTime(currTime.toLocaleTimeString());
      setDate(
        new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(currTime)
      );
    }, 1000); // Update time every second

    return () => clearInterval(intervalID);
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl lg:text-7xl font-extrabold">{time}</h2>
        <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
      </div>
    </>
  );
};

export default MeetTImeDate;
