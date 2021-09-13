import React, { Component } from "react";
import CreateType from "./CreateType";
import { GrAdd } from "react-icons/gr";
import * as ROUTES from "../../../constants/routes.js";
import axios from "axios";
import RowSelection from "../../Table";

class Type extends Component {
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
    };
  }
  COLUMNS = [
    {
      Header: "Id",
      Footer: "Id",
      accessor: "id",
      sticky: "left",
    },
    {
      Header: "Name",
      Footer: "Name",
      accessor: "name",
      sticky: "left",
    },
    {
      Header: "Category",
      Footer: "Name",
      accessor: "category.name",
      sticky: "left",
    },
  ];
  async getData() {
    this.setState({ column: this.COLUMNS }); 
    await axios({
      method: "get",
      url: ROUTES.API_GET_TYPE,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(
        {
          name: this.state.name,
          category_id: this.state.categoryId
        }
      )
    }).then((response) => {
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
    //this.setState({loading:true});
    this.getData();
  }
  addTypeViewPopup = () => {
    this.setState({
      addShowPopup: !this.state.addShowPopup,
    });
  };
  editTypeViewPopup = (row) => {
    this.setState({
      editShowPopup: !this.state.editShowPopup,
      singleData: row,
    });
  };
  deleteTypeViewPopup = (row) => {
    this.setState({
      deleteShowPopup: !this.state.deleteShowPopup,
      singleData: row,
    });
  };
  render() {
    return (
      <>
        <p onClick={this.addTypeViewPopup.bind(this)}
        data-cy="addType">
          <GrAdd /> Add Type
        </p>

        <RowSelection
           showApprove={false}
          showButton={true}
          data={this.state.data}
          column={this.state.column}
          edit={this.editTypeViewPopup.bind(this)}
          delete={this.deleteTypeViewPopup.bind(this)}
        />
        {this.state.addShowPopup ? (
          <CreateType
            type="create"
            message="Make sure the type name doesnt exist."
            title="Add type"
            text="Close Me"
            buttonName="Add type"
            closePopup={this.addTypeViewPopup.bind(this)}
            refresh={this.getData.bind(this)}
          />
        ) : null}
        {this.state.editShowPopup ? (
          <CreateType
            type="edit"
            title="Edit type"
            message="Make sure the type name doesnt exist."
            text="Close Me"
            buttonName="Edit type"
            closePopup={this.editTypeViewPopup.bind(this)}
            singleData={this.state.singleData}
            refresh={this.getData.bind(this)}
          />
        ) : null}
        {this.state.deleteShowPopup ? (
          <CreateType
            type="delete"
            title="Delete type"
            message="Are you sure you want to delete this type?"
            text="Close Me"
            buttonName="Delete type"
            closePopup={this.deleteTypeViewPopup.bind(this)}
            singleData={this.state.singleData}
            refresh={this.getData.bind(this)}
          />
        ) : null}
      </>
    );
  }
}

export default Type;
