import React, { Component } from 'react';
import '../../../../css/popup.css';
import {Form,Button} from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from '../../../../constants/theme';

const INITIAL_STATE = {
  name: '',
  error: null,
};

class AddType extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { name, password } = this.state;
    event.preventDefault(); 
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, error } = this.state;
    const isInvalid = name === '';
    const inputsActive = this.props.type==='delete';

    return (
    <div className='popup'>
        <div className='popup_inner'>
        
        <p onClick={this.props.closePopup} style={{float:'right'}}>
            <AiFillCloseCircle/>
        </p>     
      
      <Form > 
        <Form.Group controlId="formBasicAddType" onSubmit={this.onSubmit}   >
            <Form.Label >{this.props.title}</Form.Label>
            <Form.Text className="text-muted">
             {this.props.message}
            </Form.Text>
            <Form.Label>Type</Form.Label>
            <Form.Control type="text" placeholder="Enter type" value={name}
                onChange={this.onChange} name="name" disabled={inputsActive}/>
            
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2" >
            <Form.Label > Select category </Form.Label>
            <Form.Control as="select" size="sm" disabled={inputsActive} >
            <option>Category 1</option>
            <option>Category 2</option>
            <option>Category 3</option>
            <option>Category 4</option>
            <option>Category 5</option>
            </Form.Control>
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

export default AddType;

