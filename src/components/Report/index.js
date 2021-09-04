import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import ItemReport from "./ItemReport";
import ServiceReport from "./ServiceReport";
import UserReport from "./UserReport";

import * as THEME from "../../constants/theme.js";
const Report = () => (
  <>
    <h3
      data-cy="h3title"
      style={{
        textAlign: "center",
        color: THEME.TitleColor,
        fontSize: THEME.TitleSize,
      }}
    >
      Report
    </h3>
    <Tabs defaultActiveKey="item" id="uncontrolled-tab-example" 
      data-cy="reporttab"
    >
      <Tab eventKey="item" title="Item" data-cy="reportTabItem">
        <ItemReport />
      </Tab>
      <Tab eventKey="service" title="Service" data-cy="reportTabService">
        <ServiceReport />
      </Tab>
      <Tab eventKey="user" title="User" data-cy="reportTabUser">
        <UserReport />
      </Tab>
    </Tabs>
  </>
);

export default Report;
