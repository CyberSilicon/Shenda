import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-4 items-center justify-center border-b">
      <div className="mt-2 mx-auto md:mx-0">
        <Link href="/">
          <img
            src="/geologo.png"
            alt="Shenda Logo"
            width={"60px"}
            className="ml-8"
          />
        </Link>
      </div>

      <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
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
