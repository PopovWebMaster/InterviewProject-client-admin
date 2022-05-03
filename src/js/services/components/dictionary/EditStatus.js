import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './EditStatus.scss';

import { GLOBAL } from './../../../CONSTANTS.js';


class EditStatus extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className = 'editStatus_dic'>

                <div className = 'nameItem_dic'>
                    <span>Статус:</span>
                </div>

                <div className = 'editItem_dic'>
                    <div>
                        <input  type ='radio' 
                                name="show" 
                                value="show" 
                                checked={ this.props.status? true: false }
                                onChange = {
                                    () => {
                                        this.props.setStatus( true );
                                    }
                                }
                        />Опубликован<br/>
                        <input  type ='radio' 
                                name="hide" 
                                value="hide" 
                                checked={ this.props.status? false: true }
                                onChange = {
                                    () => {
                                        this.props.setStatus( false );
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




