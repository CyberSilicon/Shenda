import React from "react";
import Message from "./Message";

const RightSideBar = () => {
  return (
    <div className="w-5/12">
      <div className="border-t-2 overflow-y-auto flex flex-col justify-between">
        <Message />
      </div>
    </div>
  );
};

export default RightSideBar;
