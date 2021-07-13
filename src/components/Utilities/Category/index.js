import React,{Component} from "react";
import {Table} from "react-bootstrap";
import CreateCategory from './CreateCategory';
import { GrAdd } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

class Category extends Component {
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
  addCategoryViewPopup = () => {
    this.setState({
      showPopup:!this.state.addShowPopup
    });
  }
  editCategoryViewPopup = () => {
      this.setState({
      showPopup:!this.state.editShowPopup
    });
  }
  deleteCategoryViewPopup = () => {
      this.setState({
      showPopup:!this.state.deleteShowPopup
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
                onClick={this.addCategoryViewPopup.bind(this)}
              >
               <GrAdd/> Add category
              </p>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td><p 
                onClick={this.editCategoryViewPopup.bind(this)}
              >
               <AiOutlineEdit/> Edit
              </p></td>
      <td><p 
                onClick={this.deleteCategoryViewPopup.bind(this)}
              >
               <AiOutlineDelete/> Delete
              </p></td>
    </tr>  
  </tbody>
  
</Table>
  {this.state.addShowPopup ? 
  <CreateCategory
    type="add"
    title="Add category"
    text='Close Me'
    buttonName="Add category"
    closePopup={this.addCategoryViewPopup.bind(this)}
  />
  : null
 } 
 {this.state.editShowPopup ? 
  <CreateCategory
    type="edit"
    title="Edit category"
    text='Close Me'
    buttonName="Edit category"
    closePopup={this.editCategoryViewPopup.bind(this)}
  />
  : null
 }
 {this.state.deleteShowPopup ? 
  <CreateCategory
    type="delete"
    title="Delete category"
    text='Close Me'
    buttonName="Delete category"
    closePopup={this.deleteCategoryViewPopup.bind(this)}
  />
  : null
 }
  </>
);
  }
}


export default Category