import React,{Component} from "react";
import { Row, Col } from "react-bootstrap";
import CardReport from "../CardReport";
import * as ROUTES from "../../../constants/routes.js";
import * as THEME from "../../../constants/theme.js";
import axios from "axios";
import RowSelection from "../../Table";
import { format } from 'date-fns'
class ServiceReport extends Component {
  constructor(props) {
   super(props);
   this.state = {
     data: [], 
     loading: false, 
     loadingData: true,
     singleData: {},
     column: [],
     openRequest:0,
     barteredRequest:0,
     declinedRequest:0,
     acceptedRequest:0
   };
 }
 COLUMNS = [
   {
     Header: "Name",
     Footer: "Name",
     accessor: "name",
     filter: 'equals',
     sticky: "left",
   },
   {
     Header: "Created on",
     Footer: "Created on",
     accessor: "created_at",
     filter: 'equals',
     sticky: "left",
     Cell: ({ value }) => {
       return format(new Date(value), 'dd/MM/yyyy')
     }
   }
 ];
 async getData() {
  this.setState({ column: this.COLUMNS });
  await axios.get(ROUTES.API_GET_SERVICE).then((response) => {
    // check if the data is populated
    console.log(response.data.data);
    this.setState({ data: response.data.data });
    // you tell it that you had the result
    this.setState({ loadingData: false });
  });

  if (this.state.loadingData) {
    // if the result is not ready so you make the axios call
    this.getData();
  }
}
async getServiceCountByStatus() {
  var data={};    
  var open=0;
  var bartered=0;
  this.setState({ column: this.COLUMNS });
  await axios.get(ROUTES.API_GET_SERVICE_COUNT_BY_STATUS).then((response) => {
    console.log(response.data);
    data=response.data;
  });
  if (this.state.loadingData) {
    this.getServiceCountByStatus();
  }
  Object.keys(data).forEach(function(key) {
    bartered=key==='bartered'?data[key]:bartered;
    open=key==='open'?data[key]:open;
  });
  this.setState({loadingData: false,  barteredRequest: bartered, openRequest: open});

}
async getRequest() {
  var data={};
  var declined=0;
  var accepted=0;
  this.setState({ column: this.COLUMNS });
  await axios.get(ROUTES.API_GET_REQUEST_COUNT+'/service').then((response) => {
    console.log(response.data);
    data=response.data;
  });
  if (this.state.loadingData) {
    this.getRequest();
  }
  Object.keys(data).forEach(function(key) {
    accepted=key==='accepted'?data[key]:accepted;
    declined=key==='declined'?data[key]:declined; 
  });
  this.setState({loadingData: false,
                 acceptedRequest: accepted,
                 declinedRequest: declined});

}
componentWillMount() {
  this.getData();
  this.getRequest();
  this.getServiceCountByStatus();
}
 render(){
   return(
    <>
    <div style={{
         backgroundColor: THEME.DivColor, 
         textAlign: "-webkit-center",
         padding: 9,
         borderColor:THEME.ReportCardBoundaryColor,
         borderWidth:0.5,
         borderStyle:'solid'
        }}>
      <Row
        
      >
        <Col>
          <CardReport title="Open barters" content={this.state.openRequest} />
        </Col>
        <Col>
          <CardReport title="Bartered service" content={this.state.barteredRequest} />
        </Col>
       
      </Row>
      <Row>
      <Col>
          <CardReport title="Accepted service barter requests " content={this.state.acceptedRequest} />
        </Col>
        <Col>
          <CardReport title="Declined service barter requests " content={this.state.declinedRequest} />
        </Col>
      </Row>
      </div>
      <RowSelection
            data={this.state.data}
            column={this.state.column} 
            showButton={false}
      />
    </>
)};
}


export default ServiceReport;
