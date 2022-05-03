import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';

import { GLOBAL } from './../../../CONSTANTS.js';

import { separates_one_string_enW_from_ruW_and_enW_from_num } from './../functions/separates_one_string_enW_from_ruW_and_enW_from_num.js';

class FormResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            arr: addChecked(this.props.arr)
        };
        this.create = this.create.bind(this);
        this.setResultVal = this.setResultVal.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.processedArr = this.processedArr.bind(this);
        this.eventsOn = this.eventsOn.bind(this);
        this.eventsOff = this.eventsOff.bind(this);
        this.setChecked = this.setChecked.bind(this);

        //this.addChecked = this.addChecked.bind(this);
 
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if ( nextProps.arr !== prevState.arr) {
            return {
               arr: addChecked(nextProps.arr)
            }
        };
        return null;
    }

    setResultVal( e, index  ){
        let arr = this.state.arr;
        let name = e.target.name;
        if( name === 'enW' ){
            arr[index].result.enW = e.target.value;
        }else if( name === 'ruW' ){
            arr[index].result.ruW = e.target.value;
        }else if( name === 'err' ){
            arr[index].result = e.target.value;
        };
        this.props.setArrResult( arr );
    }

    setChecked( e, index ){
        let newarr = this.state.arr;
        newarr[index].checked = !newarr[index].checked;
        this.setState({
            arr: newarr
        });
    }

    processedArr(){
        let oldArr = this.state.arr;
        let newArr = [];
        for( let i = 0; i < oldArr.length; i++ ){
            let str = '';
            if( oldArr[i].ok ){
                str = oldArr[i].result.enW+' '+oldArr[i].result.ruW;
            }else{
                str = oldArr[i].result;
            };
            let obj = separates_one_string_enW_from_ruW_and_enW_from_num( str );
            obj.checked =  oldArr[i].checked;
            newArr.push( obj );
        };
        this.props.setArrResult( newArr );
    }

    create( arr ){
        if( arr.length === 0 ){
            return '';
        };
        let input = arr.map( ( item, index ) => {
            if( item.ok ){
                return(
                    <div key = {index} data = {index} className= { this.state.arr[index].checked? "susccessDiv": "susccessDiv noActInp"} >
                        <input  
                            type="checkbox" 
                            name = { index }
                            checked = { item.checked !== undefined? item.checked: true }
                            onChange = { (e) => {
                                this.setChecked( e, index );
                            }}/>
                        <input 
                            type='text' 
                            autoComplete="off"
                            value = { this.state.arr[index].result.enW? this.state.arr[index].result.enW: '' }
                            name = {'enW'}
                            onChange = { (e) => {
                                this.setResultVal( e, index )
                            }}
                        />
                        <input 
                            type='text' 
                            autoComplete="off"
                            value = { this.state.arr[index].result.ruW? this.state.arr[index].result.ruW: '' }
                            name = {'ruW'}
                            onChange = { (e) => {
                                this.setResultVal( e, index )
                            }}
                        />
                    </div>
                );
            }else{
                return(
                    <div key = {index} data = {index} className="errorDiv">
                        <input  
                            type="checkbox" 
                            name = {index}
                            checked = { item.checked !== undefined? item.checked: true }
                            onChange = { (e) => {
                                this.setChecked( e, index );
                            }}/>
                        <input 
                            className = 'errorInput'
                            type='text' 
                            autoComplete="off"
                            value = { this.state.arr[index].result? this.state.arr[index].result: '' }
                            name = { 'err' }
                            onChange = { (e) => {
                                this.setResultVal( e, index )
                            }}
                        /><br/>
                        <label>Ошибка: { item.error_massage }</label>
                    </div>
                );
            };
        });
        return input;
    }

    keyDown( e ){
        if( e.which === 13){	    // Enter
            this.processedArr();
        };
    }

    eventsOn(){
        this.eventsOff();
        let input = $('form.resultForm div input');
        for( let i = 0; i < input.length; i++){
            $( input ).eq(i).on('focusout', () => {
                this.processedArr();
            });
        };
        $(document).on("keydown", this.keyDown );
    }
    eventsOff(){

        let input = $('form.resultForm div input');
        for( let i = 0; i < input.length; i++){
            $( input ).eq(i).off('focusout');
        };
        $(document).off("keydown");
    }

    
    componentDidUpdate(){
        this.eventsOn();
    }

    componentWillUnmount(){
        this.eventsOff();
    }
    
    render(){
        return (
            <form className="resultForm">
                { this.create( this.state.arr )}
            </form>
        )
    }
};


export default FormResult;


function addChecked( arr ){

    let newarr = [];
    for( let i = 0; i < arr.length; i++){
        let obj = arr[i];
        if( obj.checked === undefined ){
            obj.checked = arr[i].ok; 
        }else{
            if( arr[i].ok === false ){
                obj.checked = false;
            };
        };
        newarr.push(obj);
    };
    return newarr;
}

