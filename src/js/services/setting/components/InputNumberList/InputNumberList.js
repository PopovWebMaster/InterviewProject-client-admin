import React from 'react';
// //import ReactDOM from 'react-dom';
// import { Component } from 'react';

import './InputNumberList.scss';

import MainInputComponent from './../MainInputComponent.js';

export default class InputNumberList extends MainInputComponent{
    constructor(props){
        super(props);

        this.state = {
            value: this.props.value,
        };

        this.createSelect = this.createSelect.bind(this);
        this.setSelect = this.setSelect.bind(this);

    }

    createSelect( value ){
        let interval = this.props.interval;
        let arr = [];
        for( let i = 0; i < interval[1]+1; i++ ){
            if( i >= interval[0] && i <= interval[1] ){
                arr.push(i);
            };
        };

        let option = arr.map( ( item, index ) => {
            return (
                <option   
                    key =   { index } 
                    value = { item }
                >{ item }</option>
            );
        });

        return (
            <select
                name =  { `${this.props.name}[]` } 
                value = { value }
                onChange = { this.setSelect }
            >
                { option }
            </select>
        );
    }

    setSelect( e ){
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
   
    
    render(){
        return this.createInput( this.createSelect( this.state.value ) );
    }

};