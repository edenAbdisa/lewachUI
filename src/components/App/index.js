import React from "react";
import { withRouter, Switch as Router, Route, Switch } from "react-router-dom";
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
import { Grid, Col } from "react-flexbox-grid";
import "./App.css";
const App = () => (
  <Router>
    {localStorage.getItem("auth") === "true" ? (
      <>
        <Navigation style={{ height: "10%" }} />

        <Grid fluid className="app-main">
          <Col sm={2} className="nav-column" xs={12}>
            <Sidebar />
          </Col>
          <Col className="content-column" xs style={{ height: "90%" }}>
            <Switch>
              <Route exact path={ROUTES.REPORT} component={Report} />
              <Route exact path={ROUTES.STATISTICS} component={Statistics} />
              <Route exact path={ROUTES.FLAGGEDITEMS} component={Flagged} />
              <Route exact path={ROUTES.MEMBERSHIP} component={Membership} />
              <Route exact path={ROUTES.UTILITIES} component={Utilities} />
              <Route exact path={ROUTES.ACCOUNT} component={Account} />
              <Route exact path={ROUTES.MAPBOX} component={Mapbox} />
            </Switch>
          </Col>
        </Grid>
      </>
    ) : (
      <>
        <Route exact path={ROUTES.SIGNIN} component={SignIn} />
        <Route component={SignIn} />
      </>
    )}
  </Router>
);

export default withRouter(App);
