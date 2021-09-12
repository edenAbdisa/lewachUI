import React, { Component } from "react";
import CreateReporttype from "./CreateReporttype";
import { GrAdd } from "react-icons/gr";
import * as ROUTES from "../../../constants/routes.js";
import axios from "axios";
import RowSelection from "../../Table";
class Reporttype extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      reporttypeList: [],
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
      Header: "Report Detail",
      Footer: "Report Detail",
      accessor: "report_detail",
      sticky: "left",
    },
    {
      Header: "For",
      Footer: "For",
      accessor: "type_for",
      sticky: "left",
    },
  ];

  async getData() {
    this.setState({ column: this.COLUMNS }); 
    await axios({
      method: "get",
      url: ROUTES.API_GET_REPORTTYPE ,
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

  addReporttypeViewPopup = () => {
    this.setState({
      addShowPopup: !this.state.addShowPopup,
    });
  };
  editReporttypeViewPopup = (row) => {
    this.setState({
      editShowPopup: !this.state.editShowPopup,
      singleData: row,
    });
  };
  deleteReporttypeViewPopup = (row) => {
    this.setState({
      deleteShowPopup: !this.state.deleteShowPopup,
      singleData: row,
    });
  };
  render() {
    return (
      <>
        <p onClick={this.addReporttypeViewPopup.bind(this)}
        data-cy="addReporttype"
        >
          <GrAdd /> Add reporttype
        </p>

        <RowSelection
          showApprove={false}
          showButton={true}
          data={this.state.data}
          column={this.state.column}
          edit={this.editReporttypeViewPopup.bind(this)}
          delete={this.deleteReporttypeViewPopup.bind(this)}
        />
        {this.state.addShowPopup ? (
          <CreateReporttype
            type="create"
            title="Add report type"
            message="Make sure the report type detail doesnt exist."
            text="Close Me"
            buttonName="Add report type"
            closePopup={this.addReporttypeViewPopup.bind(this)}
            refresh={this.getData.bind(this)}
          />
        ) : null}
        {this.state.editShowPopup ? (
          <CreateReporttype
            singleData={this.state.singleData}
            type="edit"
            title="Edit reporttype"
            message="Make sure the report type detail doesnt exist."
            text="Close Me"
            buttonName="Edit report type"
            closePopup={this.editReporttypeViewPopup.bind(this)}
            refresh={this.getData.bind(this)}
          />
        ) : null}
        {this.state.deleteShowPopup ? (
          <CreateReporttype
            singleData={this.state.singleData}
            type="delete"
            title="Delete reporttype"
            message="Are you sure you want to delete this report type?"
            text="Close Me"
            buttonName="Delete report type"
            closePopup={this.deleteReporttypeViewPopup.bind(this)}
            refresh={this.getData.bind(this)}
          />
        ) : null}
      </>
    );
  }
}

export default Reporttype;
