import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

import * as actionTypes from '../../store/actions';
import './MeasurementTypeOverview.css';
import MeasurementType from '../../components/MeasurementType/MeasurementType';
import MeasurementTypeForm from './MeasurementTypeForm/MeasurementTypeForm';
// import StandardList from '../../components/StandardList/StandardList'

class MeasurementTypeOverview extends Component {
    state = {
        error: false
    }

    componentDidMount() {
        if (this.props.mTypes.length === 0 || !this.props.mTypes) {
            this.loadMeasurementTypes();
        }
    }

    loadMeasurementTypes = () => {
        axios.get('/admin/measurementTypes')
            .then(response => {
                console.log(response);
                this.props.onInitMeasurementTypes(response.data.measurementTypes);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let loadedMeasurementTypes = <p style={{ textAlign: 'center' }}>Er kunnen geen meting types worden geladen</p>;
        if (!this.state.error) {
            loadedMeasurementTypes = this.props.mTypes.map(type => {
                console.log(type)
                return (
                    <MeasurementType
                        key={type._id}
                        title={type.name}
                    />
                );
            });
        }

        return (
            <div className="MeasurementTypeOverview">
                <div className="Title">
                    Meting type beheer
                    <div className="List">{loadedMeasurementTypes}</div>
                </div>
                <div className="Form">
                    Nieuw meting type toevoegen
                    <MeasurementTypeForm />
                </div>
            </div>
                // <StandardList title="MeasurementTypes" loaded={loadedMeasurementTypes}/>
            );
    }
}

const mapStateToProps = state => {
    return {
        mTypes: state.measurement.mTypes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitMeasurementTypes: (mTypes) => dispatch({ type: actionTypes.INIT_MEASUREMENTTYPES, payload: mTypes })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementTypeOverview);