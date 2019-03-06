import React from 'react';

import './StandardList.css'

const standardList = (props) => {
    return (
        <div className="StandardList">
            <div className="Title">
                {props.title}
                <div className="List">{props.loaded}</div>
            </div>
        </div>
    );
}

export default standardList;