import React, { Component } from "react";
import "../../../../css/popup.css";
import { Form, Button } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from "../../../../constants/theme";
import * as ROUTES from "../../../../constants/routes.js";
import axios from "axios";
import { Redirect,withRouter } from 'react-router-dom';

const INITIAL_STATE = {
 
};

class AddType extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name:this.props.type === "create" ? "" : this.props.singleData.name,
      categoryId: 0,
      itemId: 0,
      error: null,
      isDelete: false,
      isCreate: false,
      isEdit: false,
      loadingData: true,
      categoryList: [],
      message:""
    };
  }
  componentWillMount() {
    this.getCategory();
  }
  async createType() {
    await axios.post(ROUTES.API_GET_TYPE,{
      name: this.state.name,
      category_id: this.state.categoryId
    },{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })  
    .then((response) => {
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
      if(e.response.status === 400){
        var err=e.response.data.content[0].error;
          this.setState({error:(err.name?JSON.stringify(err.name):"")
          +'\n'+ (err.category_id?JSON.stringify(err.category_id):"")        
          });
      }else{
        this.setState({error:err});
      } 
    });
    if (this.state.loadingData) {
      this.createType();
    }
  }
  async editType() { 
      await axios.put(ROUTES.API_GET_TYPE + "/" + this.state.itemId,{
        name: this.state.name,
            category_id: this.state.categoryId
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
        if(e.response.status === 400){
          var err=e.response.data.content[0].error;
            this.setState({error:(err.name?JSON.stringify(err.name):"")
            +'\n'+ (err.category_id?JSON.stringify(err.category_id):"")        
            });
        }else{
          this.setState({error:err});
        } 
      });
    if (this.state.loadingData) {
      this.editType();
    }
  }
  async deleteType() {
     await axios({
        method: "delete",
        url: ROUTES.API_GET_TYPE + "/" + this.state.itemId,
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
      this.props.refresh(); 
      this.props.closePopup(); 
          this.setState({error:e.response.data.content[0].error});
        
      });
    if (this.state.loadingData) {
      this.deleteType();
    }
  }
  async getCategory() { 
    await axios({
      method: "get",
      url: ROUTES.API_GET_CATEGORY,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((response) => {
      this.setState({ categoryList: response.data.data,loadingData:false });
      console.log(response);
    });
    if (this.state.loadingData) {
      this.getCategory();
    }
  }
  onSubmit = (event) => {
    if (this.state.isCreate) {
      this.createType();
    } else if (this.state.isEdit) {
      this.editType();
    } else {
      this.deleteType();
    }
    
    event.preventDefault();
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name,categoryId, error } = this.state;
    const isInvalid = name === "";
    this.state.isDelete= this.props.type === "delete" ;
    this.state.isCreate=this.props.type === "create" ;
    this.state.isEdit=this.props.type === "edit" ;
    this.state.itemId= this.props.type === "create" ? null : this.props.singleData.id;
    this.state.name= this.props.type === "create" ? null : this.props.singleData.name; 
    //this.state.categoryId= this.props.type === "create" ? null : this.props.singleData.categoryId;     
   
    return (
      <div className="popup">
        <div className="popup_inner">
          <p onClick={this.props.closePopup} style={{ float: "right" }}
          data-cy="closeTypepopup"
          >
            <AiFillCloseCircle />
          </p>

          <Form onSubmit={(e) => this.onSubmit(e)}>
            <Form.Group controlId="formBasicAddType">
              <Form.Label>{this.props.title}</Form.Label>
              <Form.Text className="text-muted">{this.props.message}</Form.Text>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder={
                  this.state.isCreate
                    ? "Enter the type"
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
                  ? "Select category"
                  : this.props.singleData.category}{" "}
              </Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                size="sm"
                value={categoryId}
                disabled={this.state.isDelete}
                onChange={this.onChange}
              >
               { this.state.categoryList.map((element) => (
               <option value={element.id}>{element.name}</option> 
               )) } 
              </Form.Control>
            </Form.Group>
            <Button
              data-cy="typeSubmit"
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

export default withRouter(AddType);
