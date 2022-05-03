import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';

import { GLOBAL } from './../../../CONSTANTS.js';

import { separates_one_string_enW_from_ruW_and_enW_from_num } from './../functions/separates_one_string_enW_from_ruW_and_enW_from_num.js';
import { cleans_enW } from './../functions/cleans_enW.js';
import { cleans_ruW_and_num } from './../functions/cleans_ruW_and_num.js';


class List extends Component {
    constructor(props){
        super(props);

        this.state = {
            arrListWords: this.props.arrListWords,
            arrValues: getArrValues( this.props.arrListWords ),

            total: this.props.total ,
            issetAudio: this.props.issetAudio, // сумма совпадений аудио со списком слов
            issetRepeat: this.props.issetRepeat ,
            ready: this.props.ready ,
        };

        this.on = true;

        this.createTable = this.createTable.bind(this);
        this.setValueEnW = this.setValueEnW.bind(this);
        this.setValueRuW = this.setValueRuW.bind(this);
        
        this.keyDown = this.keyDown.bind(this);
        this.processedList = this.processedList.bind(this);
        this.eventsOn = this.eventsOn.bind(this);
        this.eventsOff = this.eventsOff.bind(this);
        this.deleteOneWord = this.deleteOneWord.bind(this);
        this.isAudio = this.isAudio.bind(this);
         
    }

    static getDerivedStateFromProps( nextProps, prevState ){

        if ( nextProps.arrListWords !== prevState.arrListWords) {
            return {
                arrListWords: nextProps.arrListWords,
                arrValues: getArrValues( nextProps.arrListWords ),
                total: nextProps.total ,
                issetAudio: nextProps.issetAudio ,
                issetRepeat: nextProps.issetRepeat ,
                ready: nextProps.ready ,
            }
        };
        return null;
    }

    setValueEnW( e, index ){
        let arr = this.state.arrValues;
        arr[index].enW = e.target.value;
        this.setState({
            arrValues: arr
        });
    }

    setValueRuW( e, index ){
        let arr = this.state.arrValues;
        arr[index].ruW = e.target.value;
        this.setState({
            arrValues: arr
        });
    }

    deleteOneWord( e,  item ){

        let deletedArr = [
            {
                enW: item.enW,
                ruW: item.ruW
            }
        ];

        if( GLOBAL.IS_DEVELOPMENT ){
            let data = [];
            for( let i = 0; i > this.state.arrListWords.length; i++ ){
                if( this.state.arrListWords[i].enW !== deletedArr[0].enW ){
                    data.push( this.state.arrListWords[i] );
                };
            };
            this.props.setArrListWords( data );

        }else{
            $.ajax({
                url: this.props.massage.href_for_post,
                type: "POST",
                data: {
                    action: 'deleteOneWord',
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    deletedArr: deletedArr
                },
                success: ( data ) => {
                    if( data.ok ){
                        this.props.setArrListWords( data );
                        //console.dir(data);
                    }else{
                        console.dir('');
                    };
                },
                error: function (msg) {
                    console.log( 'Ошибка при удадении слова из списка');
                } 
            });
        };

    }

    processedList(){
        let arr = this.state.arrListWords;
        for( let i = 0; i < arr.length; i++){
            let res = separates_one_string_enW_from_ruW_and_enW_from_num( this.state.arrValues[i].enW + ' ' + this.state.arrValues[i].ruW );
            
            if( res.ok ){
                arr[i].enW = res.result.enW;
                arr[i].ruW = res.result.ruW;
            }else{
                arr[i].enW = cleans_enW( this.state.arrValues[i].enW );
                arr[i].ruW = cleans_ruW_and_num( this.state.arrValues[i].ruW );
            };
        };

        if( GLOBAL.IS_DEVELOPMENT ){
            this.setState({
                arrListWords: arr,
                arrValues: getArrValues( arr )
            });
        }else{
            $.ajax({
                url: this.props.massage.href_for_post,
                type: "POST",
                data: {
                    action: 'updateWords',
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    words: arr
                },
                success: ( data ) => {
                    if( data.ok ){
                        this.props.setArrListWords( data );
                        //console.dir(data);
                    }else{
                        console.dir('');
                    };
                },
                error: function (msg) {
                    console.log( 'Ошибка при обновлении слов (В List)');
                } 
            });
        };
    }

    keyDown( e ){
        if( e.which === 13){	    // Enter
            this.processedList();
            let inputs = $('#projectList tbody input');
            for( let i = 0; i < inputs.length; i++ ){
                $('#projectList tbody input').eq(i).blur();
            };
        };
    }

    eventsOn(){
        this.eventsOff();
        $(document).on("keydown", this.keyDown );
    }

    eventsOff(){
        $(document).off("keydown");
    }

