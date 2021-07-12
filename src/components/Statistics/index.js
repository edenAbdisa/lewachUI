import React from "react";
import Line   from '../Chart/Line'; 
import {Row ,Col} from "react-bootstrap" ;
import * as THEME from '../../constants/theme.js';
import CardStatistics from "./CardStatistics" ;

const Statistics = () =>(
 <>   
 <h3 style={{textAlign:'center', color:THEME.TitleColor, fontSize:THEME.TitleSize}}>Statistics</h3>
 <Row style={{backgroundColor:"#def1ef", borderRadius: 25, textAlign: '-webkit-center',padding: 9}}> 
    <Col>
    <CardStatistics title="Number of users" content="400"/>
    </Col>
    <Col>
    <CardStatistics title="Number of items" content="4500"/>
    </Col>
</Row>
<Row style={{textAlign: '-webkit-center',padding: 9}}> 
<Line 
    title="Number of registered users"
    ylabel="Number of users"
    xlabel="Month"/> 

</Row>
<Row>
<Line 
    title="Number of registered items"
    ylabel="Number of items"
    xlabel="Month"/>
</Row>
</>
);

export default Statistics