import React, { Component } from "react"; 
import { compose } from "recompose";
import { SignUpLink } from "../SignUp"; 
import * as ROUTES from "../../constants/routes";
import * as THEME from "../../constants/theme"; 
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect,withRouter } from 'react-router-dom';
const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignIn extends Component {
  constructor(props) {
    super(props); 
    this.state = { ...INITIAL_STATE };
  }
 async login(){   
  const { email, password } = this.state; 
      await axios({
        method: "post",
        url: ROUTES.API_GET_USER_LOGIN,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email:email,
          password:password
        })
      }).then((response) => {
          // check if the data is populated
          this.setState({ loadingData: false,messages:"Success"});
          console.log(response.data);
          if(response.data.remember_token){        
            localStorage.setItem('auth', true);      
          localStorage.setItem('role', response.data.type.toString());
          localStorage.setItem('token', response.data.remember_token.toString());
          localStorage.setItem('userId', response.data.id.toString());  
          this.props.history.push("/report");
           
         }

          if (this.state.loadingData) {
            this.login();
          }
      })
}
  async onSubmit (event) {
    this.login();     

    event.preventDefault(); 

  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <Form onSubmit={(e) => this.onSubmit(e)}>
        <Form.Group controlId="formBasicAddCategory">
              <Form.Label>Sign In</Form.Label>
        <Form.Control
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Form.Control
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        </Form.Group>
        <Button
              variant="primary"
              type="submit"
              disabled={isInvalid}
              style={{ backgroundImage: THEME.SubmitGradientButton }}
            >
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}
 
export default withRouter(SignIn); 
