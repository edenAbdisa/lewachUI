import React, { Component } from 'react';
import '../../../../css/popup.css';
import {Form,Button} from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from '../../../../constants/theme';
import * as ROUTES from  '../../../../constants/routes.js';
import axios from 'axios';

const INITIAL_STATE = {
  name: '',
  categoryId:0,
  itemId:0,
  error: null,
  isDelete:false,
  isCreate:false,
  isEdit:false,
  loadingData:true,
  categoryList:[]
};

class AddType extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
   componentWillMount() {
    this.getCategory();    
  }
  async createType(){
     await axios({
      method : "post",
      url :ROUTES.API_GET_TYPE,
      headers : {
          "Content-Type":"application/json",  
      },
      data : JSON.stringify({
        name:this.state.name
      })
    }) 
    .then((response) => {
      this.setState({loadingData:false});    
      console.log(response);
    });  
    if (this.state.loadingData) {
      this.createType();
    }  
  }
  async editType(){
    await axios
    .put(ROUTES.API_GET_TYPE+'/'+this.state.itemId,{
      name:this.state.name
    })
    .then((response) => {
      this.setState({loadingData:false});    
      console.log(response);
    });  
    if (this.state.loadingData) {
      this.editType();
    }
  }
  async deleteType(){
    await axios
    .delete(ROUTES.API_GET_TYPE+'/'+this.state.itemId)
    .then((response) => {
      this.setState({loadingData:false});    
      console.log(response);
    });  
    if (this.state.loadingData) {
      this.deleteType();
    }
  }
  async getCategory(){
    await axios
    .get(ROUTES.API_GET_CATEGORY)
    .then((response) => {
      this.setState({categoryList:response.data.data});    
      console.log(response);
    });  
    if (this.state.loadingData) {
      this.getCategory();
    }
  }
  onSubmit = event => {
    const { name, password } = this.state;
    if(this.state.isCreate){
      this.createType();
    }else if(this.state.isEdit){
      this.editType();
    }else{
      this.deleteType();
    }
    event.preventDefault(); 
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, error,categoryId } = this.state;
    const isInvalid = name === '';
    this.state.isDelete = this.props.type==='delete';
    this.state.isCreate = this.props.type==='create';
    this.state.isEdit = this.props.type==='edit';
    this.state.itemId=this.state.isCreate? null: this.props.singleData.id;
   
    return (
    <div className='popup'>
        <div className='popup_inner'>
        
        <p onClick={this.props.closePopup} style={{float:'right'}}>
            <AiFillCloseCircle/>
        </p>     
      
      <Form onSubmit={(e) => this.onSubmit(e)}> 
        <Form.Group controlId="formBasicAddType" onSubmit={this.onSubmit}   >
            <Form.Label >{this.props.title}</Form.Label>
            <Form.Text className="text-muted">
             {this.props.message}
            </Form.Text>
            <Form.Label>Type</Form.Label>
            <Form.Control type="text" placeholder={this.state.isCreate?'Enter the type':this.props.singleData.name} value={name}
                onChange={this.onChange} name="name"disabled={this.state.isDelete}/>
            
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2" >
            <Form.Label > {this.state.isCreate?'Select category':this.props.singleData.category} </Form.Label>
            <Form.Control as="select" name="categoryId" size="sm" disabled={this.state.isDelete} >
             {/* { this.state.categoryList.array.forEach(element => {
               <option value={element.id}>{element.name}</option> 
             }) } */}
            
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

