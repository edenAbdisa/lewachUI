import React, { Component } from "react";
import "../../../../css/popup.css";
import { Form, Button } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from "../../../../constants/theme";
import * as ROUTES from "../../../../constants/routes.js";
import axios from "axios";

 
class AddMembership extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    name: this.props.type === "create" ? "" : this.props.singleData.name,
    limitOfPost: this.props.type === "create" ? "" : this.props.singleData.limit_of_post,
    transactionLimit: this.props.type === "create" ? "" : this.props.singleData.transaction_limit,
    itemId: 0,
    error: null,
    isDelete: false,
    isCreate: false,
    isEdit: false,
    loadingData: true, };
  }
  async createMembership() {
    await axios({
      method: "post",
      url: ROUTES.API_GET_MEMBERSHIP,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify({
        name: this.state.name,
        limit_of_post: this.state.limitOfPost,
        transaction_limit: this.state.transactionLimit
      }),
    }).then((response) => {
      this.setState({ loadingData: false,
        error:response.data.errors[0].message});
      console.log(response);
      this.props.refresh(); 
    }).catch(e=>{
      //this.setState({ error:e});
      this.setState({ loadingData: false});
      if(e.response.status === 400){
        this.state.error=(e.response.data.errors[0].message.name?JSON.stringify(e.response.data.errors[0].message.name):"")
        +'\n'+ (e.response.data.errors[0].message.limit_of_post?JSON.stringify(e.response.data.errors[0].message.limit_of_post):"")
        +'\n'+ (e.response.data.errors[0].message.transaction_limit?JSON.stringify(e.response.data.errors[0].message.transaction_limit):"");
        
        
      }else{
      this.state.error=e.response.data.errors[0].message;
      }
    });
    if (this.state.loadingData) {
      this.createMembership();
    }
  }
  async editMembership() { 
      await axios({
        method: "put",
        url: ROUTES.API_GET_MEMBERSHIP + "/" + this.state.itemId,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(
          {
            name: this.state.name,
            limit_of_post: this.state.limitOfPost,
            transaction_limit: this.state.transactionLimit
          }
        )
      }).then((response) => {
        this.setState({ loadingData: false,
          error:response.data.errors[0].message});
        console.log(response);
        this.props.refresh(); 
      }).catch(e=>{this.setState({ loadingData: false});
        //this.setState({ error:e});
        if(e.response.status === 400){
          this.state.error=(e.response.data.errors[0].message.name?JSON.stringify(e.response.data.errors[0].message.name):"")
          +'\n'+ (e.response.data.errors[0].message.limit_of_post?JSON.stringify(e.response.data.errors[0].message.limit_of_post):"")
          +'\n'+ (e.response.data.errors[0].message.transaction_limit?JSON.stringify(e.response.data.errors[0].message.transaction_limit):"");
          
          
        }else{
        this.state.error=e.response.data.errors[0].message;
        }    });
    if (this.state.loadingData) {
      this.editMembership();
    }
  }
  async deleteMembership() {
   
    await axios({
        method: "delete",
        url: ROUTES.API_GET_MEMBERSHIP + "/" + this.state.itemId,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }).then((response) => {
        this.setState({ loadingData: false,
          error:"Membership deleted successfully."});
        console.log(response);
        this.props.refresh(); 
      }).catch(e=>{this.setState({ loadingData: false});
        //this.setState({ error:e});
        this.state.error="Error happened while deleting membership.";
      });
    if (this.state.loadingData) {
      this.deleteMembership();
    }
  }
  onSubmit = (event) => {
    if (this.state.isCreate) {
      this.createMembership();
    } else if (this.state.isEdit) {
      this.editMembership();
    } else {
      this.deleteMembership();
    } 
    event.preventDefault();
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { name, limitOfPost, transactionLimit, error } = this.state;
    const isInvalid = name === "";
    this.state.isDelete= this.props.type === "delete" ;
    this.state.isCreate=this.props.type === "create" ;
    this.state.isEdit=this.props.type === "edit" ;
    this.state.itemId= this.state.isCreate ? null : this.props.singleData.id;


    return (
      <div className="popup">
        <div className="popup_inner">
          <p onClick={this.props.closePopup} style={{ float: "right" }}
          data-cy="closeMembershippopup">
            <AiFillCloseCircle />
          </p>

          <Form onSubmit={(e) => this.onSubmit(e)}>
            <Form.Group
              controlId="formBasicAddMembership"
              onSubmit={this.onSubmit}
            >
              <Form.Label>{this.props.title}</Form.Label>
              <Form.Text className="text-muted">{this.props.message}</Form.Text>
              <Form.Label>Membership name</Form.Label>
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
              <Form.Label>Transaction limit</Form.Label>
              <Form.Control
              data-cy="transactionLimit"
                type="number"
                placeholder={
                  this.state.isCreate
                    ? "Enter transaction limit"
                    : this.props.singleData.name
                }
                value={transactionLimit}
                onChange={this.onChange}
                name="transactionLimit"
                disabled={this.state.isDelete}
              />
              <Form.Label>Limit of post</Form.Label>
              <Form.Control
              data-cy="limitOfPost"
                type="number"
                placeholder={
                  this.state.isCreate
                    ? "Enter Limit of post"
                    : this.props.singleData.name
                }
                value={limitOfPost }
                onChange={this.onChange}
                name="limitOfPost"
                disabled={this.state.isDelete}
              />
            </Form.Group>
            <Button
              data-cy="membershipSubmit"
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

export default AddMembership;
