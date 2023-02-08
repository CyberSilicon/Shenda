import React from "react";
import LeftSidebar from "./LeftSideBar";

const LayoutPage = ({ children }) => {
  return (
    <>
      <LeftSidebar />
      {children}
    </>
  );
};

export default LayoutPage;
