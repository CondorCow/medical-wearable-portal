import React, { Component } from 'react';
import './Clients.css'

import Client from '../../components/Client/Client';

class Clients extends Component {
    state = {
        clients: [
            {
                id: 1231,
                name: 'Danny Janssen'
            },
            {
                id: 4312,
                name: 'Luc Daalmeijer'
            }
        ],
        error: false
    }
    render() {
        let loadedClients = <p style={{ textAlign: 'center' }}>Er kunnen geen cliënten worden geladen</p>;
        if (!this.state.error) {
            loadedClients = this.state.clients.map(client => {
                return (
                    <Client
                        key={client.id}
                        name={client.name}
                    />
                );
            });
        }
        return (
            <div>{loadedClients}</div>
        );
    }
};

// const mapStateToProps = state => {
//     return {
//         client: state.client.clients
//     }
// };

export default Clients;