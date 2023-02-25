import React from "react";
import LeftSidebar from "./LeftSideBar";
import MainView from "./MainView";
import RightSideBar from "./RightSideBar";

const HomePage = () => {
  return (
    <div className="flex flex-row h-screen">
      <LeftSidebar />
      <MainView />
      <RightSideBar />
    </div>
  );
};

export default HomePage;
