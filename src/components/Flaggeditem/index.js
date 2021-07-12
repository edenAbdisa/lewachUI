import React from "react";
import {Row,Col} from "react-bootstrap" ;
import * as THEME from '../../constants/theme.js';
import FlaggedItemCard from "./FlaggedItemCard" ;

const FlaggedItem = () =>(
<>
<h3 style={{textAlign:'center', color:THEME.TitleColor, fontSize:THEME.TitleSize}}>Flagged Items</h3>
 <Row style={{backgroundColor:"#def1ef", borderRadius: 25, textAlign: '-webkit-center',padding: 9}}> 
    <Col>
    <FlaggedItemCard reason="Old" />
    </Col>
    <Col>
    <FlaggedItemCard reason="Fake" />
    </Col>
</Row>
</>
);

export default FlaggedItem