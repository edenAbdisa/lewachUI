import React from "react";
import {Card,ListGroup, ListGroupItem} from "react-bootstrap" ;
import  './card.css';
import  logo from './../../../logo.svg';
const MembershipCard = (props) =>(

<Card style={{ width: '18rem' }} class='membership'>
  <Card.Img variant="top" src={logo} />
  <Card.Body>
    <Card.Title>  {props.companyName}</Card.Title> 
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>{props.tin}</ListGroupItem>
    <ListGroupItem>{props.email}</ListGroupItem> 
  </ListGroup>
  <Card.Body>
    <Card.Link href="#">Keep it</Card.Link>
    <Card.Link href="#">Remove it</Card.Link>
  </Card.Body>
</Card>
);
export default MembershipCard