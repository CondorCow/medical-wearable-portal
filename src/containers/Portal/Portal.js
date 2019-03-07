import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Portal.css';

import { Link, Route, Switch } from 'react-router-dom';

import Clients from '../Clients/Clients';
import MeasurementTypeOverview from '../MeasurementOverview/MeasurementTypeOverview';
import Login from '../Login/Login'
import { store } from '../../index';

class Portal extends Component {
    render() {
        return (
            <div className="Portal">
                <header>
                    <nav>
                        <ul>
                            <li><Link to='/clients'>Cliënten</Link></li>
                            <li><Link to='/meting-types'>Meting types</Link></li>
                            {
                                !store.getState().auth.isAuth ?
                                    (<li style={{ float: 'right' }}><Link to='/login'>Login</Link></li>) :
                                    (<li style={{ float: 'right' }}><Link to='/logout'>Logout</Link></li>)
                            }
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/clients" exact component={store.getState().auth.isAuth ? Clients : Login} />
                    <Route path="/meting-types" component={store.getState().auth.isAuth ? MeasurementTypeOverview : Login} />
                    <Route path="/" exact component={Login} />
                    <Route path="/login" exact component={Login} />
                </Switch>
            </div>
        );
    };
}

export default Portal;