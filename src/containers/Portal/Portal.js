import React, { Component } from 'react';
import './Portal.css';

import {Link, Route} from 'react-router-dom';

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
                <Route path="/" exact component={Clients} />
                <Route path="/meting-types" exact render={() => <h1>Meting types</h1>} />
            </div>
        );
    };
}

export default Portal;