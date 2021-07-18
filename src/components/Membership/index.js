import React from "react";
import {Row,Col} from "react-bootstrap" ;
import * as THEME from '../../constants/theme.js';
import UserCard from "./UserCard" ;

const Membership = () =>(
<>
<h3 style={{textAlign:'center', color:THEME.TitleColor, fontSize:THEME.TitleSize}}>User</h3>
 <Row style={{backgroundColor:"#def1ef", borderRadius: 25, textAlign: '-webkit-center',padding: 9}}> 
    <Col>
    <UserCard companyName="Habtamu film house" tin="8987" email="hghgh@yahoo.com" />
    </Col>
    <Col>
    <UserCard companyName="Beshale hotel" tin="0987" email="hghgh@gmail.com"/>
    </Col>
</Row>
</>
);

export default Membership