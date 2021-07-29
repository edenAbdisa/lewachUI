import React, { Component } from "react";
import "../../../../css/popup.css";
import { Form, Button } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import * as THEME from "../../../../constants/theme";
import * as ROUTES from "../../../../constants/routes.js";
import axios from "axios";

const INITIAL_STATE = {
  report_detail: "",
  type_for: "",
  itemId: 0,
  error: null,
  isDelete: false,
  isCreate: false,
  isEdit: false,
  loadingData: true,
};

class Reporttype extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  async createReporttype() {
    await axios({
      method: "post",
      url: ROUTES.API_GET_REPORTTYPE,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        report_detail: this.state.report_detail,
        type_for: this.state.type_for,
      }),
    }).then((response) => {
      this.setState({ loadingData: false });
      this.state.error="Report type added successfully.";

      console.log(response);
    }).catch(e=>{
      //this.setState({ error:e});
      this.state.error="Error happened while adding report type.";
    });
    if (this.state.loadingData) {
      this.createReporttype();
    }
  }
  async editReporttype() {
    await axios
      .put(ROUTES.API_GET_REPORTTYPE + "/" + this.state.itemId, {
        report_detail: this.state.report_detail,
        type_for: this.state.type_for,
      })
      .then((response) => {
        this.setState({ loadingData: false });
        this.state.error="Report type edited successfully.";
        console.log(response);
      }).catch(e=>{
        //this.setState({ error:e});
        this.state.error="Error happened while editing report type.";
      });
    if (this.state.loadingData) {
      this.editReporttype();
    }
  }
  async deleteReporttype() {
    await axios
      .delete(ROUTES.API_GET_REPORTTYPE + "/" + this.state.itemId)
      .then((response) => {
        this.setState({ loadingData: false });
        this.state.error="Report type deleted successfully.";

        console.log(response);
      }).catch(e=>{
        //this.setState({ error:e});
        this.state.error="Error happened while deleting the report type.";
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
          <p onClick={this.props.closePopup} style={{ float: "right" }}>
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
              <Form.Label>Type for</Form.Label>
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
                name="categoryId"
                size="sm"
                disabled={this.state.isDelete}
                onChange={this.onChange}
              >
                <option>Users</option>
                <option>Item</option>
                <option>Service</option>
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={this.state.isDelete?false:isInvalid}
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

export default Reporttype;
