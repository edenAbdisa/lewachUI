import React from 'react';
import * as ROUTES from '../../constants/routes.js';
import Nav from "react-bootstrap/Nav" ;

const onSignOut = () => {
  "signOUT";
}
const SignOutButton = () => (
  <Nav.Link href={ROUTES.SIGN_OUT}>Sign out</Nav.Link> 
);

export default SignOutButton;
