import React,{Component} from "react";
import { Card, ListGroup, ListGroupItem,Button } from "react-bootstrap";
import "./card.css";
import logo from "./../../../logo.svg";
import { AiFillCloseCircle } from "react-icons/ai";
import "../../../css/popup.css";
import * as THEME from "../../../constants/theme";
import * as ROUTES from "../../../constants/routes.js";
import axios from "axios";
 
class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "",
    itemId: 0,
    error: null,
    loadingData: true };
  }
  async approveOrganization(event) {
    await axios({
      method:"put",
      url: ROUTES.API_GET_SINGLE_USER + "/" + this.state.itemId,
      headers: {
        "Content-Type": "application/json",
      },
      data:JSON.stringify({
        status:'active',
      }),
    })
      .then((response) => {
        this.setState({ loadingData: false });
        console.log(response);
      });
    if (this.state.loadingData) {
      this.approveOrganization();
    }
  }
  async declineOrganization(event) {
    await axios
      .put(ROUTES.API_GET_USER + "/" + this.state.itemId,{
        status:'declined'
      })
      .then((response) => {
        this.setState({ loadingData: false });
        console.log(response);
      });
    if (this.state.loadingData) {
      this.declineOrganization();
    }
  }
  componentDidMount(){
    this.setState({itemId:this.props.singleData.id});
  }
  render(){
    
    return(

      <div className="popup">
        <div className="popup_inner">
          <p onClick={this.props.closePopup} style={{ float: "right" }}>
            <AiFillCloseCircle />
          </p>

  <Card style={{ width: "18rem" }} class="membership">
    <Card.Img variant="top" src={logo} />
    <Card.Body>
      <Card.Title> {this.props.singleData.first_name}</Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>{this.props.singleData.phone_number}</ListGroupItem>
      <ListGroupItem>{this.props.singleData.email}</ListGroupItem>
    </ListGroup>
    <Card.Body>
    <Button
              variant="primary"
              type="submit"
              onClick={(e) => this.approveOrganization(e)} 
              style={{ backgroundImage: THEME.SubmitGradientButton }}
            >
              Approve
            </Button>
            <Button
              variant="primary"
              onClick={(e) => this.declineOrganization(e)} 
              style={{ backgroundImage: THEME.SubmitGradientButton }}
            >
              Decline
            </Button>
    </Card.Body>
  </Card>
  </div>
      </div>
);
 }
}
export default UserCard;
