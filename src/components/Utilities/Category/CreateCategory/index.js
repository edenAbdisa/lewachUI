import React, { Component } from "react";
import "../../../../css/popup.css";
import { Form, Button } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from "../../../../constants/theme";
import * as ROUTES from "../../../../constants/routes.js";
import axios from "axios";
 

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.type === "create" ? "" : this.props.singleData.name,
    itemId: 0,
    error: null,
    isDelete: false,
    isCreate: false,
    isEdit: false,
    loadingData: true,
    messages:"",
    used_for:this.props.type === "create" ? "" : this.props.singleData.used_for };
  }
  async createCategory() {
     
    await axios.post(ROUTES.API_GET_CATEGORY,
      { 
        name: this.state.name,
        used_for:this.state.used_for
      
    },{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      if(response.data.success){
        this.setState({
          loadingData: false,
          error:response.data.content[0].message});
      }else{
        this.setState({
          loadingData: false,
          error:response.data.content[0].error});
      } 
        this.props.refresh(); 
    }).catch(e=>{this.setState({ loadingData: false});
      //this.setState({ error:e});
      var err=e.response.data.content[0].error;
      if(e.response.status === 400){
       
          this.setState({error:
            (err.name?JSON.stringify(err.name):"")
        +'\n'+ (err.used_for?JSON.stringify(err.used_for):"")
          });
      }else{
        this.setState({error:err});
      }
    });
    if (this.state.loadingData) {
      this.createCategory();
    }
  }
  async editCategory() { 
    await axios.put(ROUTES.API_GET_CATEGORY+"/" + this.state.itemId,
      {
        name: this.state.name,
        used_for:this.state.used_for
      },        
      {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((response) => {
        if(response.data.success){
          this.setState({
            loadingData: false,
            error:response.data.content[0].message});
        }else{
          this.setState({
            loadingData: false,
            error:response.data.content[0].error});
        } 
          this.props.refresh(); 
      }).catch(e=>{this.setState({ loadingData: false});
        //this.setState({ error:e});
        var err=e.response.data.content[0].error;
        if(e.response.status === 400){
          
            this.setState({error:
              (err.name?JSON.stringify(err.name):"")
          +'\n'+ (err.used_for?JSON.stringify(err.used_for):"")
            });
        }else{
          this.setState({error:err});
        }
      });
    if (this.state.loadingData) {
      this.editCategory();
    }
  }
  async deleteCategory() { 
      await axios({
        method: "delete",
        url: ROUTES.API_GET_CATEGORY + "/" + this.state.itemId,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      }).then((response) => {
        if(response.data.success){
          this.setState({
            loadingData: false,
            error:response.data.content[0].message});
        }else{
          this.setState({
            loadingData: false,
            error:response.data.content[0].error});
        } 
          this.props.refresh(); 
      }).catch(e=>{this.setState({ loadingData: false});
      var err=e.response.data.content[0].error;
        //this.setState({ error:e});
        this.props.refresh(); 
      this.props.closePopup(); 

        if(e.response.status === 400){

            this.setState({error:
              (err.name?JSON.stringify(err.name):"")
          +'\n'+ (err.used_for?JSON.stringify(err.used_for):"")
            });
        }else{
          this.setState({error:err});
        }
      });
    if (this.state.loadingData) {
      this.deleteCategory();
    }
  }
  async onSubmit(event) {
    if (this.state.isCreate) {
      this.createCategory();
    } else if (this.state.isEdit) {
      this.editCategory();
    } else {
      this.deleteCategory();
    } 
    event.preventDefault();
    //this.props.refresh();
    //this.props.closePopup();
  }
  onChange = (event) => {
    event.target.value = event.target.value.replace(/[^A-Za-z]/ig, '');
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {    
    const { name, error, used_for } = this.state;
    this.state.isDelete= this.props.type === "delete" ;
    this.state.isCreate=this.props.type === "create" ;
    this.state.isEdit=this.props.type === "edit" ;
    this.state.itemId= this.state.isCreate ? null : this.props.singleData.id;  
    const isInvalid = name === "" || used_for==="";

    return (
      <div className="popup">
        <div className="popup_inner">
          <p onClick={this.props.closePopup} style={{ float: "right" }}
          data-cy="closeCategorypopup"
          >
            <AiFillCloseCircle />
          </p>

          <Form onSubmit={(e) => this.onSubmit(e)}>
            <Form.Group controlId="formBasicAddCategory">
              <Form.Label>{this.props.title}</Form.Label>
              <Form.Text className="text-muted">
                {this.props.messages}
              </Form.Text> 
              <Form.Label>Category Name</Form.Label>
              <Form.Control
              
                type="text"
                placeholder={
                  this.state.isCreate
                    ? "Enter the name"
                    : this.props.singleData.name
                }
                value={name}
                onChange={this.onChange}
                name="name"
                disabled={this.state.isDelete}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>
                {" "}
                {this.state.isCreate
                  ? "Used for"
                  : this.props.singleData.used_for}{" "}
              </Form.Label>
              <Form.Control
                as="select"
                name="used_for"
                size="sm"
                value={used_for}
                disabled={this.state.isDelete}
                onChange={this.onChange}
              >
                <option value="user">Users</option>
                <option value="item">Item</option>
                <option value="service">Service</option>
              </Form.Control>
            </Form.Group>
            <Button
              data-cy="categorySubmit"
              variant="primary"
              type="submit"
              disabled={this.state.isDelete?false:isInvalid}
              style={{ backgroundImage: THEME.SubmitGradientButton }}
            >
              {this.props.buttonName}
            </Button>
             <p>{error}</p>
          </Form>
        </div>
      </div>
    );
  }
}

export default AddCategory;
