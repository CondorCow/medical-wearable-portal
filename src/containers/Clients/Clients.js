import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Clients.css'

import Client from '../../components/Client/Client';
import MeasurementHistory from '../MeasurementHistory/MeasurementHistory';
import * as actionTypes from '../../store/actions';
import axios from '../../axios';

class Clients extends Component {
    state = {
        error: false
    }

    componentDidMount() {
        if (this.props.clients.length !== null) {
            this.loadClients();
        }
        console.log(this.props);
    }

    loadClients() {
        axios.get('/client/all')
            .then(response => {
                console.log(response);
                this.props.onInitClients(response.data.clients);
            })
            .catch(err => {
                console.log(err);
            });
    }

    loadMeasurementsFromClient(clientNumber) {
        axios.get(`/client/${clientNumber}/measurements`)
            .then(response => {
                this.props.onClientSelected(clientNumber, response.data.measurements)
            }).catch(err => {
                console.log(err);
                this.props.onClientSelected(clientNumber, null)
            });
    }

    render() {
        let loadedClients = <p style={{ textAlign: 'center' }}>Er kunnen geen cliënten worden geladen</p>;
        if (!this.state.error) {
            loadedClients = this.props.clients.map(client => {
                return (
                    <Client
                        key={client._id}
                        name={client.name}
                        lastName={client.lastName}
                        clicked={() => this.loadMeasurementsFromClient(client.clientNumber)}
                        selected={this.props.selectedClient === client.clientNumber ? true : false}
                    />
                );
            });
        }

        return (
            <div className="Clients">
                <div className="ClientsTitle">
                    Cliënten
                    <div className="ClientsList">{loadedClients}</div>
                </div>
                {
                    // console.log('[render] ' + this.props.selectedClient)
                    (this.props.selectedClient !== 0) ?
                        <div className="MeasurementHistory">
                            Meting historie
                            <MeasurementHistory />
                        </div> : null
                }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        clients: state.client.clients,
        selectedClient: state.client.selectedClient,
        measurementHistory: state.client.history
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitClients: (clients) => dispatch({ type: actionTypes.INIT_CLIENTS, value: clients }),
        onClientSelected: (id, measurements) => dispatch({ type: actionTypes.ON_CLIENT_SELECT, payload: {id: id, measurements} })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clients);