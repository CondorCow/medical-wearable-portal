import React from 'react';
import './Client.css';

const client = (props) => {
    return (
        <div className={"Client " + (props.selected ? "selected" : "")} onClick={props.clicked}>
            <p>{props.lastName + ", " + props.name}</p>
        </div>
    );
}

export default client;