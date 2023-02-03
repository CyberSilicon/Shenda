import React from "react";
import LeftSidebar from "./LeftSideBar";
import MainView from "./MainView";
import RightSideBar from "./RightSideBar";

const HomePage = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <MainView />
        </div>
        <div className="px-6">
          <RightSideBar />
        </div>
      </div>
    </>
  );
};

export default HomePage;
