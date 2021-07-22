import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./navigation.css";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes.js";
import * as THEME from "../../constants/theme.js";
const Navigation = () => (
  <Navbar
    expand="lg"
    style={{ background: THEME.HeaderColor, color: THEME.HeaderFontColor }}
  >
    <Navbar.Brand href="#home" style={{ color: THEME.HeaderFontColor }}>
      {THEME.AppNameAdmin}
    </Navbar.Brand>
    <Navbar.Toggle
      aria-controls="basic-navbar-nav"
      style={{ color: THEME.HeaderFontColor }}
    />
    <Nav className="mr-sm-2">
      <NavigationAuth />
      <NavigationNonAuth />
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
    <SignOutButton />
  </>
);

const NavigationNonAuth = () => (
  <>
    <Link to={ROUTES.SIGN_IN} class="nav-link">
      Sign in
    </Link>
  </>
);

export default Navigation;
