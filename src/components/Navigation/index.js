import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FaSignOutAlt } from "react-icons/fa";
import "./navigation.css"; 
import axios from "axios";
import * as ROUTES from "../../constants/routes.js";
import * as THEME from "../../constants/theme.js";
const Navigation = (props) => (
  <Navbar
   
    expand="lg"
    style={{background: THEME.HeaderColor, color: THEME.HeaderFontColor,zIndex:10 }}
  >
    <Navbar.Brand  >
      <Link to={ROUTES.LANDING} class="nav-link" id='headerTitle' style={{ color: '#fff!important' }}>
      {THEME.AppNameAdmin}
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle
      aria-controls="basic-navbar-nav"
      style={{ color: THEME.HeaderFontColor }}
    />
    <Nav className="mr-sm-2"> 
     <Link to={ROUTES.SIGN_OUT} class="nav-link">
     <FaSignOutAlt /> Sign out
    </Link>
      
    </Nav>
  </Navbar>
);
 

export default Navigation;
