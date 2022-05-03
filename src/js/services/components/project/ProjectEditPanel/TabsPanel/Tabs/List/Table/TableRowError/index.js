import React from 'react';
import { Component } from 'react';
import './index.scss';

import TableRowMain from './../TableRowMain.js';


export default class TableRowError extends TableRowMain {
    constructor(props){
        super(props);

        this.state = {
            enW: this.props.enW,
            ruW: this.props.ruW,
        };

        /*
            this.props.enW
            this.props.ruW
            this.props.index
            this.props.error_massage
        */


    }

    render(){

        return (<>
            <tr className = 'trError'>
                <td 
                    rowSpan = '2' 
                    className = "num"
                >
                    { this.props.index + 1 }
                </td>

                <td 
                    colSpan = '2'
                    className = 'listWords'
                >
                    <input  
                        type =      'text' 
                        value =     { this.state.enW } 
                        onChange =  { this.setValueEnW }
                    />
                    <input  
                        type =      'text' 
                        value =     { this.state.ruW } 
                        onChange =  { this.setValueRuW }
                    />
                </td>

                <td></td>

                <td></td>

                <td     
                    className = 'deletItem'
                    onClick = { this.deleteOneWord }
                >
                    <span>Удалить</span>
                </td>
                
            </tr>
            <tr className = 'trError'>
                <td className = 'errorMassage'
                    colSpan = '5'
                >
                    Ошибка! { this.props.error_massage }
                </td>
            </tr>

        </>)
    }
};



