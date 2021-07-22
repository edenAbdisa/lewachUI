import React, { Component } from "react";
import "../../../css/popup.css";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from "../../../constants/theme";
import * as ROUTES from "../../../constants/routes.js";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
const INITIAL_STATE = {
  firstname: "",
  lastname: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  role:''
};
class Users extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  componentWillMount() {
    //this.getUser();
  }
  async createUser() {
    await axios({
      method: "post",
      url: ROUTES.API_GET_USER,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: this.state.email,
        first_name:this.state.firstname,
        last_name:this.state.lastname,
        password:this.state.passwordOne,
        type:this.state.role
      }),
    }).then((response) => {
      this.setState({ loadingData: false });
      console.log(response);
      this.state.error="Success";
    });
    if (this.state.loadingData) {
      this.createCategory();
    }
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { firstname, lastname, email, passwordOne, passwordTwo,role, error } =
      this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      firstname === "" ||
      lastname === "";
      this.state.isDelete= this.props.type === "delete" ;
      this.state.isCreate=this.props.type === "create" ;
      this.state.isEdit=this.props.type === "edit" ;
      this.state.itemId= this.state.isCreate ? null : this.props.singleData.id;
    return (
      <div className="popup ">
        <div className="popup_inner">
          <p onClick={this.props.closePopup} style={{ float: "right" }}>
            <AiFillCloseCircle />
          </p>
          <Form onSubmit={(e) => this.onSubmit(e)}>
            <Form.Group controlId="formBasicAddType">
              <Form.Label>{this.props.title}</Form.Label>
              <Form.Text className="text-muted">{this.props.message}</Form.Text>
              <Form.Label>First Name</Form.Label>

              <Form.Control
                name="firstname"
                value={firstname}
                onChange={this.onChange}
                type="text"
                placeholder={
                  this.state.isCreate
                    ? "Enter the type"
                    : this.props.singleData.name
                }
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastname"
                value={lastname}
                onChange={this.onChange}
                type="text"
                placeholder="Last Name"
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label> Select Role </Form.Label>
              <Form.Control as="select" name="role" size="sm" value={role}
                onChange={this.onChange}>
                <option value="hr">HR</option>
                <option value="operations">Operations</option>
                <option value="data handler">Data Handler</option>
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={isInvalid}
              style={{ backgroundImage: THEME.SubmitGradientButton }}
            >
              {this.props.buttonName}
            </Button>

            {error && <p>{error.message}</p>}
          </Form>
        </div>
      </div>
    );
  }
}

export default Users;
