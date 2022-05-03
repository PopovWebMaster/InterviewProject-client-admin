import React from 'react';
// //import ReactDOM from 'react-dom';
// import { Component } from 'react';

import './InputSwitch.scss';

// import { CLASS_NAME } from './../../config.js';

import MainInputComponent from './../MainInputComponent.js';


export default class InputSwitch extends MainInputComponent{
    constructor(props){
        super(props);

        this.state = {
            value: convert_boolean_str_to_boolean_type( this.props.value ),
        };

        this.setValue = this.setValue.bind(this);

    }

    setValue( e ){
        let value = e.target.checked;

        this.setState({
            value: convert_boolean_str_to_boolean_type( value )
        });

        this.props.setIsChenged();

        this.props.setValue({
            key: this.props.name,
            value: `${value}`,
        });
    }

    

    componentDidUpdate( prevProps, prevState, snapshot ){

        let prevValue = convert_boolean_str_to_boolean_type( prevProps.value );
        let currentValue = convert_boolean_str_to_boolean_type( this.props.value );

        if(  prevValue !== currentValue ){
            this.setState({
                value: currentValue,
            });

        }
    }

    render(){
		return this.createInput(
            <input 
                name =              { this.props.name }
                type =              'checkbox' 
                maxLength =         '250'
                value =             { 'switch' } 
                checked =           { this.state.value }
                onChange =          { this.setValue }
            /> 
        );
    }

};






function convert_boolean_str_to_boolean_type( variable ){

    let result = undefined;

    if( typeof variable === 'boolean' ){
        result = variable;
    }else{

        if( typeof variable === 'string' ){
            if( variable === 'true' ){
                result = true;
            }else if( variable === 'false' ){
                result = false;
            };
        };
    };

    return result;

};