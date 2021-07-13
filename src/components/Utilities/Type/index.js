import React, {Component} from "react";
import {Table} from "react-bootstrap";
import CreateType from './CreateType';
import { GrAdd } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
class Type extends Component{
constructor(props){
  super(props);
  this.state={
    editShowPopup:false,
    addShowPopup:false,
    deleteShowPopup:false,
    loading:false
  }
}
componentDidMount(){
  this.setState({loading:true});
}
addTypeViewPopup=()=>{
  this.setState({
    addShowPopup:!this.state.addShowPopup
  });
}
editTypeViewPopup=()=>{
  this.setState({
    editShowPopup:!this.state.editShowPopup
  });
}
deleteTypeViewPopup=()=>{
  this.setState({
    deleteShowPopup:!this.state.deleteShowPopup
  });
}
render(){
  return(
    <>
<Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>
               <AiOutlineEdit/> Edit 
      </th>
      <th><AiOutlineDelete/> Delete</th>
      <th>
      <p 
                onClick={this.addTypeViewPopup.bind(this)}
              >
               <GrAdd/> Add type
      </p>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td><p 
                onClick={this.editTypeViewPopup.bind(this)}
              >
               <AiOutlineEdit/> Edit 
      </p></td>
      <td><p onClick={this.deleteTypeViewPopup.bind(this)}>
      <AiOutlineDelete/>   Delete
          </p></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td><p 
                onClick={this.editTypeViewPopup.bind(this)}
              >
               <AiOutlineEdit/> Edit 
      </p></td>
      <td>
        <p onClick={this.deleteTypeViewPopup.bind(this)}>
        <AiOutlineDelete/> Delete
          </p>
      </td>
    </tr> 
  </tbody>
  </Table> 
  {this.state.addShowPopup ? 
  <CreateType
  type="add"
    title="Add type"
    text='Close Me'
    buttonName="Add type"
    closePopup={this.addTypeViewPopup.bind(this)}
  />
  : null
 }
 {this.state.editShowPopup ? 
  <CreateType
    type="edit"
    title="Edit type"
    text='Close Me'
    buttonName="Edit type"
    closePopup={this.editTypeViewPopup.bind(this)}
  />
  : null
 }
 {this.state.deleteShowPopup ? 
  <CreateType
    type="delete"
    title="Delete type"
    text='Close Me'
    buttonName="Delete type" 
    closePopup={this.deleteTypeViewPopup.bind(this)}
  />
  : null
 } 
</>
);
}
}

export default Type