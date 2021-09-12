import React, { Component } from "react";
import * as THEME from "../../constants/theme";
import * as ROUTES from "../../constants/routes";
import Users from "./Users";
import { AiOutlineUserAdd } from "react-icons/ai";
import axios from "axios";
import RowSelection from "../Table";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      editShowPopup: false,
      addShowPopup: false,
      deleteShowPopup: false,
      loadingData: true,
      singleData: {},
      column: [],
      firstname: "",
      lastname: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      isAdmin: false,
      error: null,
    };
  }
  COLUMNS = [
    {
      Header: "First Name",
      Footer: "First Name",
      accessor: "first_name",
      sticky: "left",
    },
    {
      Header: "Last Name",
      Footer: "Last Name",
      accessor: "last_name",
      sticky: "left",
    },
    {
      Header: "Email",
      Footer: "Email",
      accessor: "email",
      sticky: "left",
    },
  ];
  async getData() {
    this.setState({ column: this.COLUMNS });
    await axios
      .get(ROUTES.API_GET_INTERNAL_USER + "/active")
      .then((response) => { 
        this.setState({ data: response.data.data }); 
        this.setState({ loadingData: false });
      });

    if (this.state.loadingData) { 
      this.getData();
    }
  }
  componentWillMount() { 
    this.getData();
  }
  addUserViewPopup = () => {
    this.setState({
      addShowPopup: !this.state.addShowPopup,
    });
  };
  editUserViewPopup = (row) => {
    this.setState({
      editShowPopup: !this.state.editShowPopup,
      singleData: row,
    });
  };
  deleteUserViewPopup = (row) => {
    this.setState({
      deleteShowPopup: !this.state.deleteShowPopup,
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
        >
          Internal Account management
        </h3>

        <p onClick={this.addUserViewPopup.bind(this)} data-cy="addUser">
          <AiOutlineUserAdd /> Add Users
        </p>
        <RowSelection
          showButton={false}
          data={this.state.data}
          column={this.state.column}
          edit={this.editUserViewPopup.bind(this)}
          delete={this.deleteUserViewPopup.bind(this)}
        />
        {this.state.addShowPopup ? (
          <Users
            type="create"
            message="Make sure the Users email doesnt exist."
            title="Add User"
            text="Close Me"
            buttonName="Add User"
            closePopup={this.addUserViewPopup.bind(this)}
            refresh={this.getData.bind(this)}
          />
        ) : null}
        {this.state.editShowPopup ? (
          <Users
            type="edit"
            title="Edit User"
            message="Make sure the Users email doesnt exist."
            text="Close Me"
            buttonName="Edit User"
            closePopup={this.editUserViewPopup.bind(this)}
            singleData={this.state.singleData}
            refresh={this.getData.bind(this)}
          />
        ) : null}
        {this.state.deleteShowPopup ? (
          <Users
            type="delete"
            title="Delete User"
            message="Are you sure you want to delete this User?"
            text="Close Me"
            buttonName="Delete User"
            closePopup={this.deleteUserViewPopup.bind(this)}
            singleData={this.state.singleData}
            refresh={this.getData.bind(this)}
          />
        ) : null}
      </>
    );
  }
}
export default Account;
