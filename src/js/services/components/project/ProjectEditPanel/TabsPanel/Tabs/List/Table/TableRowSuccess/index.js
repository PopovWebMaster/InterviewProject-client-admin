import React from 'react';
import { Component } from 'react';
import './index.scss';

import TableRowMain from './../TableRowMain.js';


export default class TableRowSuccess extends TableRowMain {
    constructor(props){
        super(props);

        this.state = {
            enW: this.props.enW,
            ruW: this.props.ruW,
        };

        /*
            this.props.index
            this.props.enW
            this.props.ruW
            this.props.isAudio
            this.props.isRepeat
        */


        this.getCellAudio = this.getCellAudio.bind(this);
        this.getCellRepeat = this.getCellRepeat.bind(this);

    }



    getCellAudio(){
        let isAudio = this.props.isAudio;

        let cell;
        if( isAudio.exists ){
            cell = ( <span className = "icon-ok-1"></span> );
        }else{
            cell = ( <span>Нет</span> );
        };

        return cell;

    }

    getCellRepeat(){

        let isRepeat = this.props.isRepeat;
        let cell;
        if( isRepeat.exists ){
            cell = (
                <>
                    <span className = "badFirst">Есть</span>
                    <span className = "badLast">
                        { isRepeat.project }
                    </span>
                </>
            );
        }else{
            cell = (<span>Нет</span>);
        };

        return cell;
        
    }



    render(){

        return (
            <tr 
                className = "trSuccess"
            >
                <td className = "num">
                    { this.props.index + 1 }
                </td>

                <td 
                    colSpan="2" 
                    className = "listWords"
                >
                    <input  
                        type = 'text' 
                        value = { this.state.enW } 
                        onChange = { ( e ) => {
                            this.setValueEnW( e );
                        }}
                    />

                    <input  
                        type = 'text' 
                        value = { this.state.ruW }
                        onChange = { ( e ) => {
                            this.setValueRuW( e );
                        }}
                    />
                </td>

                <td className = "isAudio">
                    { this.getCellAudio() }
                </td>
                
                <td className = "isRepeat">
                    { this.getCellRepeat() }
                </td>

                <td     
                    className = "deletItem"
                    onClick = { this.deleteOneWord }
                >
                    <span>Удалить</span>
                </td>
            </tr>  

        )
    }
};



