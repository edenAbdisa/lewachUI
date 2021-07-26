import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import * as ROUTES from "../../constants/routes.js";
import Report from "../Report";
import Statistics from "../Statistics";
import Flagged from "../Flaggeditem";
import Membership from "../Membership";
import Utilities from "../Utilities";
import SignIn from "../SignIn"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import { withAuthentication } from '../Session';
//import "./App.css";
const Dashboard = () => (
   
     localStorage.getItem("auth")==='true' ? (
                   <> 
                   <Navigation />             
                   <Row>
                     <Col sm={2}>
                       <Sidebar />
                     </Col>
                     
                   </Row>
                   </>
          ) : ( 
            <SignIn />
        
       )      
);
export default Dashboard;