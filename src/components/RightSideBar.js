import React from "react";
import Message from "./Message";

const RightSideBar = () => {
  return (
    <div className="flex flex-1 flex-col justify-between border-t-2 overflow-y-auto">
      <Message />
    </div>
  );
};

export default RightSideBar;
