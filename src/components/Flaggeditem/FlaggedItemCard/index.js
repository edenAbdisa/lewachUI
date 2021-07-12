import React from "react";
import {Card} from "react-bootstrap" ;
import  './card.css';
import  logo from './../../../logo.svg';
const FlaggedItemCard = (props) =>(

<Card style={{ width: '18rem' }} class='flagged'>
  <Card.Img variant="top" src={logo} />
  <Card.Body>
    <Card.Title>  {props.reason}</Card.Title> 
  </Card.Body>
  <Card.Body>
    <Card.Link href="#">Keep it</Card.Link>
    <Card.Link href="#">Remove it</Card.Link>
  </Card.Body>
</Card>
);
export default FlaggedItemCard