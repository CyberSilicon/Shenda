import React from "react";
import Chat from "./Messages/Chat";

const RightSideBar = () => {
  return (
    <div className="flex flex-1 flex-col justify-between overflow-y-auto">
      <Chat />
    </div>
  );
};

export default RightSideBar;
