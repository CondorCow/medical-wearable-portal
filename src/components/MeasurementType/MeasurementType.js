import React from 'react';
import './MeasurementType.css';

const measurementType = (props) => {
    return (
        <div className="MeasurementTypeItem">
            <p>{props.title}</p>
        </div>
    );
}

export default measurementType;