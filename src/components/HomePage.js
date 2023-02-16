import React from "react";
import LeftSidebar from "./LeftSideBar";
import MainView from "./MainView";
import RightSideBar from "./RightSideBar";

const HomePage = () => {
  return (
    <div className="h-screen flex flex-row">
      <LeftSidebar />
      <MainView />
      <RightSideBar />
    </div>
  );
};

export default HomePage;
