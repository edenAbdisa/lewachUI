//import useState hook to create menu collapse state
import React, { useState } from "react";
import { Link } from 'react-router-dom';
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import  './sidebar.css';
//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
//import "./Header.css";
import * as ROUTES from '../../constants/routes.js';
import * as ROLES from '../../constants/roles.js';
import * as THEME from '../../constants/theme.js';

const Sidebar = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
          {}
    <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              <p>{menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                <Link to={ROUTES.REPORT}>Report </Link>
              </MenuItem>
              <MenuItem icon={<FaList />}>
                <Link to={ROUTES.STATISTICS}>Statistics</Link>
              </MenuItem>
              <MenuItem icon={<FaRegHeart />}>
                <Link to={ROUTES.FLAGGEDITEMS}>Flagged Items</Link>
              </MenuItem>
              <MenuItem icon={<RiPencilLine />}>
                <Link to={ROUTES.MEMBERSHIP}> Membership <br/> Managment </Link>
              </MenuItem>
              <MenuItem icon={<BiCog />}>
                <Link to={ROUTES.CATEGORY}>Category <br/> Managment</Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Settings</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
        </div>
        </>
    
  );
};

export default Sidebar; 
 