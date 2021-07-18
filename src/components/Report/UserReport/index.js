import React from "react";
import Table from "react-bootstrap/Table"; 
const UserReport = () =>(
<Table responsive>
  <thead>
    <tr>
      <th>#</th>
      
        <th >Email</th>
        <th >Registered on</th>
        <th >Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      {Array.from({ length: 3 }).map((_, index) => (
        <td key={index}> user 1 data </td>
      ))}
    </tr>
    <tr>
      <td>2</td>
      {Array.from({ length: 3 }).map((_, index) => (
        <td key={index}>user 2 data </td>
      ))}
    </tr>
    <tr>
      <td>3</td>
      {Array.from({ length: 3 }).map((_, index) => (
        <td key={index}>user 3 data {index}</td>
      ))}
    </tr>
  </tbody>
</Table>
);

export default UserReport