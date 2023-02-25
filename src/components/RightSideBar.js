import React from "react";
import Messages from "./Messages";

const RightSideBar = () => {
  return (
    <div className="flex flex-1 flex-col justify-between overflow-y-auto">
      <Messages />
    </div>
  );
};

export default RightSideBar;
