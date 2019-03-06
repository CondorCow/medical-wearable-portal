import React, { Component } from 'react';
import './MeasurementTypeForm.css';

import plusIcon from '../../../assets/plus.png';
import axios from '../../../axios';

class MeasurementTypeForm extends Component {
    state = {
        identification: '',
        name: '',
        subValues: []
    }

    handleInputChange = event => {
        console.log(event.target)
        const target = event.target;
        const name = target.name;

        if(name === "subvalue"){
            let values = [...this.state.subValues];
            values[target.id] = target.value;
            this.setState({
                subValues: values
            })
            console.log(values);
        } else {
            this.setState({
                [name]: target.value
            });
        }
    }

    handleSubmit = event => {
        const sections = [...this.state.subValues];
        let postSections = sections.map(s => {
            return { name: s}
        })
        let postData = {
            identifier: this.state.identification,
            name: this.state.name,
            sections: postSections
        } 

        axios.post('/admin/measurementTypes', postData).then(respose => {
            console.log(respose);
        })
        event.preventDefault();
    }

    onAddSubValueHandler = () => {
        let newValues = [...this.state.subValues];
        newValues.push('');
        this.setState({ subValues: newValues})
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
                    <input className="Submit" type="submit" value="Toevoegen" />
                </form>
            </div>);
    }
};

export default MeasurementTypeForm;