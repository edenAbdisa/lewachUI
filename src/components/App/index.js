import React from "react";
import {withRouter, BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import * as ROUTES from "../../constants/routes.js";
import Report from "../Report";
import Statistics from "../Statistics";
import Flagged from "../Flaggeditem";
import Membership from "../Membership";
import Utilities from "../Utilities";
import SignIn from "../SignIn";
import Account from "../Account";
import Mapbox from "../Mapbox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import { withAuthentication } from '../Session';
import "./App.css";
const App = () => (
  
  <Router>
     {localStorage.getItem("auth")==='true' ? (
                   <> 
                   <Navigation />
             
                   <Row>
                     <Col sm={2}>
                       <Sidebar />
                     </Col>
                     <Col sm={9}>
                       <Route exact path={ROUTES.REPORT} component={Report} />
                       <Route exact path={ROUTES.STATISTICS} component={Statistics} />
                       <Route exact path={ROUTES.FLAGGEDITEMS} component={Flagged} />
                       <Route exact path={ROUTES.MEMBERSHIP} component={Membership} />
                       <Route exact path={ROUTES.UTILITIES} component={Utilities} />
                       <Route exact path={ROUTES.ACCOUNT} component={Account} />
                       <Route exact path={ROUTES.MAPBOX} component={Mapbox} />
                     </Col>
                   </Row>
                   </>
          ) : ( 
            <Route exact path={ROUTES.SIGNIN} component={SignIn} />
            
        
       )
      }
  </Router>
);

export default App;
