import React, { Component } from "react";
import UserCard from "./UserCard"; 
import * as ROUTES from "../../constants/routes.js";
import * as THEME from "../../constants/theme.js";
import axios from "axios";
import RowSelection from "../Table";
import DataTable from 'react-data-table-component'; 
class Membership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      categoryList: [],
      loading: false,
      approveShowPopup: false,
      loadingData: true,
      singleData: {},
      column: []
    };
  }
 /*  COLUMNS = [
    {
      Header: "Name",
      Footer: "Name",
      accessor: "first_name",
      sticky: "left",
    },
    {
      Header: "Id",
      Footer: "Id",
      accessor: "id",
      sticky: "left",
    },
    {
      Header: "Membership",
      Footer: "Membership",
      accessor: "membership.name",
      sticky: "left",
    },
    {
      Header: "Type",
      Footer: "Type",
      accessor: "type",
      sticky: "left",
    },
    
    {
      Header: "Email",
      Footer: "Email",
      accessor: "email",
      sticky: "left",
    },
    {
      Header: "Phone Number",
      Footer: "Phone Number",
      accessor: "phone_number",
      sticky: "left",
    },
    {
      Header: "Picture",
      Footer: "Picture",
      accessor: "TIN_picture",
      sticky: "left",
    }
  ]; */
  COLUMNS = [
    {      
      cell:row => <button onClick={() => this.approveOrganizationViewPopup(row)}>View</button>,
        name: 'View',
        selector: row => row.id
      
    } ,
     { 
        name: 'Name',
        selector: row => row.first_name,
        sortable: true 
    },
    { 
        name: 'Membership type',
        selector: row => row.membership.name,
        sortable: true 
    } ,
    { 
        name: 'Type',
        selector: row => row.type,
        sortable: true 
    } 
];
  async getData() {
    this.setState({ column: this.COLUMNS }); 
    await axios.get(ROUTES.API_GET_USER+'/pending',{ 
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
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
  componentWillMount() {
    this.getData();
  }

  approveOrganizationViewPopup = (row) => {
    this.setState({
      approveShowPopup: !this.state.approveShowPopup,
      singleData: row,
    });
  };
  render() {
    return (
      <>
      <h3
       data-cy="h3title"
      style={{
        textAlign: "center",
        color: THEME.TitleColor,
        fontSize: THEME.TitleSize,
      }}
    >User Managment</h3>
    <DataTable
            columns={this.state.column}
            data={this.state.data} 
        />
        {/* <RowSelection
          data={this.state.data}
          column={this.state.column}
          approve={this.approveOrganizationViewPopup.bind(this)} 
          showButton={false}
          showApprove={true}
          showRemove={false}
        /> */}
        {this.state.approveShowPopup ? (
          <UserCard
            singleData={this.state.singleData} 
            title="Delete category" 
            text="Close Me" 
            closePopup={this.approveOrganizationViewPopup.bind(this)}
            refresh={this.getData.bind(this)}
          />
        ) : null}
      </>
    );
  }
}

export default Membership;
