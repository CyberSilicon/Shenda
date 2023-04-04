import React from "react";
import Map from "./Maps/Map";
import TypingAnimation from "../animation/typingEffect";

const MainView = () => {
  return (
    <div className="flex flex-1 flex-col w-7/12 h-[100vh] max-sm:hidden border-r border-l justify-center items-center">
      {/* <Typical /> */}
      <Map />
      <p className="m-6 p-4 font-mono font-medium text-2xl ">
        Welcome to Shenda,
        <p className="m-2 text-xl">
          your go-to solution for location-based communication within geofenced
          areas.
        </p>
      </p>
      <TypingAnimation text={"Mapping the world around you"} delay={100} />
    </div>
  );
};

export default MainView;
