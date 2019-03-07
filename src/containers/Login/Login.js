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
        formErrors: { email: '', password: '' },
        emailValid: false,
        passwordValid: false,
        formValid: false
    };

    componentDidMount() {
        // this.props.history.push({pathname: '/clients'})
        if (this.props.isAuth) {
            this.props.history.push({ pathname: '/clients' })
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is ongeldig';
                break;
            case 'password':
                passwordValid = value.length > 0;
                // fieldValidationErrors.password = passwordValid ? '' : ' is leeg';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

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
            console.log(err);
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;

        this.setState(
            { [name]: target.value },
            () => { this.validateField(name, target.value) }
        );
    }

    render() {
        return (
            <div className="Container">
                <div className="Errors">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label className="Label">
                        Email
                    <input className="Input" name="email" type="text" onChange={this.handleInputChange.bind(this)} />
                    </label>
                    <br />
                    <label className="Label">
                        Wachtwoord
                    <input className="Input" name="password" type="text" onChange={this.handleInputChange.bind(this)} />
                    </label>
                    <input className="Submit" type="submit" value="Login" disabled={!this.state.formValid} />
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
        onLogin: (token) => dispatch({ type: actionTypes.ON_LOGIN, value: token })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);