import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import * as ROUTES from '../../constants/routes.js';
import Report from "../Report";
import Statistics from "../Statistics";
import Flaggeditems from "../Flaggeditem";
import Membership from "../Membership";
import Category from "../Category"; 
import Account from "../Account"; 

import Row from "react-bootstrap/Row" ;
import Col from "react-bootstrap/Col" ;
//import { withAuthentication } from '../Session'; 
import './App.css';
const App = () => (
  <Router>
    <>
      <Navigation />
     
      <Row >
    <Col sm={2}>
    <Sidebar/>
    </Col>
    <Col sm={9} style={{paddingTop:67}}>
      <Route exact path={ROUTES.REPORT} component={Report} />
      <Route exact path={ROUTES.STATISTICS} component={Statistics} />
      <Route exact path={ROUTES.FLAGGEDITEMS} component={Flaggeditems} />
      <Route exact path={ROUTES.MEMBERSHIP} component={Membership} />
      <Route exact path={ROUTES.CATEGORY} component={Category} />
      <Route exact path={ROUTES.ACCOUNT} component={Account} />
    
    </Col>
  </Row>
  </>
  </Router>
);

export default App;