import React, { Component } from "react";
import CreateMembership from "./CreateMembership";
import { GrAdd } from "react-icons/gr";
import * as ROUTES from "../../../constants/routes.js";
import axios from "axios";
import RowSelection from "../../Table";

class Membership extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      categoryList: [],
      loading: false,
      editShowPopup: false,
      addShowPopup: false,
      deleteShowPopup: false,
      loadingData: true,
      singleData: {},
      column: [],
    };
  }
  COLUMNS = [
    {
      Header: "Name",
      Footer: "Name",
      accessor: "name",
      sticky: "left",
    },
    {
      Header: "Transaction limit",
      Footer: "Transaction limit",
      accessor: "transaction_limit",
      sticky: "left",
    },
    {
      Header: "Limit of post",
      Footer: "Limit of post",
      accessor: "limit_of_post",
      sticky: "left",
    },
  ];
  async getData() {
    this.setState({ column: this.COLUMNS });
    await axios.get(ROUTES.API_GET_MEMBERSHIP).then((response) => {
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
    /* if (this.state.user) {
      return;
    } */
    this.getData();
  }
  addMembershipViewPopup = () => {
    this.setState({
      addShowPopup: !this.state.addShowPopup,
    });
  };
  editMembershipViewPopup = (row) => {
    this.setState({
      editShowPopup: !this.state.editShowPopup,
      singleData: row,
    });
  };
  deleteMembershipViewPopup = (row) => {
    this.setState({
      deleteShowPopup: !this.state.deleteShowPopup,
      singleData: row,
    });
  };
  render() {
    return (
      <>
        <p onClick={this.addMembershipViewPopup.bind(this)}>
          <GrAdd /> Add Membership
        </p>

        <RowSelection
          showButton={true}
          showApprove={false}
          data={this.state.data}
          column={this.state.column}
          edit={this.editMembershipViewPopup.bind(this)}
          delete={this.deleteMembershipViewPopup.bind(this)}
        />
        {this.state.addShowPopup ? (
          <CreateMembership
            type="create"
            title="Add membership"
            message="Make sure the membership name doesnt exist."
            text="Close Me"
            buttonName="Add membership"
            closePopup={this.addMembershipViewPopup.bind(this)}
            singleData={this.state.singleData}
            refresh={this.getData.bind(this)}
          />
        ) : null}
        {this.state.editShowPopup ? (
          <CreateMembership
            type="edit"
            title="Edit membership"
            message="Make sure the membership name doesnt exist."
            text="Close Me"
            buttonName="Edit membership"
            closePopup={this.editMembershipViewPopup.bind(this)}
            singleData={this.state.singleData}
            refresh={this.getData.bind(this)}
          />
        ) : null}
        {this.state.deleteShowPopup ? (
          <CreateMembership
            type="delete"
            title="Delete membership"
            message="Are you sure you want to delete this membership?"
            text="Close Me"
            buttonName="Delete membership"
            closePopup={this.deleteMembershipViewPopup.bind(this)}
            singleData={this.state.singleData}
            refresh={this.getData.bind(this)}
          />
        ) : null}
      </>
    );
  }
}

export default Membership;
