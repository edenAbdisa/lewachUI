import React, { Component } from "react";
import "../../../css/popup.css";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from "../../../constants/theme";
import * as ROUTES from "../../../constants/routes.js";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

require('dotenv').config();
const INITIAL_STATE = {
  firstname: "",
  lastname: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  role:'',
  lng:5,
  lat:5
};
const mapContainerRef = React.createRef(null);
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };  
  }  
  
  componentDidMount() {  
    const map = new mapboxgl.Map({
      container: 'map-container' 
    });
    const m=new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Enter user address'
      });
      m.on('result', function (e) {
        this.fuSetGeo(e.result)
    }.bind(this));
    map.addControl(      
      m
    );
    //this.getUser();
  }
  async onSubmit(event) { 
      this.createUser();
    event.preventDefault();
    //this.props.refresh();
    //this.props.closePopup();
  }
  fuSetGeo= (val) =>{
    this.setState({lat:val.geometry.coordinates[0],lng:val.geometry.coordinates[1]});
  };
  async createUser() { 
    await axios({
      method: "post",
      url: ROUTES.API_GET_USER,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: this.state.email.toString(),
        first_name:this.state.firstname.toString(),
        last_name:this.state.lastname.toString(),
        phone_number: "+2519443322",
        password:this.state.passwordOne.toString(),
        type:"hr",
        status: "active",
        birthdate: "2020-01-27",
        address:{
          latitude: this.state.lat,
          longitude:this.state.lng,
          type:"user"},
        membership_id:4
      })
    }).then((response) => {
      this.setState({ loadingData: false });
      console.log(response);
      this.state.error="User added successfully.";
    }).catch(e=>{
      this.setState({ error:e});
      this.state.error="Error happened while adding user";
    });
    if (this.state.loadingData) {
      this.createUser();
    }
   // event.preventDefault();
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { firstname, lastname, email, passwordOne, passwordTwo,role, error,lat,lng } =
      this.state;
        
      /*
   map.on('move', () => {
      this.(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    }); */

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
              <Form.Label>Address</Form.Label>              
              <div id='map-container'  />
            </Form.Group>
            <Form.Label>Role</Form.Label>
            {/* <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label> Select Role </Form.Label>
              <Form.Control as="select" name="role" size="sm" value={role}
                onChange={this.onChange}>
                <option value="hr">HR</option>
                <option value="operations">Operations</option>
                <option value="data handler">Data Handler</option>
              </Form.Control>
            </Form.Group> */}
            
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
