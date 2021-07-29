import React, { Component } from "react";
import "../../../../css/popup.css";
import { Form, Button } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from "../../../../constants/theme";
import * as ROUTES from "../../../../constants/routes.js";
import axios from "axios";
import { Redirect,withRouter } from 'react-router-dom';

const INITIAL_STATE = {
  name: "",
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

class AddType extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  componentWillMount() {
    this.getCategory();
  }
  async createType() {
    await axios({
      method: "post",
      url: ROUTES.API_GET_TYPE,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name: this.state.name,
      }),
    }).then((response) => {
      this.setState({ loadingData: false,
        error:"Type added successfully."});

      console.log(response);
    }).catch(e=>{
      //this.setState({ error:e});
      this.state.error="Error happened while adding type.";
    });
    if (this.state.loadingData) {
      this.createType();
    }
  }
  async editType() {
    await axios
      .put(ROUTES.API_GET_TYPE + "/" + this.state.itemId, {
        name: this.state.name,
      })
      .then((response) => {
        this.setState({ loadingData: false,
          error:"Type edited successfully."});
        console.log(response);
      }).catch(e=>{
        //this.setState({ error:e});
        this.state.error="Error happened while editing type.";
      });
    if (this.state.loadingData) {
      this.editType();
    }
  }
  async deleteType() {
    await axios
      .delete(ROUTES.API_GET_TYPE + "/" + this.state.itemId)
      .then((response) => {
        this.setState({ loadingData: false,
          error:"Type deleted successfully."});
        console.log(response);
      }).catch(e=>{
        //this.setState({ error:e});
        this.state.error="Error happened while deleting type.";
      });
    if (this.state.loadingData) {
      this.deleteType();
    }
  }
  async getCategory() {
    await axios.get(ROUTES.API_GET_CATEGORY)
              .then((response) => {
      this.setState({ categoryList: response.data.data });
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

    return (
      <div className="popup">
        <div className="popup_inner">
          <p onClick={this.props.closePopup} style={{ float: "right" }}>
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
              >
               { this.state.categoryList.map((element) => (
               <option value={element.id}>{element.name}</option> 
               )) } 
              </Form.Control>
            </Form.Group>
            <Button
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
