import React, { Component } from "react";
import CreateCategory from "./CreateCategory";
import { GrAdd } from "react-icons/gr";
import * as ROUTES from "../../../constants/routes.js";
import axios from "axios";
import RowSelection from "../../Table";
class Category extends Component {
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
      column: []
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
      Header: "Used for",
      Footer: "Used for",
      accessor: "used_for",
      sticky: "left",
    }
  ];

  async getData() {
    this.setState({ column: this.COLUMNS }); 
    await axios({
      method: "get",
      url: ROUTES.API_GET_CATEGORY,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
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
    this.getData();
  }

  addCategoryViewPopup = () => {
    this.setState({
      addShowPopup: !this.state.addShowPopup,
    });
  };
  editCategoryViewPopup = (row) => {
    this.setState({
      editShowPopup: !this.state.editShowPopup,
      singleData: row,
    });
  };
  deleteCategoryViewPopup = (row) => {
    this.setState({
      deleteShowPopup: !this.state.deleteShowPopup,
      singleData: row,
    });
  };
  render() {
    return (
      <>
        <p onClick={this.addCategoryViewPopup.bind(this)}
         data-cy="addCategory"
        >
          <GrAdd /> Add category
        </p>

        <RowSelection
          data={this.state.data}
          column={this.state.column}
          edit={this.editCategoryViewPopup.bind(this)}
          delete={this.deleteCategoryViewPopup.bind(this)}
          showButton={true}
          showApprove={false}
        />
        {this.state.addShowPopup ? (
          <CreateCategory
            type="create"
            title="Add category"
            message="Make sure the category name doesnt exist."
            text="Close Me"
            buttonName="Add category"
            closePopup={this.addCategoryViewPopup.bind(this)}
            refresh={this.getData.bind(this)}
          />
        ) : null}
        {this.state.editShowPopup ? (
          <CreateCategory
            singleData={this.state.singleData}
            type="edit"
            title="Edit category"
            message="Make sure the category name doesnt exist."
            text="Close Me"
            buttonName="Edit category"
            closePopup={this.editCategoryViewPopup.bind(this)}
            refresh={this.getData.bind(this)}
          />
        ) : null}
        {this.state.deleteShowPopup ? (
          <CreateCategory
            singleData={this.state.singleData}
            type="delete"
            title="Delete category"
            message="Are you sure you want to delete this category?"
            text="Close Me"
            buttonName="Delete category"
            closePopup={this.deleteCategoryViewPopup.bind(this)}
            refresh={this.getData.bind(this)}
          />
        ) : null}
      </>
    );
  }
}

export default Category;
