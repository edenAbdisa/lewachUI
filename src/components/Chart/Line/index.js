import React, { Component } from "react";
import CanvasJSReact from "../../../css/canvasjs.react";
import "./../../../css/slider.css";
import { Form, Button } from "react-bootstrap"; 
import * as ROUTES from "../../../constants/routes.js";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPoints: this.props.dataPoints,
      startDate: new Date(),
      endDate: new Date(),
    };
  }
  async getUserData() {
    var data = {};
    var lineData = [];
    this.setState({ column: this.COLUMNS });
    await axios({
      method: "get",
      url:  
        ROUTES.API_GET_USER_COUNT_DATE +
          "/created_at/" +
          this.state.startDate.getFullYear().toString() +
          "-" +
          (this.state.startDate.getMonth() + 1).toString() +
          "-" +
          this.state.startDate.getDate().toString() +
          "/" +
          this.state.endDate.getFullYear().toString() +
          "-" +
          (this.state.endDate.getMonth() + 1).toString() +
          "-" +
          this.state.endDate.getDate().toString()
      ,headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          },
        })
      .then((response) => {
        console.log(response.data);
        data = response.data;
        if (this.state.loadingData) {
          this.getUserData();
        }
        Object.keys(data).forEach(function (key) {
          lineData.push({
            x: new Date(key),
            y: data[key],
          });
        });
        this.setState({ loadingData: false, dataPoints: lineData });
      });
  }
  async getItemData() {
    var data = {};
    var lineData = [];
    this.setState({ column: this.COLUMNS });
    await axios({
      method: "get",
      url:  
        ROUTES.API_GET_ITEM_COUNT_DATE +
          "/created_at/" +
          this.state.startDate.getFullYear().toString() +
          "-" +
          (this.state.startDate.getMonth() + 1).toString() +
          "-" +
          this.state.startDate.getDate().toString() +
          "/" +
          this.state.endDate.getFullYear().toString() +
          "-" +
          (this.state.endDate.getMonth() + 1).toString() +
          "-" +
          this.state.endDate.getDate().toString()
      ,headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          },
        })
      .then((response) => {
        console.log(response.data);
        data = response.data;
        if (this.state.loadingData) {
          this.getItemData();
        }
        Object.keys(data).forEach(function (key) {
          lineData.push({
            x: new Date(key),
            y: data[key],
          });
        });
        this.setState({ loadingData: false, dataPoints: lineData });
      });
  }
  async getRequestData() {
    var data = {};
    var lineData = [];
    this.setState({ column: this.COLUMNS });
    await axios({
      method: "get",
      url:  
        ROUTES.API_GET_REQUEST_COUNT_DATE +
          "/created_at/" +
          this.state.startDate.getFullYear().toString() +
          "-" +
          (this.state.startDate.getMonth() + 1).toString() +
          "-" +
          this.state.startDate.getDate().toString() +
          "/" +
          this.state.endDate.getFullYear().toString() +
          "-" +
          (this.state.endDate.getMonth() + 1).toString() +
          "-" +
          this.state.endDate.getDate().toString()
      ,headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          },
        })
      .then((response) => {
        console.log(response.data);
        data = response.data;
        if (this.state.loadingData) {
          this.getRequestData();
        }
        Object.keys(data).forEach(function (key) {
          lineData.push({
            x: new Date(key),
            y: data[key],
          });
        });
        this.setState({ loadingData: false, dataPoints: lineData });
      });
  }
  async getServiceData() {
    var data = {};
    var lineData = [];
    this.setState({ column: this.COLUMNS });
    await axios({
      method: "get",
      url:  
        ROUTES.API_GET_SERVICE_COUNT_DATE +
          "/created_at/" +
          this.state.startDate.getFullYear().toString() +
          "-" +
          (this.state.startDate.getMonth() + 1).toString() +
          "-" +
          this.state.startDate.getDate().toString() +
          "/" +
          this.state.endDate.getFullYear().toString() +
          "-" +
          (this.state.endDate.getMonth() + 1).toString() +
          "-" +
          this.state.endDate.getDate().toString()
      ,headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          },
        })
      .then((response) => {
        console.log(response.data);
        data = response.data;
        if (this.state.loadingData) {
          this.getServiceData();
        }
        Object.keys(data).forEach(function (key) {
          lineData.push({
            x: new Date(key),
            y: data[key],
          });
        });
        this.setState({ loadingData: false, dataPoints: lineData });
      });
  }
  async getFlagData() {
    var data = {};
    var lineData = [];
    this.setState({ column: this.COLUMNS });
    await axios({
      method: "get",
      url:  
        ROUTES.API_GET_FLAG_COUNT_DATE +
          "/created_at/" +
          this.state.startDate.getFullYear().toString() +
          "-" +
          (this.state.startDate.getMonth() + 1).toString() +
          "-" +
          this.state.startDate.getDate().toString() +
          "/" +
          this.state.endDate.getFullYear().toString() +
          "-" +
          (this.state.endDate.getMonth() + 1).toString() +
          "-" +
          this.state.endDate.getDate().toString()
      ,headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          },
        })
      .then((response) => {
        console.log(response.data);
        data = response.data;
        if (this.state.loadingData) {
          this.getFlagData();
        }
        Object.keys(data).forEach(function (key) {
          lineData.push({
            x: new Date(key),
            y: data[key],
          });
        });
        this.setState({ loadingData: false, dataPoints: lineData });
      });
  }
  onClick = (event) => {
    switch (this.props.type) {
      case "service":
        this.getServiceData();
        break;
      case "item":
        this.getItemData();
        break;
      case "flag":
        this.getFlagData();
        break;
      case "request":
        this.getRequestData();
        break;
      default:
        this.getUserData();
        break;
    }
    event.preventDefault();
  };
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: this.props.title,
      },
      axisY: {
        title: this.props.ylabel,
        includeZero: false,
      },
      axisX: {
        title: this.props.xlabel,
      },
      data: [
        {
          type: "line",
          dataPoints: this.state.dataPoints,
        },
      ],
    };

    return (
      <div>
        <Form.Label for="start">Start date</Form.Label>
        <DatePicker
          style={{ display: "inline !important" }}
          selected={this.state.startDate}
          selectsStart
          dateFormat="yyyy-MM-dd"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={(date) => this.setState({ startDate: date })}
        />{" "}
        <label for="start">End date</label>
        <DatePicker
          style={{ display: "inline" }}
          selected={this.state.endDate}
          selectsEnd
          dateFormat="yyyy-MM-dd"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          minDate={this.state.startDate}
          onChange={(date) => this.setState({ endDate: date })}
        />
        <Button
          onClick={this.onClick}
          style={{ display: "inline", backgroundColor: "#4d4f53" }}
        >
          Update
        </Button>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default Line;
