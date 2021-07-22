import React,{Component} from "react";
import { Row, Col } from "react-bootstrap";
import CardReport from "../CardReport";
import * as ROUTES from "../../../constants/routes.js";
import axios from "axios";
import RowSelection from "../../Table";
import { format } from 'date-fns';
class ItemReport extends Component {
   constructor(props) {
    super(props);
    this.state = {
      data: [], 
      loading: false, 
      loadingData: true,
      singleData: {},
      column: [],
      requestData:[],
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
      sticky: "left",
      Filter: 'SliderColumnFilter',
      filter: 'equals'
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
    await axios.get(ROUTES.API_GET_ITEM).then((response) => {
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
  async getRequest() {
    var data={};
    var open=0;
    var bartered=0;
    var declined=0;
    var accepted=0;
    this.setState({ column: this.COLUMNS });
    await axios.get(ROUTES.API_GET_REQUEST_COUNT+'/item').then((response) => {
      console.log(response.data);
      data=response.data;
    });
    if (this.state.loadingData) {
      this.getRequest();
    }
    Object.keys(data).forEach(function(key) {
      accepted=key==='accepted'?data[key]:accepted;
      declined=key==='declined'?data[key]:declined;
      bartered=key==='bartered'?data[key]*2:bartered;
      open=key==='open'?data[key]:open;
    });
    this.setState({loadingData: false,
                   acceptedRequest: accepted,  barteredRequest: bartered, 
                   declinedRequest: declined,  openRequest: open});

  }
  componentWillMount() {
    this.getData();
    this.getRequest();
  }

render(){ 
  return(
  <>
  <div style={{
        backgroundColor: "#def1ef",
        borderRadius: 25,
        textAlign: "-webkit-center",
        padding: 9,
      }}>
    <Row
      
    >
      <Col>
        <CardReport title="Open barters" content={this.state.openRequest} />
      </Col>
      <Col>
        <CardReport title="Bartered items" content={this.state.barteredRequest} />
      </Col>
     
    </Row>
    <Row>
    <Col>
        <CardReport title="Accepted item barter requests " content={this.state.acceptedRequest} />
      </Col>
      <Col>
        <CardReport title="Declined item barter requests " content={this.state.declinedRequest} />
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

export default ItemReport;
