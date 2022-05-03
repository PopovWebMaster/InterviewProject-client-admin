import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './TableResultAnalysis.scss';
//import { GLOBAL } from '../../../CONSTANTS.js';

class TableResultAnalysis extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrResult: this.props.arrResult ,
            arrResultValues: getArrResultValues( this.props.arrResult, null ),
            isAllChecked: this.props.isAllChecked
        };

        this.setValueEnW = this.setValueEnW.bind(this);
        this.setValueRuW = this.setValueRuW.bind(this);
        this.createTable = this.createTable.bind(this);
        this.setValueResult = this.setValueResult.bind(this);
        this.setValueCheked = this.setValueCheked.bind(this);
        this.get_arr_from_send_to_server = this.get_arr_from_send_to_server.bind(this);
        this.inputBlure = this.inputBlure.bind(this);
        this.keyDawnEnter = this.keyDawnEnter.bind(this);

    }

    static getDerivedStateFromProps( nextProps, prevState ){

        if ( nextProps.arrResult !== prevState.arrResult || nextProps.isAllChecked !== prevState.isAllChecked ) {
            let isAllChecked = null;
            if( nextProps.isAllChecked !== prevState.isAllChecked ){
                isAllChecked = nextProps.isAllChecked;
            };
            return {
                arrResult: nextProps.arrResult,
                arrResultValues: getArrResultValues( nextProps.arrResult, isAllChecked ),
                isAllChecked: nextProps.isAllChecked
            }
        };
        return null;
    }

    setValueEnW( e, index ){
        let arr = this.state.arrResultValues;
        arr[ index ].result.enW = e.target.value;
        this.setState({
            arrResultValues: arr
        });
    }

    setValueRuW( e, index ){
        let arr = this.state.arrResultValues;
        arr[ index].result.ruW = e.target.value;
        this.setState({
            arrResultValues: arr
        });
    }

    setValueResult( e, index ){
        
        let arr = this.state.arrResultValues;
        arr[ index].result = e.target.value;
        this.setState({
            arrResultValues: arr
        });
    }

    setValueCheked( e, index ){
        let arr = this.state.arrResultValues;
        if( arr[index].ok ){
            arr[index].isCheked = !arr[index].isCheked;
        }else{
            arr[index].isCheked = false;
        };
        this.setState({
            arrResultValues: arr
        });
        this.props.setNewArrResult(arr);
    }

    get_arr_from_send_to_server(){
        let arr = this.state.arrResultValues;
        let newarr = [];
        for( let obj of arr ){
            let str = '';
            if( obj.ok ){
                str = obj.result.enW +' - '+ obj.result.ruW;
            }else{
                str = obj.result;
            };
            newarr.push(str);
        };
        return newarr;
    }

    inputBlure(){
        this.props.rewrite_arrResult( this.state.arrResultValues );
    }

    keyDawnEnter( e ){
        this.props.rewrite_arrResult( this.state.arrResultValues );
        $( e.target ).blur();
    }

    createTable( arrResult ){
        if( arrResult.length === 0 ){
            return '';
        };

        let rows = arrResult.map( ( item, index ) => {

            if( item.ok ){
                return (
                    <tr key = { index } className = "trSuccess">
                        <th>
                            <input 
                                type = 'checkbox'
                                checked = { item.isCheked }
                                onChange = { (e) => {
                                    this.setValueCheked( e, index );
                                }}
                            />
                        </th>
                        <th className = "num">{ index+1 }</th>
                        <th colSpan="2" className = "listWords">
                            <input  type='text' 
                                value={ this.state.arrResultValues[ index ].result.enW } 
                                onChange = { (e) => {
                                    this.setValueEnW( e, index );
                                }}
                                onBlur = { () => {
                                    this.inputBlure();
                                }}
                                onKeyPress = {
                                    this.keyDawnEnter
                                }
                            />
                            <input  type='text' 
                                value={ this.state.arrResultValues[ index ].result.ruW } 
                                onChange = { (e) => {
                                    this.setValueRuW( e, index );
                                }}
                                onBlur = { () => {
                                    this.inputBlure();
                                }}
                                onKeyPress = {
                                    this.keyDawnEnter
                                }
                            />
                        </th>
                        <th className = "isUniq">
                            { !item.exists? (
                                <span className="icon-ok-1 uniq"></span>
                                ):(<>
                                    <span className ="icon-cancel-5 notUniq"></span>
                                    <span className ="project_name">
                                        { item.project }
                                    </span>
                                    <span className ="old_words">
                                        { '('+item.result.enW +' - '+ item.ruW+')' }
                                    </span>
                                </>)
                            }
                        </th>
                    </tr>
                );
            }else{
                return (
                    <React.Fragment key = { index }>
                        <tr key = { index } className = "trNotSuccess">
                            <th rowSpan = '2'>
                                <input 
                                    type = 'checkbox'
                                    checked = { item.isCheked }
                                    onChange = { (e) => {
                                        this.setValueCheked( e, index );
                                    }}
                                />
                            </th>
                            <th  rowSpan = '2' className = "num">{ index+1 }</th>
                            <th colSpan="2" className = "listWords">
                                <input  type='text' 
                                        value={ this.state.arrResultValues[ index ].result } 
                                        onChange = { (e) => {
                                            this.setValueResult( e, index );
                                        }}
                                        onBlur = { () => {
                                            this.inputBlure();
                                        }}
                                        onKeyPress = {
                                            this.keyDawnEnter
                                        }
                                />
                            </th>
                            <th rowSpan = '2' className = "isUniq">
                                <span className = "isUniq_no_res">-</span>
                            </th>
                        </tr>   
                        <tr className = 'analysis_err_massage'>
                            <th colSpan="2">Ошибка! { item.error_massage }</th>
                        </tr>
                        
                    </React.Fragment>
                    
                );
            };
        });

        return (
            <table id='analysis_List'>
                <caption>Список</caption>

                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th colSpan='2'></th>
                        <th>уникальность</th>
                    </tr>
                </thead>

                <tbody>
                    { rows }
                </tbody>

                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th colSpan='2'></th>
                        <th></th>
                    </tr>
                </tfoot>

            </table>
        );

    }

    render(){
        return (
             
            <div className = 'analysis_resultTable'>
                { this.createTable( this.state.arrResultValues )}
            </div>
        )
    }
};


export default TableResultAnalysis;

function getArrResultValues( arrResult, isAllChecked = null ){
    let newarr = [];

    if( isAllChecked !== null){
        for( let obj of arrResult ){
            let newobj = obj;
            if( obj.ok ){
                newobj.isCheked = isAllChecked;
            }else{
                newobj.isCheked = false;
            };
            newarr.push( newobj );
        };
    }else{
        for( let obj of arrResult ){
            newarr.push( obj );
        };
    };
    
    return newarr;
};


