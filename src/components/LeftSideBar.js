import React from "react";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import Parse from "../services/parse";
import Link from "next/link";
import Image from "next/image";
import { Router } from "next/router";

const doUserLogOut = async () => {
  try {
    await Parse.User.logOut();
  } catch (error) {
    console.log(error.message);
  }
};

const LeftSidebar = () => {
  return (
    <div className="flex top-0 left-0">
      <div className="flex flex-col justify-between items-center w-16 m-1 p-1">
        <div className="space-y-2">
          <div className="border-b-2">
            <Link href="/">
              <Image
                src="/geologo.png"
                alt="Shenda Logo"
                width={60}
                height={60}
                className="sidebar-icon mb-2"
              />
            </Link>
          </div>
          <div>
            <SideBarIcon
              iconToolTip="Home"
              icon={<HomeRoundedIcon fontSize="large" />}
            />
          </div>
          <div>
            <SideBarIcon
              iconToolTip="Events"
              icon={<TagRoundedIcon fontSize="large" />}
            />
          </div>
          <div>
            <SideBarIcon
              iconToolTip="Random Tag"
              icon={<TagRoundedIcon fontSize="large" />}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div>
            <SideBarIcon
              iconToolTip="Profile"
              icon={<PersonPinIcon fontSize="large" />}
            />
          </div>
          <button onClick={doUserLogOut}>
            <SideBarIcon
              iconToolTip="Log Out"
              icon={<LogoutRoundedIcon fontSize="large" />}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const SideBarIcon = ({ icon, iconToolTip = "tooltip" }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{iconToolTip}</span>
  </div>
);

export default LeftSidebar;
