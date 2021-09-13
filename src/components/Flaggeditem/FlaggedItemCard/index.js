import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./card.css";
import logo from "./../../../logo.svg";
import * as THEME from "../../../constants/theme";
import * as ROUTES from "../../../constants/routes.js";
import axios from "axios";
import "../../../css/popup.css";
import { AiFillCloseCircle } from "react-icons/ai";
const INITIAL_STATE = {
  name: "",
  itemId: 0,
  flagId: 0,
  error: null,
  isDelete: false,
  isCreate: false,
  isEdit: false,
  loadingData: true,
  type: "",
};

class FlaggedItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  async keepItem(event) {
    await axios({
      method: "delete",
      url: ROUTES.API_GET_FLAG + "/" + this.state.flagId,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if(response.data.success){
        this.setState({
          loadingData: false,
          error:response.data.content[0].message});
      }else{
        this.setState({
          loadingData: false,
          error:response.data.content[0].error});
      } 
    }).catch((e) => { 
       
       this.setState({error:e.response.data.content[0].error});
}); 
    if (this.state.loadingData) {
      this.keepItem();
    }
  }
  async removeItem(event) {
    var url = "";
    if (this.state.type === "service") {
      url = ROUTES.API_GET_SERVICE + "/" + this.state.itemId;
    } else {
      url = ROUTES.API_GET_ITEM + "/" + this.state.itemId;
    }
    await axios({
      method: "put",
      url: url,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify({
        status: "removed",
      }),
    }).then((response) => {
      if(response.data.success){
        this.setState({
          loadingData: false,
          error:response.data.content[0].message});
      }else{
        this.setState({
          loadingData: false,
          error:response.data.content[0].error});
      } 
    }).catch((e) => {  this.setState({error:e.response.data.content[0].error});
}); 
    if (this.state.loadingData) {
      this.removeItem();
    }
    await axios({
      method: "delete",
      url: ROUTES.API_GET_FLAG + "/" + this.state.flagId,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if(response.data.success){
        this.setState({
          loadingData: false,
          error:response.data.content[0].message});
      }else{
        this.setState({
          loadingData: false,
          error:response.data.content[0].error});
      } 
    }).catch((e) => {  this.setState({error:e.response.data.content[0].error});
}); 
    if (this.state.loadingData) {
      this.keepItem();
    }
  }
  componentDidMount() {
    this.setState({
      type: this.props.singleData.type,
      flagId: this.props.singleData.id,
      itemId: this.props.singleData.flagged_item_id,
    });
  }
  render() {
    const {error}=this.state;
    return (
      <div className="popup">
        <div className="popup_inner">
          <p onClick={this.props.closePopup} style={{ float: "right" }}>
            <AiFillCloseCircle />
          </p>
          <Card style={{ width: "18rem" }} class="flagged">
            <Card.Img
              variant="top"
              src={this.props.singleData["flagged_item.picture"]}
            />
            <Card.Body>
              <Card.Title>
                {" "}
                {this.props.singleData["flagged_item.name"]}
              </Card.Title>
              <Card.Title>
                {" "}
                {this.props.singleData["flagged_by.email"]}
              </Card.Title>

              <Card.Title> {this.props.singleData.type}</Card.Title>
            </Card.Body>
            <Card.Body
              style={{
                color: "black !important",
              }}
            >
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => this.keepItem(e)}
                style={{ backgroundImage: THEME.SubmitGradientButton }}
              >
                Keep it
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => this.removeItem(e)}
                style={{ backgroundImage: THEME.SubmitGradientButton }}
              >
                Remove it
              </Button>
              <p>{error}</p>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
export default FlaggedItemCard;
