import React,{Component} from "react";
import { Row, Col } from "react-bootstrap";
import CardReport from "../CardReport";
import * as ROUTES from "../../../constants/routes.js";
import * as THEME from "../../../constants/theme.js";
import axios from "axios";
import RowSelection from "../../Table";
import { format } from 'date-fns';
class UserReport extends Component {
  constructor(props) {
   super(props);
   this.state = {
     data: [], 
     loading: false, 
     loadingData: true,
     singleData: {},
     column: [], 
     organizationNumber:0,
     userNumber:0
   };
 } 
 COLUMNS = [
   {
    Header: "Name",
    columns:[
      {             
      Header: "First Name",
      accessor: "first_name",
      filter: 'equals',
      sticky: "left",
     },
     {
      Header: "Last Name",
      accessor: "last_name",
      filter: 'equals',
      sticky: "left",
      },
      
    ],
   },
   {
     Header: "Created on",
     Footer: "Created on",
     accessor: "created_at",
     sticky: "left", 
     Filter: RowSelection.SliderColumnFilter,
     filter: 'equals',
     Cell: ({ value }) => {
       return format(new Date(value), 'dd/MM/yyyy')
     }
   }
 ];
 async getData() {
  this.setState({ column: this.COLUMNS });
  await axios.get(ROUTES.API_GET_USER,
    { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    
    .then((response) => {
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
async getUser() {
  var data={};
  var user=0;
  var organization=0; 
  this.setState({ column: this.COLUMNS }); 
  await axios({
    method: "get",
    url: ROUTES.API_GET_USER_COUNT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  }).then((response) => {
    console.log(response.data);
    data=response.data;
  });
  if (this.state.loadingData) {
    this.getUser();
  }
  Object.keys(data).forEach(function(key) {
    user=key==='user'?data[key]:user;
    organization=key==='org'?data[key]:organization;
  });
  this.setState({loadingData: false,userNumber: user,  organizationNumber: organization});

}
componentWillMount() {
  this.getData();
  this.getUser();
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
        <CardReport title="Number of organization registered" content={this.state.organizationNumber} />
      </Col>
      <Col>
        <CardReport title="Number of user registered" content={this.state.userNumber} />
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


export default UserReport;
