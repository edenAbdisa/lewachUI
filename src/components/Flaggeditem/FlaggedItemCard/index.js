import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./card.css";
import logo from "./../../../logo.svg";
import * as THEME from "../../../constants/theme";
import "../../../css/popup.css";
import { AiFillCloseCircle } from "react-icons/ai";
const INITIAL_STATE = {
  name: "",
  itemId: 0,
  error: null,
  isDelete: false,
  isCreate: false,
  isEdit: false,
  loadingData: true,
};

class FlaggedItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <p onClick={this.props.closePopup} style={{ float: "right" }}>
            <AiFillCloseCircle />
          </p>
          <Card style={{ width: "18rem" }} class="flagged">
            <Card.Img variant="top" src={logo} />
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
                backgroundImage: THEME.CardBottom,
                color: "black !important",
              }}
            >
              <Card.Link href="#" style={{ color: "#fff !important" }}>
                Keep it
              </Card.Link>
              <Card.Link href="#">Remove it</Card.Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
export default FlaggedItemCard;
