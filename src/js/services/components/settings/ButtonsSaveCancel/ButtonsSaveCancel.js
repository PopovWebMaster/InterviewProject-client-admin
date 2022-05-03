//import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './ButtonsSaveCancel.scss';


class ButtonsSaveCancel extends Component {
    constructor(props){
        super(props);
        this.save = this.save.bind(this)
        this.cancel = this.cancel.bind(this)
    }
    save(){
        if( this.props.isChenged ){
            this.props.sendToServer();
        };
    }
    cancel(){
        if( this.props.isChenged ){
            this.props.cancel();
        };
    }
    render(){
        return (
            <div className = 'editButSaveCancel_set'>
                <div 
                    className =  { this.props.isChenged? '': 'noactive' }
                    onClick = { this.save }
                >
                    <span>Сохранить изменения</span>
                </div>
                <div 
                    className = { this.props.isChenged? '': 'noactive' }
                    onClick = { this.cancel }
                >
                    <span>Отмена</span>
                </div>

                
            </div>
            
        )
    }
};


export default ButtonsSaveCancel;

