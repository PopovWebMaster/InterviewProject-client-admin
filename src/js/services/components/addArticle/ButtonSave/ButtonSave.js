//import $ from "jquery";

import React from 'react';
import { Component } from 'react';
import './ButtonSave.scss';

//import { GLOBAL } from '../../../../CONSTANTS.js';

class ButtonSave extends Component {
    constructor(props){
        super(props);
        this.state = {
            isChenged: this.props.isChenged
        };
        this.save = this.save.bind(this);
    }
    
    save(){
        if( this.state.isChenged ){
            this.props.sendToServer();
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
            <div className = 'editButSave_art'>
                <div    className =  { this.state.isChenged? 'save_art': 'save_art noactive' }
                        onClick = { this.save }
                >
                    <span>Сохранить</span>
                </div>
            </div>
        )
    }
};


export default ButtonSave;




