import React,{Component} from "react";
import Line from "../Chart/Line";
import { Row, Col } from "react-bootstrap";
import * as THEME from "../../constants/theme.js";
import * as ROUTES from "../../constants/routes.js";
import CardStatistics from "./CardStatistics";
import axios from "axios";
class Statistics extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    this.state={
      data:{},
      forUserLineData:[],
      forItemLineData:[],
      forServiceLineData:[],
      forFlagLineData:[],
      forRequestLineData:[],
      arr:[],
      startDate:today.getFullYear().toString() + '-' + (today.getMonth().toString() ) + '-' + today.getDate().toString(),
      endDate:today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString() + '-' + today.getDate().toString()
    }
  }
  async getUserData() {
   var data={};
   var lineData=[]; 
    this.setState({ column: this.COLUMNS });
    await axios.get(ROUTES.API_GET_USER_COUNT_DATE+'/created_at/'+this.state.startDate+'/'+this.state.endDate)
            .then((response) => {
      console.log(response.data);
      data=response.data;
     if (this.state.loadingData) {
      this.getUserData();
    }   
    Object.keys(data).forEach(function(key) {
      lineData.push(
        {
          x:new Date(key),
          y:data[key]
          
        }) 
    });
      this.setState({ loadingData: false, forUserLineData:lineData});
    });    
  }
  async getItemData() {
    var data={};
    var lineData=[]; 
     this.setState({ column: this.COLUMNS });
     await axios.get(ROUTES.API_GET_ITEM_COUNT_DATE+'/created_at/'+this.state.startDate+'/'+this.state.endDate).then((response) => {
       console.log(response.data);
       data=response.data;
      if (this.state.loadingData) {
       this.getItemData();
     }   
     Object.keys(data).forEach(function(key) {
       lineData.push(
         {
           x:new Date(key),
           y:data[key]
           
         }) 
     });
       this.setState({ loadingData: false, forItemLineData:lineData});
     });    
   }
   async getRequestData() {
    var data={};
    var lineData=[]; 
     this.setState({ column: this.COLUMNS });
     await axios.get(ROUTES.API_GET_REQUEST_COUNT_DATE+'/created_at/'+this.state.startDate+'/'+this.state.endDate).then((response) => {
       console.log(response.data);
       data=response.data;
      if (this.state.loadingData) {
       this.getRequestData();
     }   
     Object.keys(data).forEach(function(key) {
       lineData.push(
         {
           x:new Date(key),
           y:data[key]
           
         }) 
     });
       this.setState({ loadingData: false, forRequestLineData:lineData});
     });    
   }
   async getServiceData() {
    var data={};
    var lineData=[]; 
     this.setState({ column: this.COLUMNS });
     await axios.get(ROUTES.API_GET_SERVICE_COUNT_DATE+'/created_at/'+this.state.startDate+'/'+this.state.endDate).then((response) => {
       console.log(response.data);
       data=response.data;
      if (this.state.loadingData) {
       this.getServiceData();
     }   
     Object.keys(data).forEach(function(key) {
       lineData.push(
         {
           x:new Date(key),
           y:data[key]
           
         }) 
     });
       this.setState({ loadingData: false, forServiceLineData:lineData});
     });    
   }
   async getFlagData() {
    var data={};
    var lineData=[]; 
     this.setState({ column: this.COLUMNS });
     await axios.get(ROUTES.API_GET_FLAG_COUNT_DATE+'/created_at/'+this.state.startDate+'/'+this.state.endDate).then((response) => {
       console.log(response.data);
       data=response.data;
      if (this.state.loadingData) {
       this.getFlagData();
     }   
     Object.keys(data).forEach(function(key) {
       lineData.push(
         {
           x:new Date(key),
           y:data[key]
           
         }) 
     });
       this.setState({ loadingData: false, forFlagLineData:lineData});
     });    
   }
  
  componentWillMount() { 
    
  }
  render(){
    this.getUserData();
    this.getItemData();
    this.getRequestData();
    this.getServiceData();
    this.getFlagData();
  return(
  <> 
    <h3
     data-cy="h3title"
      style={{
        textAlign: "center",
        color: THEME.TitleColor,
        fontSize: THEME.TitleSize,
      }}
    >
       
      Statistics 
    </h3> 
    <Row style={{ textAlign: "-webkit-center", padding: 9, marginTop: 15 }}>
      <Col>
        <Line
          data-cy="forServiceLine"
          dataPoints={this.state.forServiceLineData}
          title="Number of registered Service"
          ylabel="Number of service"
          xlabel="Date"
          type='service'
        />{" "}
      </Col>
      <Col>
        <Line
         data-cy="forItemLine"
          dataPoints={this.state.forItemLineData}
          title="Number of registered items"
          ylabel="Number of items"
          xlabel="Date"
          type='item'
        />
      </Col>
    </Row>
    <Row style={{ textAlign: "-webkit-center", padding: 9, marginTop: 15 }}>
      <Col>
        <Line
          data-cy="forUserLine"
          dataPoints={this.state.forUserLineData}
          title="Number of registered users"
          ylabel="Number of users"
          xlabel="Date"
          type='user'
        />{" "}
      </Col>
      <Col>
        <Line
          dataPoints={this.state.forFlagLineData}
          title="Number of flagged items"
          ylabel="Number of Flagged items"
          xlabel="Date"
          type='flag'
        />
      </Col>
    </Row>
    <Row style={{ textAlign: "-webkit-center", padding: 9, marginTop: 15 }}>
      <Col>
        <Line
        dataPoints={this.state.forRequestLineData}
          title="Number of Request"
          ylabel="Number of Requests"
          xlabel="Date"
          type='request'
        />{" "}
      </Col>
    </Row>
  </>
)};
}

export default Statistics;
