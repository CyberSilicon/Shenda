import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MapRoundedIcon from "@mui/icons-material/MapRounded";

const Navbar = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 my-2 items-center justify-center border-b">
      <div className="mx-auto md:mx-0">
        <img
          src="/geologo.png"
          alt="Shenda Logo"
          width={"60px"}
          className="ml-8"
        />
      </div>

      <div className="col-span-2  md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
        <div className=" flex justify-between items-center">
          <h2 className="font-bold text-2xl">Location</h2>
          <MapRoundedIcon />
        </div>
      </div>

      <div className="px-0 md:px-6 mx-auto">
        <SearchIcon className="absolute m-2" />
        <input type="text" className="bg-blue-100 rounded-2xl py-2 px-8" />
      </div>
    </div>
  );
};

export default Navbar;
