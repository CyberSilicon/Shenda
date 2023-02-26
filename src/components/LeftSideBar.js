import React from "react";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Tooltip, Zoom } from "@mui/material";
import { tooltipClasses } from "@mui/material";
import { styled } from "@mui/material";

import Parse from "../services/parse";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const LeftSidebar = () => {
  const navigate = useRouter();

  const doUserLogOut = async () => {
    try {
      await Parse.User.logOut();
      Cookies.remove("sessionTokenCurrentUser");
      navigate.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex top-0 left-0 h-screen ">
      <div className="flex flex-col justify-between items-center w-16 m-1 p-1">
        {/* The head section */}
        <div className="border-b-2 max-sm:hidden">
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
        {/* The main section */}

        <main className="flex flex-col flex-1 justify-start items-center overflow-y-auto space-y-1 mt-1">
          <div>
            <SideBarIcon
              iconToolTip="Home"
              icon={<HomeRoundedIcon fontSize="large" />}
            />
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
        </main>
        {/* The bottom section */}
        <div className="space-y-1 bottom-0 border-t-2 pt-1">
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

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#0c0016",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#0c0016",
  },
}));
const SideBarIcon = ({ icon, iconToolTip = "tooltip" }) => (
  <CustomTooltip
    title={iconToolTip}
    arrow
    TransitionComponent={Zoom}
    placement="left"
  >
    <div className="sidebar-icon group">
      {icon}
      {/* <span className="sidebar-tooltip group-hover:scale-100">{iconToolTip}</span> */}
    </div>
  </CustomTooltip>
);
export default LeftSidebar;
