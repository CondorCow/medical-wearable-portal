import React from 'react';
import './Client.css';

const client = (props) => {
    return (
        <div className={"Client " + (props.selected ? "selected" : "")} onClick={props.clicked}>
            <p>{props.name + ", " + props.lastName}</p>
        </div>
    );
}

export default client;