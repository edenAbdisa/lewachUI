import React, { Component } from "react";
import "../../../css/popup.css";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from "../../../constants/theme";
import * as ROUTES from "../../../constants/routes.js";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
require("dotenv").config();
const INITIAL_STATE = {
  firstname: "",
  lastname: "",
  email: "",
  phone_number:"",
  birthdate:"",
  passwordOne: "",
  passwordTwo: "",
  passworderr: "",
  error: null,
  role: "",
  lng: 5,
  lat: 5,
  country:"",
  city: ""
};
const mapContainerRef = React.createRef(null);
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: "map-container",
    });
    const m = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Enter user address",
    });
    m.on(
      "result",
      function (e) {
        this.fuSetGeo(e.result);
      }.bind(this)
    );
    map.addControl(m);
  }
  async onSubmit(event) {
    this.createUser();
    event.preventDefault();
    //this.props.refresh();
    //this.props.closePopup();
  }
  fuSetGeo = (val) => {
    console.log(val);
    this.setState({
      lat: val.geometry.coordinates[0],
      lng: val.geometry.coordinates[1],
      country: val.geometry.coordinates[0],
      city: val.geometry.coordinates[1],
    });
  };
  async createUser() {
    await axios.post(ROUTES.API_GET_SINGLE_USER,{
        email: this.state.email.toString(),
        first_name: this.state.firstname.toString(),
        last_name: this.state.lastname.toString(),
        phone_number: this.state.phone_number.toString(),
        password: this.state.passwordOne.toString(),
        type: this.state.role.toString(),
        status: "active",
        birthdate:  this.state.birthdate.getFullYear().toString() +
        "-" +
        (this.state.birthdate.getMonth() + 1).toString() +
        "-" +
        this.state.birthdate.getDate().toString(),
        address: {
          latitude: this.state.lat,
          longitude: this.state.lng,
          type: "user",
        },
        membership_id: 12,
      },{headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
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
      })
      .catch((e) => {        
        var err=e.response.data.content[0].error;
        if(e.response.status === 400){
          var err=e.response.data.content[0].error;
          this.setState({error:
          (err.first_name?JSON.stringify(err.first_name):"")
          +'\n'+(err.last_name?JSON.stringify(err.last_name):"")
          +'\n'+(err.email?JSON.stringify(err.email):"")
          +'\n'+ (err.phone_number?JSON.stringify(err.phone_number):"")
          +'\n'+(err.birthdate?JSON.stringify(err.birthdate):"")
          +'\n'+(err.type?JSON.stringify(err.type):"")
          +'\n'+(err.name?JSON.stringify(err.name):"")
          +'\n'+ (err.used_for?JSON.stringify(err.used_for):"")});
  
        }else{
          this.setState({error:err});
        }
      });
    if (this.state.loadingData) {
      this.createUser();
    }
    // event.preventDefault();
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "passwordOne" && event.target.value.length < 8) {
      this.setState({ passworderr: "Password must be greater than 8." });
    } else {
      this.setState({ passworderr: "Good password." });
    }
  };
  render() {
    const {
      firstname,
      lastname,
      email,
      passwordOne,
      passwordTwo,
      role,
      error,
      phone_number,
      birthdate,
      lat,
      lng,
      passworderr,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne.length < 8 ||
      passwordOne === "" ||
      email === "" ||
      firstname === "" ||
      lastname === "" || phone_number=== "" ||
      birthdate === "";
    this.state.isDelete = this.props.type === "delete";
    this.state.isCreate = this.props.type === "create";
    this.state.isEdit = this.props.type === "edit";
    this.state.itemId = this.state.isCreate ? null : this.props.singleData.id;
    return (
      <div className="popup ">
        <div className="popup_inner">
          <p
            onClick={this.props.closePopup}
            style={{ float: "right" }}
            data-cy="closeUserpopup"
          >
            <AiFillCloseCircle />
          </p>
          <Form onSubmit={(e) => this.onSubmit(e)}>
            <Form.Group controlId="formBasicAddType">
              <Form.Label>{this.props.title}</Form.Label>
              <Form.Text className="text-muted">{this.props.message}</Form.Text>

              <Form.Label>First Name</Form.Label>

              <Form.Control
                data-cy="firstname"
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
                data-cy="lastname"
                name="lastname"
                value={lastname}
                onChange={this.onChange}
                type="text"
                placeholder="Last Name"
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                data-cy="email"
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                data-cy="phone_number"
                name="phone_number"
                value={phone_number}
                onChange={this.onChange}
                type="text"
                placeholder="Phone number"
              />
              <Form.Label>Birthdate</Form.Label>
              <DatePicker
              data-cy="birthdate" 
              style={{ display: "inline" }} 
              selected={this.state.birthdate}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => this.setState({ birthdate: date })}
        />
               
              <Form.Label>Password</Form.Label>
              <Form.Control
                data-cy="passwordOne"
                
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password must be greater than 8 characters"
              />

              <Form.Label>{this.state.passworderr}</Form.Label>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                data-cy="passwordTwo"
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              />
              <Form.Label>Address</Form.Label>
              <div id="map-container" />
            </Form.Group>

            <Form.Label> Select Role </Form.Label>
            <Form.Control
              as="select"
              name="role"
              size="sm"
              value={role}
              onChange={this.onChange}
              disabled={this.state.isDelete}
            >
              <option value="hr">HR</option>
              <option value="operations">Operations</option> 
            </Form.Control>

            <Button
              data-cy="userSubmit"
              variant="primary"
              type="submit"
              disabled={isInvalid}
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

export default Users;
