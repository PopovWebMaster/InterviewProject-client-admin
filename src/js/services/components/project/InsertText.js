import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import { GLOBAL } from './../../../CONSTANTS.js';
import FormResult from './FormResult.js';
import { separates_one_string_enW_from_ruW_and_enW_from_num } from './../functions/separates_one_string_enW_from_ruW_and_enW_from_num.js';
import AlertMassage from '../functions/AlertMassage.js';

class InsertText extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrResult: [],
            textAreaVal: ''
            
        };

        this.startHeightTextArea = '';

        this.setTextArea = this.setTextArea.bind(this);
        this.prosessed = this.prosessed.bind(this);
        this.setArrResult = this.setArrResult.bind(this);
        this.clearArrResult = this.clearArrResult.bind(this);

        this.addInList = this.addInList.bind(this);
        this.lowerRegister = this.lowerRegister.bind(this);
        this.openRules = this.openRules.bind(this);

    }

    setTextArea( e = false, text = false ) {
        /*
            Варианты вызова:
                - this.setTextArea 
                    (из onChange) запишет в state текущий value
                - this.setTextArea( false, true )
                    очистит state (запишет в него '')
                - this.setTextArea( false, 'строка' )  
                    запишет в стейт строку
        */
        if( e !== false){
            $( e.target ).height( (e.target.scrollHeight-30) + 'px');
            this.setState({
                textAreaVal: e.target.value
            });
        }else{
            let elem = $('#set_insertText textarea');
            if( text !== false ){
                this.setState({
                    textAreaVal: ''
                });
                $( elem ).height( this.startHeightTextArea + 'px');
            }else{
                $( elem ).height( this.startHeightTextArea + 'px');
                this.setState({
                    textAreaVal: text
                });
            };
        };
    }

    setArrResult( newArr ){
        this.setState({
            arrResult: newArr
        });
    }
   

    prosessed(){
        let text = this.state.textAreaVal;

        this.setTextArea( false, true );

        let arr = from_string_to_array( text );
        let arrResult = this.state.arrResult;

        for(let i = 0; i < arr.length; i++ ){
            let obj = separates_one_string_enW_from_ruW_and_enW_from_num( arr[i] );
            arrResult.push( obj );
        };

       this.setState({
            arrResult: arrResult
       });
    }
    clearArrResult(){
        this.setState({
            arrResult: []
        });
    }

    lowerRegister(){
        
        let arr = this.state.arrResult;
        let newarr = [];

        for( let i = 0; i < arr.length; i++ ){
            let obj = arr[i];
            if( obj.checked ){
                obj.result.enW = obj.result.enW.toLowerCase();;
                obj.result.ruW = obj.result.ruW.toLowerCase();
            };
            newarr.push( obj );
        };

        this.setState({
            arrResult: newarr
        });
    }

    addInList(){
        let arr = this.state.arrResult;
        let newarr = [];
        let newarrresult = [];

        for( let i = 0; i < arr.length; i++ ){
            if( arr[i].checked && arr[i].ok ){
                let obj = {
                    enW: arr[i].result.enW,
                    ruW: arr[i].result.ruW,
                };
                newarr.push( obj );
            }else{
                newarrresult.push( arr[i] );
            };
        };
        
        this.setState({
            arrResult: newarrresult
        });

        if( GLOBAL.IS_DEVELOPMENT ){
            this.props.setArrListWords({
                words: falseResponse
            });
        }else{
            $.ajax({
                url: this.props.massage.href_for_post,
                type: "POST",
                data: {
                    action: 'setNewWords',
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    words: newarr 
                },
                success: ( data ) => {
                    if( data.ok ){
                        this.props.setArrListWords( data );
                    }else{
                        console.dir('');
                    }; 
                },
                error: function (msg) {
                    console.log( 'Ошибка при отправке списка новых слов на сервер');
                } 
            });
        };
 
    }

    openRules(){
        let header = 'Правила составления списка';

        let instructions = this.props.instruction;

        let li = instructions.map( ( item, index )=>{
            return (
                <li key = {index} >{item}</li>
            );
        });
        let ul = <ul>{li}</ul>;
        let Massage = new AlertMassage();
        Massage.info( header, ul );
        
    }

    componentDidMount(){
        this.startHeightTextArea = $('#set_insertText textarea').height();
    }

    //componentDidUpdate(){}

    render(){
        return (
            <>
                <div id = "insertText">
                    <div id = "insertTextRules" >
                        <span onClick = { this.openRules }
                        >Правила составления списка</span>
                    </div>

                    <div id = "dop_func_panel" className = { this.state.arrResult.length === 0? 'noActive': ''} >
                        <ul>
                            <li     className = { this.state.arrResult.length === 0? 'noActive': 'Abc'}
                                    onClick = { this.lowerRegister }
                            >Abc<span className="icon-right"></span>abc</li>
                        </ul>
                    </div>

                    <div    id ="result_insertText">
                        <div className = 'resultTable'>
                            <FormResult 
                                arr = { this.state.arrResult }
                                setArrResult = { this.setArrResult } 
                            />
                        </div>
                        <div className = 'buts_result_insertText'>

                        
                            <span   className = { this.state.arrResult.length === 0? 'noActive': '' } 
                                    onClick = { this.addInList }
                            >Добавить выледеное в список</span>
                            <span   className = { this.state.arrResult.length === 0? 'noActive': '' } 
                                    onClick = { this.clearArrResult }
                            
                            >Очистить</span>
                        </div>
                    </div>

                    <div id = "set_insertText">
                        <textarea   className ='textarea' 
                                    onChange = { this.setTextArea }
                                    placeholder = 'Текст вставлять сюда'
                                    autoFocus
                                    value = { this.state.textAreaVal }
                        ></textarea>
                        <div className = 'buts_set_insertText'>
                            <span   className = { this.state.textAreaVal === ''? 'noActive': ''} 
                                    
                                    onClick = { this.prosessed }
                            >Обработать</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default InsertText;



let falseResponse = [
    {enW: "words",ruW: "слова", isAudio: {exists: false}, isRepeat: {exists: false, dictionary: false, project: false}},
    {enW: "criminal",ruW: "преступный", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "decent", ruW: "приличный", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "indecent", ruW: "непорядочный", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "honest", ruW: "честный", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "fair", ruW: "честный, справедливый", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "sincere", ruW: "искренний", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "dishonest", ruW: "нечестный", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "innocent", ruW: "невиновный", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "guilty", ruW: "виновный", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "kind", ruW: "добрый", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "hostile", ruW: "враждебный", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "gentle", ruW: "вежливый", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
    {enW: "polite", ruW: "вежливый", isRepeat: {exists: false, dictionary: false, project: false}, isAudio: {exists: false}},
];



function from_string_to_array( str ){
    
    let arr = str.split('\n');

    for( let i = 0; i < arr.length; i++){
        arr[i] = $.trim(arr[i]);
    };
    let arr2 = [];
    for( let i = 0; i < arr.length; i++ ){
        if( arr[i] !== '' ){
            arr2.push( arr[i] );
        }

    };

    return arr2;

};










