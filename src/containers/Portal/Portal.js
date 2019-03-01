import React, { Component } from 'react';
import './Portal.css';

import { Link, Route, Switch } from 'react-router-dom';

import Clients from '../Clients/Clients';

class Portal extends Component {
    render() {
        return (
            <div className="Portal">
                <header>
                    <nav>
                        <ul>
                            <li><Link to='/'>Cliënten</Link></li>
                            <li><Link to='/meting-types'>Meting types</Link></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/" exact component={Clients} />
                    <Route path="/meting-types" render={() => <h1>Meting types</h1>} />
                </Switch>
            </div>
        );
    };
}

export default Portal;