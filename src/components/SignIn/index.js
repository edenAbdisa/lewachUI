import React, { Component } from "react"; 
import { compose } from "recompose";
import { SignUpLink } from "../SignUp"; 
import "./signin.css";
import * as ROUTES from "../../constants/routes";
import * as THEME from "../../constants/theme"; 
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import ReCaptchaV2 from 'react-google-recaptcha'

const defaultForm = { 
  email: '',
  password: '', 
  token: '',
}
const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  form:defaultForm
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
   handleToken = (token) => {
    this.setState({token:token}) ;
  }

  /**
   * Removes the token from the from object
   */
   handleExpire = () => {
    this.setState({token:null}) ;
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
          localStorage.setItem('userId', response.data.id);  
          this.props.history.push(ROUTES.REPORT);
           
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
<div className="outer ">
  <div className="signin_inner">
  <Form onSubmit={(e) => this.onSubmit(e)} style={{    textAlign: 'center'}}>
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
         
          <ReCaptchaV2
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={this.handleToken}
            onExpire={this.handleExpire}
          /> 
        <Button
              variant="primary"
              type="submit"
              disabled={isInvalid}
              style={{ position:'center', backgroundImage: THEME.SubmitGradientButton }}
            >
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
      </div>
      </div>
    );
  }
}
 
export default withRouter(SignIn); 
