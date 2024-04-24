import React from "react";
import MeetTImeDate from "@/components/MeetTImeDate";
import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  return (
    <section className="size-full flex flex-col gap-10 text-white">
      <div className="h-[230px] md:h-[350px] w-full rounded-lg bg-hero2 bg-cover px-5 md:p-0">
        <div className="h-full flex flex-col justify-between max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center font-normal">
            Upcoming meeting at: 07:23 PM
          </h2>
          <MeetTImeDate />
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
