import React, { Component } from "react";
import "../../../../css/popup.css";
import { Form, Button } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from "../../../../constants/theme";
import * as ROUTES from "../../../../constants/routes.js";
import axios from "axios";

const INITIAL_STATE = {
  
};

class Reporttype extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    report_detail: this.props.type === "create" ? "" : this.props.singleData.report_detail,
    type_for: this.props.type === "create" ? "" : this.props.singleData.type_for,
    itemId: 0,
    error: null,
    isDelete: false,
    isCreate: false,
    isEdit: false,
    loadingData: true,};
  }
  async createReporttype() {
    await axios({
      method: "post",
      url: ROUTES.API_GET_REPORTTYPE,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      data: JSON.stringify({
        report_detail: this.state.report_detail,
        type_for: this.state.type_for
      }),
    }).then((response) => {
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
    }).catch(e=>{this.setState({ loadingData: false}); 
      if(e.response.status === 400){
        var err=e.response.data.content[0].error;
          this.setState({error:
            (err.report_detail?JSON.stringify(err.report_detail):"")
        +'\n'+ (err.type_for?JSON.stringify(err.type_for):"")
        
          });
      }else{
        this.setState({error:err});
      }
    });
    if (this.state.loadingData) {
      this.createReporttype();
    }
  }
  async editReporttype() { 
      await axios({
        method: "put",
        url: ROUTES.API_GET_REPORTTYPE + "/" + this.state.itemId,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(
          {
            report_detail: this.state.report_detail,
            type_for: this.state.type_for
          }
        )
      }).then((response) => {
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
      }).catch(e=>{this.setState({ loadingData: false}); 
        if(e.response.status === 400){
          var err=e.response.data.content[0].error;
            this.setState({error:
              (err.report_detail?JSON.stringify(err.report_detail):"")
          +'\n'+ (err.type_for?JSON.stringify(err.type_for):"")
          
            });
        }else{
          this.setState({error:err});
        }
      });
    if (this.state.loadingData) {
      this.editReporttype();
    }
  }
  async deleteReporttype() { 
    await axios({
      method: "delete",
      url: ROUTES.API_GET_REPORTTYPE + "/" + this.state.itemId,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((response) => {
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
    }).catch(e=>{this.setState({ loadingData: false});
    var err=e.response.data.content[0].error; 
        this.setState({error:err});
    });
    if (this.state.loadingData) {
      this.deleteReporttype();
    }
  }
  async onSubmit(event) {
    if (this.state.isCreate) {
      this.createReporttype();
    } else if (this.state.isEdit) {
      this.editReporttype();
    } else {
      this.deleteReporttype();
    } 
    event.preventDefault();
    //this.props.refresh();
    //this.props.closePopup();
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { report_detail, type_for, error } = this.state;
    const isInvalid = report_detail === "" || type_for === "";
    this.state.isDelete= this.props.type === "delete" ;
    this.state.isCreate=this.props.type === "create" ;
    this.state.isEdit=this.props.type === "edit" ;
    this.state.itemId= this.state.isCreate ? null : this.props.singleData.id;


    return (
      <div className="popup">
        <div className="popup_inner">
          <p onClick={this.props.closePopup} style={{ float: "right" }}
          data-cy="closeReporttypepopup">
            <AiFillCloseCircle />
          </p>

          <Form onSubmit={(e) => this.onSubmit(e)}>
            <Form.Group controlId="formBasicAddReporttype">
              <Form.Label>{this.props.title}</Form.Label>
              <Form.Text className="text-muted">
                {this.props.messages}
              </Form.Text>
              <Form.Label>Report type Name</Form.Label>
              <Form.Control
                data-cy="reporttypeName"
                type="text"
                placeholder={
                  this.state.isCreate
                    ? "Enter the report detail"
                    : this.props.singleData.report_detail
                }
                value={report_detail}
                onChange={this.onChange}
                name="report_detail"
                disabled={this.state.isDelete}
              /> 
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>
                {" "}
                {this.state.isCreate
                  ? "Enter the type"
                  : this.props.singleData.type_for}{" "}
              </Form.Label>
              <Form.Control
                as="select"
                name="type_for"
                size="sm"
                value={type_for}
                disabled={this.state.isDelete}
                onChange={this.onChange}
              >
                <option value="user">Users</option>
                <option value="item">Item</option>
                <option value="service">Service</option>
              </Form.Control>
            </Form.Group>
            <Button
              data-cy="reporttypeSubmit"
              variant="primary"
              type="submit"
              disabled={this.state.isDelete?false:isInvalid}
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

export default Reporttype;
