//import $ from "jquery";

import React from 'react';
import { Component } from 'react';
import './ButtonsSaveCancel.scss';

//import { GLOBAL } from './../../../../CONSTANTS.js';

class ButtonsSaveCancel extends Component {
    constructor(props){
        super(props);
        this.state = {
            isChenged: this.props.isChenged
        };
        this.save = this.save.bind(this);
        this.cansel = this.cansel.bind(this);
    }
    
    save(){
        if( this.state.isChenged ){
            this.props.sendToServer();
        };
    }

    cansel(){
        if( this.state.isChenged ){
            this.props.canselIsChenged();
        };
    }

    componentDidUpdate( prevProps ) {
        if ( this.props.isChenged !== prevProps.isChenged) {
            this.setState({
                isChenged: this.props.isChenged
            });
        }
    }

    render(){
        return (
            <div className = 'editButSaveCancel_art'>
                <div    className =  { this.state.isChenged? 'save_art': 'save_art noactive' }
                        onClick = { this.save }
                >
                    <span>Сохранить изменения</span>
                </div>
                <div 
                    className = { this.state.isChenged? 'cancel_art': 'cancel_art noactive' }
                    onClick = { this.cansel }
                >
                    <span>Отмена</span>
                </div>
            </div>
        )
    }
};


export default ButtonsSaveCancel;




