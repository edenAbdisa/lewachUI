import React,{Component} from "react";
import {Table} from "react-bootstrap";
import CreateMembership from './CreateMembership';
import { GrAdd } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

class Membership extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      editShowPopup:false,
      addShowPopup:false,
      deleteShowPopup:false
    };
  }
  componentDidMount() {
    /* if (this.state.user) {
      return;
    } */

    this.setState({ loading: true });
  }
  addMembershipViewPopup = () => {
    this.setState({
      addShowPopup:!this.state.addShowPopup
    });
  }
  editMembershipViewPopup = () => {
      this.setState({
      editShowPopup:!this.state.editShowPopup
    });
  }
  deleteMembershipViewPopup = () => {
      this.setState({
      deleteShowPopup:!this.state.deleteShowPopup
    });
    
    //this.props.firebase.doPasswordReset(this.state.user.email);
  }
render(){ 
  return(
    <>
<Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Edit</th>
      <th>Delete</th>
      <th>
      <p 
                onClick={this.addMembershipViewPopup.bind(this)}
              >
               <GrAdd/> Add membership
              </p>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td><p 
                onClick={this.editMembershipViewPopup.bind(this)}
              >
               <AiOutlineEdit/> Edit
              </p></td>
      <td><p 
                onClick={this.deleteMembershipViewPopup.bind(this)}
              >
               <AiOutlineDelete/> Delete
              </p></td>
    </tr>  
  </tbody>
  
</Table>
  {this.state.addShowPopup ? 
  <CreateMembership
    type="add"
    title="Add membership"
    message="Make sure the membership name doesnt exist."
    text='Close Me'
    buttonName="Add membership"
    closePopup={this.addMembershipViewPopup.bind(this)}
  />
  : null
 } 
 {this.state.editShowPopup ? 
  <CreateMembership
    type="edit"
    title="Edit membership"
    message="Make sure the membership name doesnt exist."
    text='Close Me'
    buttonName="Edit membership"
    closePopup={this.editMembershipViewPopup.bind(this)}
  />
  : null
 }
 {this.state.deleteShowPopup ? 
  <CreateMembership
    type="delete"
    title="Delete membership"
    message="Are you sure you want to delete this membership?"
    text='Close Me'
    buttonName="Delete membership"
    closePopup={this.deleteMembershipViewPopup.bind(this)}
  />
  : null
 }
  </>
);
  }
}


export default Membership