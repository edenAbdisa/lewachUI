import React from "react";
import {Tab,Tabs} from "react-bootstrap";

import Category from './Category';
import Type from './Type';
import Membership from './Membership';

const Utilities = () =>(
<Tabs defaultActiveKey="profilem" id="uncontrolled-tab-examples">
  <Tab eventKey="home" title="Category">
    <Category />
  </Tab>
  <Tab eventKey="profile" title="Type">
    <Type />
  </Tab>
  <Tab eventKey="contact" title="Membership">
    <Membership />
  </Tab>
</Tabs>
);

export default Utilities