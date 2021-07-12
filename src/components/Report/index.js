import React from "react";
import {Tab,Tabs} from "react-bootstrap"; 
import ItemReport from './ItemReport';
import ServiceReport from './ServiceReport';
import UserReport from './UserReport';

import * as ROUTES from '../../constants/routes.js';
import * as ROLES from '../../constants/roles.js';
import * as THEME from '../../constants/theme.js';
const Report = () =>(
<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
  <Tab eventKey="home" title="Item">
    <ItemReport />
  </Tab>
  <Tab eventKey="profile" title="Service">
    <ServiceReport />
  </Tab>
  <Tab eventKey="contact" title="User">
    <UserReport />
  </Tab>
</Tabs>
);

export default Report