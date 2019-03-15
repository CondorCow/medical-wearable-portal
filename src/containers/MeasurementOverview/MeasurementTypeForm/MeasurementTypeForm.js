import React, { Component } from 'react';
import {connect} from 'react-redux';
import './MeasurementTypeForm.css';

import plusIcon from '../../../assets/plus.png';
import axios from '../../../axios';
import FormErrors from '../../../utils/FormErrors';

class MeasurementTypeForm extends Component {
    state = {
        identification: '',
        name: '',
        subValues: [],
        formErrors: { identification: '', name: '', subValues: '' },
        identificationValid: false,
        nameValid: false,
        subValuesValid: false,
        formValid: false
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;

        if (name === "subvalue") {
            let values = [...this.state.subValues];
            values[target.id] = target.value;
            this.setState({
                subValues: values
            });
        } else {
            this.setState(
                {[name]: target.value},
                () => { this.validateField(name, target.value) }
            );
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let identificationValid = this.state.identificationValid;
        let nameValid = this.state.nameValid;

        const mTypes = [...this.props.mTypes];
        let existingIds = mTypes.map(t => {
            return t.identifier;
        });
        let existingNames = mTypes.map(t => {
            return t.name;
        });
      
        switch(fieldName) {
          case 'identification':
            identificationValid = !existingIds.includes(value);
            fieldValidationErrors.identification = identificationValid ? '' : ' bestaat al';
            break;
          case 'name':
            if (value.length < 6) {
                fieldValidationErrors.name = ' is too short';
                nameValid = false
            } 
            if (value.length > 6){
                fieldValidationErrors.name = ''
                nameValid = true
            }
            if (existingNames.includes(value)) {
                fieldValidationErrors.name = ' bestaat al';
                nameValid = false
            }
            break;
          default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            identificationValid: identificationValid,
            nameValid: nameValid},
            this.validateForm);
      }
      
      validateForm() {
        this.setState({formValid: this.state.identificationValid && this.state.nameValid});
        console.log(this.state)
      }

    handleSubmit = event => {
        const sections = [...this.state.subValues];
        let postSections = sections.filter(s => {
            if (s.length > 0 && s.trim() && s){
                return true
            } 
        }).map(s => { return {name: s}})
        let postData = {
            identifier: this.state.identification.toLowerCase(),
            name: this.state.name,
            sections: postSections
        }

        axios.post('/admin/measurementTypes', postData).then(respose => {
            console.log(respose);
        });

        event.preventDefault();
    }

    onAddSubValueHandler = () => {
        let newValues = [...this.state.subValues];
        newValues.push('');
        this.setState({ subValues: newValues })
    }

    render() {

        let subValueFields = this.state.subValues.map((value, index) => {
            return (
                <input
                    className="Input"
                    name="subvalue"
                    id={index}
                    type="text"
                    value={value}
                    onChange={(event) => this.handleInputChange(event)} />
            );
        })

        return (
            <div className="Container">
                <div className="Errors">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
            <form onSubmit={this.handleSubmit}>
                <label className="Label">Identificatie
                        <input className="Input" name="identification" type="text" onChange={this.handleInputChange.bind(this)} />
                </label>
                <br />
                <label className="Label">
                    Naam
                        <input className="Input" name="name" type="text" onChange={this.handleInputChange.bind(this)} />
                </label>
                <br />
                <label className="Label">
                    Subwaarde
                        {/* <input className="Input" name="name" id="name" type="text" onChange={this.handleInputChange.bind(this)} /> */}
                    {subValueFields}
                </label>
                <div className="Icon">
                    <img src={plusIcon} onClick={() => this.onAddSubValueHandler()} />
                </div>
                <br />
                <input className="Submit" type="submit" value="Toevoegen" disabled={!this.state.formValid}/>
            </form>
            </div >);
    }
};

const mapStateToProps = state => {
    return {
        mTypes: state.measurement.mTypes
    }
}

export default connect(mapStateToProps)(MeasurementTypeForm);