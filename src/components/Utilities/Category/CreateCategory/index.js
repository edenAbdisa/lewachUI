import React, { Component } from 'react';
import '../../../../css/popup.css';
import {Form,Button} from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from '../../../../constants/theme';

const INITIAL_STATE = {
  name: '',
  error: null,
};

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { name } = this.state;
    event.preventDefault(); 
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, error } = this.state;
    const isInvalid =  name === '';
    const inputsActive = this.props.type==='delete';
    return (
    <div className='popup'>
        <div className='popup_inner'>
        
        <p onClick={this.props.closePopup} style={{float:'right'}}>
            <AiFillCloseCircle/>
        </p>     
      
      <Form>
        <Form.Group controlId="formBasicAddCategory" onSubmit={this.onSubmit}>
            <Form.Label >{this.props.title}</Form.Label>
            <Form.Control type="text" placeholder="Enter Category" value={name}
                onChange={this.onChange} name="name" disabled={inputsActive}/>
            <Form.Text className="text-muted">
            Make sure the category name doesnt exist.
            </Form.Text>
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

export default AddCategory;

