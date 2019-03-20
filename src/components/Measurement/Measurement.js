import React, { Component } from 'react';
import Moment from 'moment';

import './Measurement.css';
import Icon from '../../utils/Icon';

class Measurement extends Component {
    state = {
        expanded: false
    }

    onExpandHandler = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        let icons = this.props.measurements[1].map(measurement => {
            return <Icon key={measurement._id} icon={measurement.measurementTypeId.identifier} />
        });

        const expandedView = this.props.measurements[1].map(measurement => {
            switch (measurement.measurementTypeId.identifier) {
                case 'heartrate':
                    return (
                        <div className="Row">
                            <Icon icon="heartrate" />
                            {measurement.values[0].value}
                        </div>
                    );
                case 'bloodpressure':
                    let [bottom, top] = measurement.values.map(v => v.value);
                    return (<div className="Row">
                        <Icon icon="bloodpressure" />
                        {top} / {bottom}
                    </div>);
            }
        });
        console.log(expandedView);

        return (
            <div className="Measurement" onClick={this.onExpandHandler.bind(this)}>
                <div className="Header">
                    {Moment(this.props.measurements[0]).format('DD-MM-YYYY')}
                    <div className="float-right">
                    {icons}
                    </div>
                </div>
                {this.state.expanded ?
                (<div className="Details">
                    {expandedView}
                    </div>)
                    : null
                }
            </div>
        );
    }
}

export default Measurement;