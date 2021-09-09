import React, { Component } from "react";
import "../../../../css/popup.css";
import { Form, Button } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from "../../../../constants/theme";
import * as ROUTES from "../../../../constants/routes.js";
import axios from "axios";

const INITIAL_STATE = {
  name: "",
  itemId: 0,
  error: null,
  isDelete: false,
  isCreate: false,
  isEdit: false,
  loadingData: true,
  messages:"",
  used_for:""
};

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  async createCategory() {
    await axios({
      method: "post",
      url: ROUTES.API_GET_CATEGORY,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name: this.state.name,
        used_for:this.state.used_for
      }),
    }).then((response) => {
      this.setState({ loadingData: false,
        error:response.data.errors[0].message});
        this.props.refresh(); 
    }).catch(e=>{this.setState({ loadingData: false});
      //this.setState({ error:e});
      if(e.response.status === 400){
        this.state.error=e.response.data.errors.message.name +'\n'+
        e.response.data.errors.message.category_id;
      }else{
      this.state.error=e.response.data.errors[0].message;
      }
    });
    if (this.state.loadingData) {
      this.createCategory();
    }
  }
  async editCategory() {
    await axios
      .put(ROUTES.API_GET_CATEGORY + "/" + this.state.itemId, {
        name: this.state.name,
        used_for:this.state.used_for
      })
      .then((response) => {
        this.setState({ loadingData: false,
          error:"Category edited successfully."});
          this.props.refresh(); 
      }).catch(e=>{this.setState({ loadingData: false});
        //this.setState({ error:e});
        this.state.error="Error happened while editing category.";
      });
    if (this.state.loadingData) {
      this.editCategory();
    }
  }
  async deleteCategory() {
    await axios
      .delete(ROUTES.API_GET_CATEGORY + "/" + this.state.itemId)
      .then((response) => {
        this.setState({ loadingData: false,
          error:"Category deleted successfully."});
        console.log(response);
        //this.props.closePopup();
        this.props.refresh(); 
      }).catch(e=>{this.setState({ loadingData: false});
        //this.setState({ error:e});
        this.state.error="Error happened while deleting category.";
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
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, error, used_for, } = this.state;
    const isInvalid = name === "" || used_for==="";
    this.state.isDelete= this.props.type === "delete" ;
    this.state.isCreate=this.props.type === "create" ;
    this.state.isEdit=this.props.type === "edit" ;
    this.state.itemId= this.state.isCreate ? null : this.props.singleData.id;


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
