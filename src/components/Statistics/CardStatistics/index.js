import React from "react";
import Card from "react-bootstrap/Card" ;
import  './card.css';
const CardStatistics = (props) =>(
<div>
    <Card style={{ width: '18rem', borderRadius: 25 }} class='stat'>
    <Card.Body style={{padding:0}}>
        <Card.Title >
            {props.title}
        </Card.Title> 
        <Card.Text>
        {props.content}
        </Card.Text> 
    </Card.Body>
    </Card>
</div>
);

export default CardStatistics