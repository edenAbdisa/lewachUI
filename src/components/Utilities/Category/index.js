import React from "react";
import {Table} from "react-bootstrap";
 

const Category = () =>(
<Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Edit</td>
      <td>Delete</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Edit</td>
      <td>Delete</td>
    </tr> 
  </tbody>
</Table>
);

export default Category