// ButtonPanel

import React from 'react';
// //import ReactDOM from 'react-dom';
import { Component } from 'react';

import './ButtonPanel.scss';

import { CLASS_NAME } from './../../config.js';


export default class ButtonPanel extends Component{
    constructor(props){
        super(props);

        this.state = {};

        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);

        

    }

    save(){
        if( this.props.isChenged ){
            this.props.button_save_handler();
        };
    }

    cancel(){
        if( this.props.isChenged ){
            this.props.button_cancel_handler();
        };
        
    }

    render(){
        return (

            <div className = { CLASS_NAME.BUTTON_PANEL }>

                <div 
                    className =     { this.props.isChenged? '': CLASS_NAME.BUTTON_NOACTIVE }
                    onClick =       { this.save }
                >
                    <span>Сохранить изменения</span>
                </div>

                <div 
                    className =     { this.props.isChenged? '': CLASS_NAME.BUTTON_NOACTIVE }
                    onClick =       { this.cancel }
                >
                    <span>Отмена</span>
                </div>

            </div>


        );
		
    }

};
