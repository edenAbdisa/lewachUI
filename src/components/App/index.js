import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
//import { withAuthentication } from '../Session'; 
import './App.css';
const App = () => (
  <Router>
    <div>
      <Navigation />
      <Sidebar/>
      <hr />

        </div>
  </Router>
);

export default App;