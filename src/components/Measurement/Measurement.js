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
            switch(measurement.measurementTypeId.identifier) {
                case 'heartrate':
                    return <Icon icon="heartrate"/>
                case 'bloodpressure':
                    return <Icon icon="bloodpressure"/>
            }
        });

        return (
            <div className="Measurement" onClick={this.onExpandHandler.bind(this)}>
                {Moment(this.props.measurements[0]).format('DD-MM-YYYY')}
                {icons}
                {this.state.expanded ?
                    <div>expanded</div>
                    : null
                }
            </div>
        );
    }
}

export default Measurement;