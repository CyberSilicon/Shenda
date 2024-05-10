import React from "react";
// import Map from "./Maps/Map";
import TypingAnimation from "../animation/typingEffect";

const MainView = () => {
  return (
    <div className="flex flex-col w-7/12 h-[100vh] max-sm:hidden border-r border-l justify-center items-center">
      {/* <Map /> */}

      <div className="m-8 div-2 text-xl font-mono flex flex-1 flex-col h-full text-center justify-center items-center">
        <p className="text-indigo-900 m-6 p-4 font-mono font-semibold text-3xl self-center hover:animate-pulse">
          Welcome to Shenda
        </p>
        <TypingAnimation
          text={
            "Welcome to the new real-time chat application!"
          }
          delay={80}
        />
      </div>
      <div className="m-4 text-indigo-900">
        Welcome!
        {/* <TypingAnimation text={""} delay={100} /> */}
      </div>
    </div>
  );
};

export default MainView;
