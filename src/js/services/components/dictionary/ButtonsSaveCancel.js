import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './ButtonsSaveCancel.scss';

import { GLOBAL } from './../../../CONSTANTS.js';


class ButtonsSaveCancel extends Component {
    constructor(props){
        super(props);

        this.save = this.save.bind(this)
        
    }

    save(){
        if( this.props.isChenged ){
            this.props.sendToServer();
        };
    }

    render(){
        return (
            <div className = 'editButSaveCancel_dic'>
                <div    className =  { this.props.isChenged? 'save_dic': 'save_dic noactive' }
                        onClick = { this.save }
                >
                    <span>Сохранить изменения</span>
                </div>
                <div className = { this.props.isChenged? 'cancel_dic': 'cancel_dic noactive' }>
                    <span>Отмена</span>
                </div>

                
            </div>
            
        )
    }
};


export default ButtonsSaveCancel;




