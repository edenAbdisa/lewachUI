import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import Category from "./Category";
import Type from "./Type";
import Membership from "./Membership";
import Reporttype from "./Reporttype";
import * as THEME from "../../constants/theme.js";
import "../../css/nav.css";

const Utilities = () => (
  <>
    <h3
      style={{
        textAlign: "center",
        color: THEME.TitleColor,
        fontSize: THEME.TitleSize,
      }}
    >
      Utilities
    </h3>

    <Tabs defaultActiveKey="category" id="uncontrolled-tab-examples">
      <Tab eventKey="category" title="Category" >
        <Category />
      </Tab>
      <Tab eventKey="type" title="Type">
        <Type />
      </Tab>
      <Tab eventKey="membership" title="Membership">
        <Membership />
      </Tab>
      <Tab eventKey="reporttype" title="Report type">
        <Reporttype />
      </Tab>
    </Tabs>
  </>
);

export default Utilities;
