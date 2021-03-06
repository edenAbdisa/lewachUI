import React, { Component } from "react";
import * as THEME from "../../constants/theme.js";
import FlaggedItemCard from "./FlaggedItemCard";
import * as ROUTES from "../../constants/routes.js";
import axios from "axios";
import RowSelection from "../Table";
import DataTable from 'react-data-table-component'; 
class Flagged extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      viewShowPopup: false,
      loadingData: true,
      singleData: {},
      column: [],
    };
  }
  /* COLUMNS = [
    {
      Header: "Id",
      Footer: "Id",
      accessor: "id",
      sticky: "left",
    },
    {
      Header: "Item Id",
      Footer: "Item Id",
      accessor: "flagged_item_id",
      sticky: "left",
    },
    {
      Header: "Item",
      Footer: "Item",
      accessor: "flagged_item.name",
      sticky: "left",
    },
    {
      Header: "Description",
      Footer: "Description",
      accessor: "flagged_item.description",
      sticky: "left",
    },
    {
      Header: "Reason",
      Footer: "Reason",
      accessor: "reason.report_detail",
      sticky: "left",
    },
    {
      Header: "Type",
      Footer: "Type",
      accessor: "type",
      sticky: "left",
    },
    {
      Header: "Picture",
      Footer: "Picture",
      accessor: "flagged_item.picture",
      sticky: "left",
    },
    {
      Header: "Flagged by",
      Footer: "Flagged by",
      accessor: "flagged_by.first_name",
      sticky: "left",
    },
  ]; */
  COLUMNS = [
    {      
      cell:row => <button onClick={() => this.viewFlaggedViewPopup(row)}>View</button>,
        name: 'View',
        selector: row => row.id
      
    },
     { 
        name: 'Name',
        selector: row => row.flagged_item.name,
        sortable: true 
    },
    { 
        name: 'Reason',
        selector: row => row.reason.report_detail,
        sortable: true 
    } 
];
  async getData() {
    this.setState({ column: this.COLUMNS }); 
    await axios({
      method: "get",
      url: ROUTES.API_GET_FLAG,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((response) => {  
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
  viewFlaggedViewPopup = (row) => {
    this.setState({
      viewShowPopup: !this.state.viewShowPopup,
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
        >
          Flagged Items
        </h3>
        <DataTable
            data-cy="flaggeddatatable"
            columns={this.state.column}
            data={this.state.data} 
        />
       {/*  <RowSelection
          data={this.state.data}
          column={this.state.column}
          view={this.viewFlaggedViewPopup.bind(this)} 
          showButton={false}
          showApprove={false}
          showRemove={true}
        /> */}
        {this.state.viewShowPopup ? (
          <FlaggedItemCard
            type="edit"
            title="Edit type"
            reason="Make sure the type name doesnt exist."
            text="Close Me"
            buttonName="Edit type"
            closePopup={this.viewFlaggedViewPopup.bind(this)}
            singleData={this.state.singleData}
            refresh={this.getData.bind(this)}
          />
        ) : null}
      </>
    );
  }
}

export default Flagged;
