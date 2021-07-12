import React from "react";
import CardStatistics from "./CardStatistics" ;
import Line   from '../Chart/Line'; 
const Statistics = () =>(
    
<>
<div style={{float:"right"}}>
    <CardStatistics title="Number of users" content="400"/>
    <CardStatistics title="Number of items" content="4500"/>
</div>
<div>
<Line />
</div>
</>

);

export default Statistics