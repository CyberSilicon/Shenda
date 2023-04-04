import React, { useState } from "react";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import { Avatar, Tooltip, Zoom } from "@mui/material";
import { tooltipClasses } from "@mui/material";
import { styled } from "@mui/material";

import Parse from "../services/parse";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";
import { currentUserStore } from "../store/atoms/currentUserStore";

const LeftSidebar = () => {
  const navigate = useRouter();

  const { attrs } = useRecoilValue(currentUserStore);

  const doUserLogOut = async () => {
    try {
      await Parse.User.logOut();
      Cookies.remove("sessionTokenCurrentUser");
      navigate.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  //****** DropDown Menu ****************
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  //****** *******************************

  return (
    <div className="flex top-0 left-0 h-screen max-sm:hidden">
      <div className="flex flex-col justify-between items-center w-16 m-1 p-1">
        {/* The head section */}
        <div className="border-b-2 max-sm:hidden">
          <img
            src={"/geologo.png"}
            alt="Shenda Logo"
            className="sidebar-icon mb-2 p-1"
          />
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
          <button onClick={handleToggle}>
            {isOpen && (
              <div className="absolute z-10 left-16 mr-2 bottom-2 max-sm:bottom-0 bg-white border rounded-md shadow-xl">
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                  Account
                </button>
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={doUserLogOut}
                >
                  LogOut
                </button>
              </div>
            )}
            {/* //! update src path */}
            <SideBarIcon
              icon={<Avatar src={attrs.avatar && attrs.avatar.url} />}
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
const SideBarIcon = ({ icon, iconToolTip }) => (
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
