import React, { Component } from "react";
import UserCard from "./UserCard"; 
import * as ROUTES from "../../constants/routes.js";
import * as THEME from "../../constants/theme.js";
import axios from "axios";
import RowSelection from "../Table";
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
  COLUMNS = [
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
      Header: "Status",
      Footer: "Status",
      accessor: "status",
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
  ];

  async getData() {
    this.setState({ column: this.COLUMNS }); 
    await axios({
      method: "get",
      url: ROUTES.API_GET_ORGANIZATION+'/pending',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      style={{
        textAlign: "center",
        color: THEME.TitleColor,
        fontSize: THEME.TitleSize,
      }}
    >Organization Managment</h3>
        <RowSelection
          data={this.state.data}
          column={this.state.column}
          approve={this.approveOrganizationViewPopup.bind(this)} 
          showButton={false}
          showApprove={true}
          showRemove={false}
        />
        {this.state.approveShowPopup ? (
          <UserCard
            singleData={this.state.singleData} 
            title="Delete category" 
            text="Close Me" 
            closePopup={this.approveOrganizationViewPopup.bind(this)}
            
          />
        ) : null}
      </>
    );
  }
}

export default Membership;
