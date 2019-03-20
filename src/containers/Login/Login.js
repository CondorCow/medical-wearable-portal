import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'
import axios from '../../axios';

import './Login.css'

import FormErrors from '../../utils/FormErrors';

class Login extends Component {
    state = {
        email: '',
        password: '',
        // formErrors: { email: '', password: '' },
        // emailValid: false,
        // passwordValid: false,
        // formValid: true
        error: ''
    };

    componentDidMount() {
        if (this.props.shouldLogout) {
            this.props.onLogout();
        } else if (this.props.isAuth) {
            this.props.history.push({ pathname: '/clients' })
        }
    }

    // validateField(fieldName, value) {
    //     let fieldValidationErrors = this.state.formErrors;
    //     let emailValid = this.state.emailValid;
    //     let passwordValid = this.state.passwordValid;

    //     switch (fieldName) {
    //         case 'email':
    //             emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    //             fieldValidationErrors.email = emailValid ? '' : ' is ongeldig';
    //             break;
    //         case 'password':
    //             passwordValid = value.length > 0;
    //             // fieldValidationErrors.password = passwordValid ? '' : ' is leeg';
    //             break;
    //         default:
    //             break;
    //     }
    //     this.setState({
    //         formErrors: fieldValidationErrors,
    //         emailValid: emailValid,
    //         passwordValid: passwordValid
    //     }, this.validateForm);
    // }

    // validateForm() {
    //     this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    // }

    handleSubmit = event => {
        this.login();
        event.preventDefault();
    }

    login = () => {
        axios.post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            if (response.status === 200) {
                console.log(response)
                this.props.onLogin(response.data.token)
                this.props.history.push({ pathname: '/clients' })
            }
        }).catch(err => {
            if(err.response.status == 401) {
                this.setState({error: "Onjuiste gegevens ingevoerd"})
            }
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;

        this.setState(
            { [name]: target.value },
            // () => { this.validateField(name, target.value) }
        );
    }

    render() {
        return (
            <div className="Login">
                <div className="Error">
                    <label>
                        {this.state.error}
                    </label>
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Email
                    <input className="Input" name="email" type="text" onChange={this.handleInputChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        Wachtwoord
                    <input className="Input" name="password" type="password" onChange={this.handleInputChange.bind(this)} />
                    </label>
                    <input className="Submit" type="submit" value="Login" />
                </form>
            </div >);
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (token) => dispatch({ type: actionTypes.ON_LOGIN, value: token }),
        onLogout: () => dispatch({ type: actionTypes.ON_LOGOUT })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);