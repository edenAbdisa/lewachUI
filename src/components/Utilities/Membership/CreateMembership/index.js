import React, { Component } from 'react';
import '../../../../css/popup.css';
import {Form,Button} from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from '../../../../constants/theme';

const INITIAL_STATE = {
  name: '',
  limitOfPost:0 ,
  transactionLimit:0,
  error: null,
};

class AddMembership extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { name,limitOfPost,transactionLimit } = this.state;
    event.preventDefault(); 
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value,
        [event.target.limitOfPost]: event.target.value,
        [event.target.transactionLimit]: event.target.value });
  };

  render() {
    const { name,limitOfPost,transactionLimit, error } = this.state;
    const isInvalid =  name === '';
    const inputsActive = this.props.type==='delete';
    return (
    <div className='popup'>
        <div className='popup_inner'>
        
        <p onClick={this.props.closePopup} style={{float:'right'}}>
            <AiFillCloseCircle/>
        </p>     
      
      <Form> 
        <Form.Group controlId="formBasicAddMembership" onSubmit={this.onSubmit}>
            <Form.Label >{this.props.title}</Form.Label>
            <Form.Text className="text-muted">
             {this.props.message}
            </Form.Text>
            <Form.Label>Membership name</Form.Label>
            <Form.Control type="text" placeholder="Premium" value={name}
                onChange={this.onChange} name="name" disabled={inputsActive}/>
                <Form.Label>Transaction limit</Form.Label>
            <Form.Control type="number" placeholder="Enter transaction limit" value={limitOfPost}
                onChange={this.onChange} name="limitOfPost" disabled={inputsActive}/>
                <Form.Label>Limit of post</Form.Label>
            <Form.Control type="number" placeholder="Enter Limit of post" value={transactionLimit}
                onChange={this.onChange} name="transactionLimit" disabled={inputsActive}/>
        </Form.Group> 
        <Button variant="primary" type="submit" disabled={isInvalid} style={{backgroundImage:THEME.SubmitGradientButton}}>
          {this.props.buttonName}
        </Button>
        {error && <p>{error.message}</p>}
        </Form>
      </div>
      </div>
    );
  }
}

export default AddMembership;

