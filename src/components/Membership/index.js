import React, { Component } from "react";
//import CreateCategory from "./CreateCategory";
import { GrAdd } from "react-icons/gr";
import * as ROUTES from "../../constants/routes.js";
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
  ];

  async getData() {
    this.setState({ column: this.COLUMNS });
    await axios.get(ROUTES.API_GET_INTERNAL_USER).then((response) => {
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

  approveOrganizationViewPopup = () => {
    this.setState({
      approveShowPopup: !this.state.approveShowPopup,
    });
  };
  render() {
    return (
      <>
        <RowSelection
          data={this.state.data}
          column={this.state.column}
          approve={this.approveOrganizationViewPopup.bind(this)} 
          showButton={false}
          showApprove={true}
        />
        
      </>
    );
  }
}

export default Membership;
