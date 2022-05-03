import React from 'react';
// //import ReactDOM from 'react-dom';
import { Component } from 'react';

import { CLASS_NAME } from './../config.js';

export default class MainInputComponent extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.createInput = this.createInput.bind(this);
    }

    createInput( Component ){
        return (
            <div className = { CLASS_NAME.INPUT_GROUP }>

                <div className = { CLASS_NAME.DESCRIPTION }>
                    <label htmlFor = { this.props.name } >{ this.props.description }</label>
                </div>

                <div className = { CLASS_NAME.INPUT }>
                    { Component }
                    <hr/>
                </div>
 
            </div>
        );
    }

    componentDidUpdate( prevProps, prevState, snapshot ){

        if( prevProps.value !== this.props.value ){
            this.setState({
                value: this.props.value
            });
        };

    }

};