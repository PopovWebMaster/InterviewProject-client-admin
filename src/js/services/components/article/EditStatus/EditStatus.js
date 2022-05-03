import $ from "jquery";

import React from 'react';
import { Component } from 'react';
import './EditStatus.scss';

//import { GLOBAL } from './../../../../CONSTANTS.js';

class EditStatus extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: this.props.status
        };

        this.setStatus = this.setStatus.bind(this);
    }

    setStatus( newStatus ){
        if( newStatus === this.state.status ){
            return;
        };
        this.setState({
            status: newStatus
        });
        this.props.setStatus(newStatus);
    } 

    componentDidUpdate( prevProps, prevState ) { 
        if( this.props.isChenged !== prevProps.isChenged && !this.props.isChenged ){ // нажата отмена 
            this.setState({
                status: this.props.status
            });
        };
    }

    render(){
        return (
            <div className = 'editStatus_art item_art'>

                <div className = 'nameItem_art'>
                    <span>Статус:</span>
                </div>

                <div className = 'editItem_art'>
                    <div>
                        <input  type ='radio' 
                                name="show" 
                                value="show" 
                                checked = { this.state.status? true: false }
                                onChange = {
                                    () => {
                                        this.setStatus( true );
                                    }
                                }
                        />Опубликован<br/>
                        <input  type ='radio' 
                                name="hide" 
                                value="hide" 
                                checked = { this.state.status? false: true }
                                onChange = {
                                    () => {
                                        this.setStatus( false );
                                    }
                                }
                        />Не опубликован
                    </div>
                </div>
            </div>
        )
    }
};


export default EditStatus;