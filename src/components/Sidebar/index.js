//import useState hook to create menu collapse state
import React, { useState } from "react";
import { Link } from "react-router-dom";
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "./sidebar.css";
//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FcStatistics} from "react-icons/fc";
import { VscOrganization} from "react-icons/vsc";
import { FiHome, FiArrowLeftCircle, FiArrowRightCircle, FiMapPin,FiFlag} from "react-icons/fi";
import { RiPencilLine, RiUserSettingsLine} from "react-icons/ri";
import { BiCog } from "react-icons/bi";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
//import "./Header.css";
import * as ROUTES from "../../constants/routes.js";
import * as THEME from "../../constants/theme.js";
const Sidebar = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        {}
        <ProSidebar collapsed={menuCollapse} style={{backgroundColor:THEME.SidebarColor}}>
          <SidebarHeader style={{backgroundColor:THEME.SidebarColor}}>
            <div className="logotext" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              <p>
                {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
              </p>
            </div>
          </SidebarHeader>
          <SidebarContent style={{backgroundColor:THEME.SidebarColor}}>
            <Menu iconShape="square" style={{backgroundColor:THEME.SidebarColor}}>
            <MenuItem icon={<FiMapPin />} style={{backgroundColor:THEME.SidebarColor}}>
                <Link to={ROUTES.MAPBOX}>Users <br/> Map  </Link>
              </MenuItem>
              <MenuItem icon={<FaList />} style={{backgroundColor:THEME.SidebarColor}}>
                <Link to={ROUTES.REPORT}>Report </Link>
              </MenuItem>
              <MenuItem icon={<FcStatistics />}>
                <Link to={ROUTES.STATISTICS}>Statistics</Link>
              </MenuItem>
              <MenuItem icon={<FiFlag />}>
                <Link to={ROUTES.FLAGGEDITEMS}>
                  Flagged <br /> Items
                </Link>
              </MenuItem>
              <MenuItem icon={<VscOrganization />}>
                <Link to={ROUTES.MEMBERSHIP}>
                  {" "}
                  Users <br /> Managment{" "}
                </Link>
              </MenuItem>
              <MenuItem icon={<BiCog />}>
                <Link to={ROUTES.UTILITIES}>
                  Utilities <br /> Managment
                </Link>
              </MenuItem> 
            </Menu>
          </SidebarContent> 
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;
