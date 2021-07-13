import React from "react"; 
import {Row ,Col, Table} from "react-bootstrap" ;
import * as THEME from '../../../constants/theme.js';
import CardReport from "../CardReport" ;

const ItemReport = () =>(
<>   

 <Row style={{backgroundColor:"#def1ef", borderRadius: 25, textAlign: '-webkit-center',padding: 9}}> 
    <Col>
    <CardReport title="Number of open barters" content="400"/>
    </Col>
    <Col>
    <CardReport title="Number of closed deal" content="4500"/>
    </Col>
</Row>
<Row style={{textAlign: '-webkit-center',padding: 9, marginTop:15}}> 
<Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>Item 1 Name</th>
      <th>Item 2 Name</th>
      <th>Status</th>
      <th>Date</th>
      <th>View Detail</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Shoe</td>
      <td>Nokia</td>
      <td>Bartered</td>
      <td>Date</td>
      <td>View</td>
    </tr>
  </tbody>
</Table>
</Row>

</>
);

export default ItemReport