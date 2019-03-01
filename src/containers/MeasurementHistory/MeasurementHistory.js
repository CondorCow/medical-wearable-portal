import React, { Component } from 'react';
import { connect } from 'react-redux';

import './MeasurementHistory.css';

import Measurement from '../../components/Measurement/Measurement';

class MeasurementHistory extends Component {
    render() {
        var groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };

        let measurementGroups = groupBy(this.props.measurementHistory, 'recordedAt');
        console.log(Object.entries(measurementGroups));

        return <div className="Container">
            {this.props.measurementHistory ?
                <ul>{Object.entries(measurementGroups).map(m => {
                    return <Measurement
                        key={m[0]}
                        measurements={m} />
                }
                )}</ul> : null
            }
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        selectedClient: state.client.selectedClient,
        loadingHistory: state.client.loadingMeasurements,
        measurementHistory: state.client.history
    }
};

export default connect(mapStateToProps)(MeasurementHistory);