import React from "react";
import Nav from "react-bootstrap/Nav";

const onSignOut = () => {
  "signOUT";
};
const SignOutButton = () => <Nav.Link href={onSignOut()}>Sign out</Nav.Link>;

export default SignOutButton;
