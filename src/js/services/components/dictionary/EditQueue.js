import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './EditQueue.scss';

import { GLOBAL } from './../../../CONSTANTS.js';



class EditQueue extends Component {
    constructor(props){
        super(props);

        this.empty_value = 'нет';

        this.state = {
            status: this.props.status,
            selectValue: this.props.status? this.props.oldQueue: this.empty_value,
            checkedInsert: true
        };

        

        this.createSelect = this.createSelect.bind(this);
        this.setInsert = this.setInsert.bind(this);
        this.setReplace = this.setReplace.bind(this);
        this.setSelect = this.setSelect.bind(this);
        this.serNewParams = this.serNewParams.bind(this);
        this.setDisabled = this.setDisabled.bind(this);


        
    }

    createSelect( arr, status ){
        if( !status ){
            return (
                <select defaultValue='-НЕТ-'>
                    <option     value = { this.empty_value }
                                disabled = { this.setDisabled( this.state.status, this.state.selectValue ) }
                    >---</option>
                </select>
            );
        };
        let listQueue = arr;
        listQueue.sort( ( a, b ) =>  a - b );

        let option = listQueue.map( ( item, index ) => {
            return (
                <option     key = {index} 
                            value = { item }
                >{ item }</option>
            );
        });
        return (
            <select
                    value={this.state.selectValue}
                    onChange={ this.setSelect }
            >
                <option     value = { this.empty_value }
                            disabled = { this.setDisabled( this.state.status, this.state.selectValue ) }
                >(последний)</option>
                { this.props.oldStatus? option: ''}
            </select>
        );
    }
    setSelect( e ){
        let val = e.target.value;
        if( val === this.empty_value ){
            this.setState({
                selectValue: this.empty_value
            });
        }else{
            this.setState({
                selectValue: Number( val )
            });
        };
        this.serNewParams( val, this.state.checkedInsert );
    }

    setInsert(){
        this.setState({
            checkedInsert: true
        });
        this.serNewParams( this.state.selectValue, true );
    }
    setReplace(){
        this.setState({
            checkedInsert: false
        });
        this.serNewParams( this.state.selectValue, false );
    }
    serNewParams( newQueue, checkedInsert ){

        
            if( newQueue === this.empty_value ){
                this.props.setQueue( null, false ); //// Здесь ошибка !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }else{
                if( checkedInsert ){
                    this.props.setQueue( Number( newQueue ), 'insert' );
                }else{
                    this.props.setQueue( Number( newQueue ), 'replace' );
                };
            };
       
    }
    setDisabled( status, val ){

        if( status ){
            if(  val === this.empty_value  ){
                return true;
            }else{
                return false;
            };
        }else{
            return true;
        };

    }

    componentDidUpdate( prevProps, prevState ) {
        if( prevProps.status !== this.props.status ){
            this.setState({
                status: this.props.status
            });
        };
    }

    render(){
        return (
            <div className = 'editQueue_dic'>

                <div className = 'nameItem_dic'>
                    <span>Порядковый номер <span className = 'editQueue_num_dic'>({ this.props.oldQueue !== null? this.props.oldQueue: '_' })</span>:</span>
                </div>

                <div className = 'editItem_dic'>
                    <div>{ this.createSelect( this.props.arrListQueue, this.state.status ) }</div>

                    <div>
                        <input  type ='radio' 
                                name="drink" 
                                value="rad1"
                                disabled = { this.setDisabled( this.state.status, this.state.selectValue ) /* this.props.status? false: true*/} 
                                checked = { this.state.checkedInsert? true: false }
                                onChange = { this.setInsert }
                        />Вставить со смещением<br/>
                        <input  type ='radio' 
                                name="drink" 
                                value="rad2" 
                                disabled = { this.setDisabled( this.state.status, this.state.selectValue )/*this.props.status? false: true */} 
                                checked = { this.state.checkedInsert? false: true }
                                onChange = { this.setReplace }
                        />Поменять местами
                    </div>

                </div>

            </div>
            
        )
    }
};


export default EditQueue;




