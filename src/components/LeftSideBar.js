import React from "react";

import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import Parse from "../services/parse";
import Link from "next/link";
import Image from "next/image";

const doUserLogOut = async () => {
  try {
    await Parse.User.logOut();
  } catch (error) {
    console.log(error.message);
  }
};

const LeftSidebar = () => {
  return (
    <div className="flex h-screen top-0 left-0 p-1 m-1">
      <div className="flex flex-col justify-between items-center w-16">
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
            <SideBarIcon icon={<HomeIcon fontSize="large" />} />
          </div>
          <div>
            <SideBarIcon icon={<TagIcon fontSize="large" />} />
          </div>
          <div>
            <SideBarIcon icon={<TagIcon fontSize="large" />} />
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <SideBarIcon icon={<PersonIcon fontSize="large" />} />
          </div>
          <button onClick={doUserLogOut}>
            <SideBarIcon icon={<LogoutRoundedIcon fontSize="large" />} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip" }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

export default LeftSidebar;
