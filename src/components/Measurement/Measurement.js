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
                        <div>
                            <Icon icon="heartrate" />
                            {measurement.values[0].value}
                        </div>
                    );
                case 'bloodpressure':
                    let values = measurement.values.map(v => {
                        return v.value
                    })
                    return (<div>
                        <Icon icon="bloodpressure" />
                        {values}
                    </div>);
            }
        });
        console.log(expandedView);

        return (
            <div className="Measurement" onClick={this.onExpandHandler.bind(this)}>
                {Moment(this.props.measurements[0]).format('DD-MM-YYYY')}
                {icons}
                {this.state.expanded ?
                    expandedView
                    : null
                }
            </div>
        );
    }
}

export default Measurement;