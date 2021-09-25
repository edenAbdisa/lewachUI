import React, { Component } from "react";
import { compose } from "recompose";  
import * as ROUTES from "../../constants/routes";
import * as THEME from "../../constants/theme";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom"; 


class SignOut extends Component {
    constructor(props) {
      super(props); 
    }
    async logout(){
        await axios({
            method: "post",
            url: ROUTES.API_GET_USER_LOGOUT,
            headers: {
              "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },
            data: JSON.stringify({
              remember_token:localStorage.getItem('token')
            })
            
            }).then((response) => {      
                localStorage.setItem('auth', false);      
                localStorage.setItem('role', '');
                localStorage.setItem('token', '');
                localStorage.setItem('userId', '');
                this.props.history.push(ROUTES.SIGNIN);
            // check if the data is populated
            // you tell it that you had the result
           // this.setState({ loadingData: false });
          }); 
    }
render(){
    this.logout();
    return(
    <></>
)};

}
export default withRouter(SignOut);