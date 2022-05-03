import React from 'react';
// //import ReactDOM from 'react-dom';
// import { Component } from 'react';

import './InputText.scss';

import MainInputComponent from './../MainInputComponent.js';

import { controller as InputTextController } from './controller.js';


export default class InputText extends MainInputComponent{
    constructor(props){
        super(props);

        this.state = {
            value: this.props.value,
        };

        this.setValue =     this.setValue.bind(this);
        this.blure =        this.blure.bind(this);
        this.focus =        this.focus.bind(this);
        this.keyDown =      this.keyDown.bind(this);

    }

    setValue( e ){
        let value = e.target.value;
        this.setState({
            value,
        });

        this.props.setIsChenged();

        this.props.setValue({
            key: this.props.name,
            value,
        });

    }

    blure( e ){
        let input_elem = e.target;
        InputTextController.setInput_blure_style( input_elem );
    }

    focus( e ){
        let input_elem = e.target;
        InputTextController.setInput_focus_style( input_elem ); 
    }

    keyDown( e ){
        if( e.which === 13 ){ // Enter
            let input_elem = e.target;
            InputTextController.setInput_blure_style( input_elem );
            input_elem.blur();
        };
    }


    
    render(){
        return this.createInput(
            <input 
                name =      { this.props.name }
                type =      'text' 
                maxLength = '250'
                value =     { this.state.value } 
                onChange =  { this.setValue }
                onBlur =    { (e) => { this.blure(e); } }
                onFocus =   { (e) => { this.focus(e); } }
                onKeyDown = { this.keyDown }
            /> 
        );
		
    }

};
