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
    {localStorage.getItem("auth")==='true'? 
      (<NavigationAuth />) :
      (<NavigationNonAuth />)
     }
    </Nav>
  </Navbar>
);

const NavigationAuth = () => (
  <>
    <Link to={ROUTES.ACCOUNT} class="nav-link">
      Account
    </Link>
    {/* {!!authUser.roles[ROLES.ADMIN] && (
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )} */}
      <p class="nav-link" onClick={(e) => onClick(e)}>
          <FaSignOutAlt /> Sign out
        </p> 
  </>
);

  const onSignOut=() => { 
   axios({
    method: "post",
    url: ROUTES.API_GET_USER_LOGOUT,
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('token')}`
    },
    data: JSON.stringify({
      remember_token:localStorage.getItem('token')
    })
    
    }).then((response) => {      
        localStorage.setItem('auth', false);      
        localStorage.setItem('role', '');
        localStorage.setItem('token', '');
        localStorage.setItem('userId', '');
        this.props.history.push(ROUTES.SIGNIN);
    // check if the data is populated
    // you tell it that you had the result
   // this.setState({ loadingData: false });
  }); 
 // this.props.history.push(ROUTES.SIGNIN);
};

const onClick= (event)=>{
    onSignOut();
  event.preventDefault();
}
const NavigationNonAuth = () => (
  <>
    <Link to={ROUTES.SIGNIN} class="nav-link">
      Sign in
    </Link>
  </>
);

export default Navigation;
