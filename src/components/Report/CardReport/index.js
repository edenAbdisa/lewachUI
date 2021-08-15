import React from "react";
import Card from "react-bootstrap/Card";
//import  './card.css';

import * as THEME from "../../../constants/theme.js";
const CardReport = (props) => (
  <div>
    <Card style={{ marginBottom:2, width: "18rem", borderRadius: 5, backgroundImage: THEME.ReportCardColor}} class="stat">
      <Card.Body style={{ padding: 0,color:'fff' }}>
        <Card.Title style={{color:'#fff' }}>{props.title}</Card.Title>
        <Card.Text style={{ color:'#fff' }}>{props.content}</Card.Text>
      </Card.Body>
    </Card>
  </div>
);

export default CardReport;