    isAudio( enW, arrAudio ){
        if( enW === undefined || arrAudio === undefined ){
            return false;
        };
        let result = false;
        if( arrAudio.length !== 0 ){
            for( let audioName of arrAudio ){
                if( audioName === enW ){
                    result = true;
                    break;
                };
            };
        };
        return result;
    };

    createTable( arr ){
        if( arr.length === 0 ){
            return (
                <div style = {{
                    textAlign: 'center',
                    padding: '30px 0',
                    color: '#00000050'
                }}>
                    Список пуст
                </div>
            );
        };
        
        let rows = arr.map( ( item, index ) => {
            let res = separates_one_string_enW_from_ruW_and_enW_from_num( item.enW+' '+item.ruW );
            if( res.ok ){
                let is_repeat_str = '';
                if( item.isRepeat.exists ){
                    is_repeat_str = (
                        <>
                            <span className = "badFirst">Есть</span>
                            <span className = "badLast">
                                {item.isRepeat.project}
                            </span>
                        </>
                    );
                };

                let isAudio = this.isAudio( item.enW, this.props.arrListAudio );

                return (
                    <tr key = { index } className = "trSuccess">
                        <th className = "num">{ index+1 }</th>
                        <th colSpan="2" className = "listWords">
                            <input  type='text' 
                                value={ this.state.arrValues[index].enW } 
                                onChange = { (e) => {
                                    this.setValueEnW( e, index );
                                }}
                            />
                            <input  type='text' 
                                value={ this.state.arrValues[index].ruW } 
                                onChange = { (e) => {
                                    this.setValueRuW( e, index );
                                }}
                            />
                        </th>
                        <th className = "isAudio">{ isAudio? <span className="icon-ok-1"></span>: <span>Нет</span> }</th>
                        
                        <th className = "isRepeat">{ item.isRepeat.exists? is_repeat_str: <span>Нет</span> }</th>
                        <th     className = "deletItem"
                                onClick = { ( e ) => {
                                    this.deleteOneWord( e, item );
                                }}
                        ><span>Удалить</span></th>
                    </tr>     
                );
            }else{ // если ошибка/* <th className = "isAudio">{ item.isAudio.exists? <span className="icon-ok-1"></span>: <span>Нет</span> }</th> */
                return (
                    <React.Fragment key = { index }>
                        <tr key = { index } className = "trError">
                            <th rowSpan = '2' className = "num">{ index+1 }</th>
                            <th colSpan="2">
                                <input  type='text' 
                                        value={ this.state.arrValues[index].enW } 
                                        onChange = { (e) => {
                                            this.setValueEnW( e, index );
                                        }}
                                />
                                <input  type='text' 
                                        value={ this.state.arrValues[index].ruW } 
                                        onChange = { (e) => {
                                            this.setValueRuW( e, index );
                                        }}
                                />
                            </th>
                            <th></th>
                            <th></th>
                            <th     className = "deletItem"
                                    onClick = { ( e ) => {
                                        this.deleteOneWord( e, item );
                                    }}
                            ><span>Удалить</span></th>
                            {/*<th><span className="icon-cancel-5"></span></th> */}
                            
                        </tr>
                        <tr>
                            <th colSpan="5">Ошибка! { res.error_massage }</th>
                        </tr>
                    </React.Fragment>
                );
            };
        });

        return(
            <table id='projectList'>
                <caption>Список</caption>

                <thead>
                    <tr>
                        <th></th>
                        <th colSpan='2'></th>
                        <th>аудио</th>
                        <th>повторы</th>
                        <th>Удалить</th>
                    </tr>
                </thead>

                <tbody>
                    { rows }
                </tbody>

                <tfoot>
                    <tr>
                        <th rowSpan = "2"></th>
                        <th colSpan='2'></th>
                        <th>{ this.state.issetAudio }</th>
                        <th>{ this.state.issetRepeat }</th>
                        <th></th>
                    </tr>
                    <tr className = 'totalFoot'>
                        <th colSpan='4'>{/*Готово к публикации: { this.state.ready }*/}</th>
                        <th></th>
                    </tr>
                </tfoot>

            </table>
        );

    }

    componentDidUpdate(){
        this.eventsOn();
    }

    componentWillUnmount(){
        this.eventsOff();
    }

    render(){
        return (
            <>
                { this.createTable( this.state.arrListWords ) }
            </>
        );
    }
};

export default List;



function getArrValues( arr ){
    
    if( arr.length === 0 ){
        return [];
    };

    let newarr = [];

    for( let i = 0; i < arr.length; i++){
        let obj = {
            enW: arr[i].enW,
            ruW: arr[i].ruW
        };
        newarr.push( obj );
    };

    return newarr;
};






