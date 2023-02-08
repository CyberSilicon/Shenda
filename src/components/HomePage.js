import React from "react";
import LeftSidebar from "./LeftSideBar";
import MainView from "./MainView";
import RightSideBar from "./RightSideBar";

const HomePage = () => {
  return (
    <div>
      <div className="h-screen flex">
        <div className="">
          <LeftSidebar />
        </div>
        <div className="flex w-3/5 ">
          <MainView />
        </div>
        <div className="flex flex-auto">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
