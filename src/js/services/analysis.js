import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
// import "babel-polyfill";

import TableResultAnalysis from './components/analysis/TableResultAnalysis.js';

import { separates_one_string_enW_from_ruW_and_enW_from_num } from './components/functions/separates_one_string_enW_from_ruW_and_enW_from_num.js';

import { GLOBAL } from './../CONSTANTS.js';

export default class App extends Component{
    constructor(props){
        super(props);

        this.empty_value = '---';
        this.startHeightTextArea = '';

        this.state = {
            isAllChecked: false,
            arrListFreeProjects: this.props.massage.arrListFreeProjects,
            projectId: null,
            textAreaVal: '',
            // это нужно для примера при отладке
            // `words - слова
            // analysis - анализ
            // цццццц - wwwwwЫ
            // also - точно так же
            // five - пять
            // sssц - ыыыы`,
            arrResult: [
                /*{
                    ok: true,
                    result: {enW: "alsow", ruW: "фффффффффффффффф"},
                    error_massage: "",
                    exists: false,
                    project: false,
                    ruW: "",
                }*/
            ],
            isActiveBut: false

        };


        this.setAllChecked = this.setAllChecked.bind(this);
        this.createOptions =  this.createOptions.bind(this);
        this.setProject = this.setProject.bind(this);
        this.sendResult = this.sendResult.bind(this);
        this.prosessed = this.prosessed.bind(this);
        this.setTextArea = this.setTextArea.bind(this);

        this.setNewArrResult = this.setNewArrResult.bind(this);
        this.set_arr_with_info_about_repeats_in_state = this.set_arr_with_info_about_repeats_in_state.bind(this);

        this.merge_server_response_and_arrResult = this.merge_server_response_and_arrResult.bind(this);
        this.addChecked = this.addChecked.bind(this);
        this.rewrite_arrResult = this.rewrite_arrResult.bind(this);
        this.getIsActiveBut = this.getIsActiveBut.bind(this);

        //console.dir( this.props.massage );

    }

    setAllChecked( flag = undefined ){
        
        if( this.state.arrResult.length === 0 ){
            return;
        };

        if( flag === undefined ){
            let next_isAllChecked = !this.state.isAllChecked;
            
            this.setState({
                isAllChecked: next_isAllChecked,
                isActiveBut: next_isAllChecked
            });
        }else{
            this.setState({
                isAllChecked: flag,
                isActiveBut: flag
            });
        };
    }

    createOptions( arr, isActiveBut ){
        if( !isActiveBut ){
            return (
                <option
                    value = { this.empty_value }
                > --- </option>
            );
        };

        let option = arr.map( ( item, index ) => {
            return (
                <option key = {index} 
                        value = { item.id }
                >
                    { item.name }
                </option>
            );
        });

        return (
            <>
                <option
                    value = { this.empty_value }
                > --- 
                </option>
                { option }
            </>
        );
    }

    setProject( e ){
        let val = e.target.value;
        this.setState({
            projectId: val
        });
    }

    sendResult(){
        if( !this.state.isActiveBut ){
            return;
        };
        if( this.state.projectId === this.empty_value || this.state.projectId === null ){
            // анимация тряски выбора проекта
            $(".select_proj div").css('animation-play-state', 'running');
            setTimeout( () => {
                let elem = $(".select_proj div");
                $(".select_proj div").remove();
                $(".select_proj").append( elem );
                $(".select_proj div").css('animation-play-state', 'paused');
            }, 300);
            return;
        };

        let arrSelected = [];
        let arrForServer = [];
        let new_arrResult = [];
        for( let obj of this.state.arrResult ){
            if( obj.isCheked && obj.ok ){
                let obj_for_server = {
                    enW: obj.result.enW,
                    ruW: obj.result.ruW,
                };
                arrSelected.push( obj );
                arrForServer.push( obj_for_server );
            }else{
                new_arrResult.push( obj );
            };
        };

       

        if( GLOBAL.IS_DEVELOPMENT ){

            console.dir( 'отправляем на сервер это' );
            console.dir( arrForServer );
            let id = this.state.projectId;
            console.dir( '' );
            this.setNewArrResult( new_arrResult );
   
        }else{
            let id = this.state.projectId;
            $.ajax({
                url: this.props.massage.href_for_post,
                type: "POST",
                data: {
                    action: 'sendToProject',
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    words: arrForServer,
                    idProject: id
                },
                success: ( data ) => {
                    if( data.ok ){
                        console.dir(data);
                        //this.setNewArrResult( new_arrResult );
                    }else{
                        console.dir(data);
                        //alert("Неизвестная ошибка, повторите попытку снова");
                    };
                    console.dir(data);
                },
                error: function (msg) {
                    console.log( 'Ошибка при отправке списка новых слов на сервер');
                } 
            });
        };

    }

    setTextArea(  e = false, text = false  ){
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
            let str = e.target.value;
            let arr = str.split('\n');
            let sum_line = arr.length;
            let hei = 14.5*sum_line;
            $( e.target ).height( hei + 'px');
            this.setState({
                textAreaVal: e.target.value
            });
        }else{
            let elem = $('.analysis_insertText .analysis_textarea');
            if( text !== false ){
                this.setState({
                    textAreaVal: ''
                });
                $( elem ).height( this.startHeightTextArea + 'px');
            }else{
                $( elem ).height( this.startHeightTextArea + 'px');
            };
        };
    }

    getIsActiveBut( arrResult ){
        let isActiv = false;
        for( let obj of arrResult ){
            if( obj.isCheked ){
                isActiv = true;
                break;
            };
            
        };
        return isActiv;
    }

    prosessed(){
        let text = this.state.textAreaVal;
        if( $.trim( text ) === '' ){
            return;
        };
        this.setTextArea( false, true );
        let arr = from_string_to_array( text ); 
        this.set_arr_with_info_about_repeats_in_state( arr );
    }

    setNewArrResult( newArrResult ){
        this.setState({
            arrResult: newArrResult
        });
    }

    merge_server_response_and_arrResult( arrRespons, arrResultProcessedTextArea ){
        /*
            arrRespons имеет вид:
                [
                    {checked_enW: "words", exists: false, project: false, ruW: ""},
                    {checked_enW: "analysis", exists: false, project: false, ruW: ""},
                    {checked_enW: "also", exists: true, project: "Мой первый проект", ruW: "тоже"},
                    {checked_enW: "five", exists: false, project: false, ruW: ""},
                ];
        */

        let arr_respons = [];// arrRespons; // falseRespons
        for( let obj of arrRespons ){
            arr_respons.push( obj );
        };

        let arr_result = []; // arrResultProcessedTextArea; // arrResult
        for( let obj of arrResultProcessedTextArea ){
            arr_result.push( obj );
        };

        // перезаписываю новые значения от сервера соврпадающих слов по enW
        for( let i = 0; i < arr_respons.length; i++ ){

            let enW = arr_respons[i].checked_enW;

            for( let y = 0; y < arr_result.length; y++ ){
                if( arr_result[y].ok ){
                    let str1 = arr_result[y].result.enW;
                    let str2 = (enW === undefined)? '': enW;

                    if( str1.toLowerCase() === str2.toLowerCase() ){
                        arr_result[y].exists = arr_respons[i].exists;
                        arr_result[y].project = arr_respons[i].project;
                        arr_result[y].ruW = arr_respons[i].ruW;
                    };
                }else{
                    arr_result[y].exists = false;
                    arr_result[y].project = false;
                    arr_result[y].ruW = '';
                };
            };
        };
        
        // соединяем массивы в стейте и новый массив обработанный из текст ареа
        let arrResult_from_state = this.state.arrResult; // new_arrResult

        for( let obj of arr_result ){
            let is_uniq = true;

            let str2;
            if( obj.ok ){
                str2 = obj.result.enW;
            }else{
                str2 = obj.result;
            };

            obj.result.enW;

            for( let i = 0; i < arrResult_from_state.length; i++ ){

                if( arrResult_from_state[i].ok ){
                    let str1 = arrResult_from_state[i].result.enW;
                    
                    if( str1.toLowerCase() === str2.toLowerCase() ){
                        is_uniq = false;
                        let isCheked = arrResult_from_state[i].isCheked;
                        arrResult_from_state[i] = obj;
                        arrResult_from_state[i].isCheked = isCheked;
                        break;
                    };
                }else{
                    let str1 = arrResult_from_state[i].result;

                    if( str1.toLowerCase() === str2.toLowerCase() ){
                        is_uniq = false;
                        arrResult_from_state[i] = obj;
                        arrResult_from_state[i].isCheked = false;
                        break;
                    };
                };
            };
            if( is_uniq ){
                obj.isCheked = this.state.isAllChecked;
                arrResult_from_state.push( obj );
            };
        };
        arrResult_from_state = this.addChecked( arrResult_from_state );
        return arrResult_from_state;
    }

    addChecked( arrResult ){
        let newarr = [];
        for( let obj of arrResult ){
            if( obj.ok ){
                if( typeof( obj.ok ) === undefined || obj.ok === null ){
                    obj.isCheked = this.state.isAllChecked;
                };
            }else{
                obj.isCheked = false;
            };
            newarr.push(obj);
        };
        return newarr;
    }


    rewrite_arrResult( arrResult ){
        // проверяем arrResult на наличие ошибок используя: 
        //     separates_one_string_enW_from_ruW_and_enW_from_num( str )
        let checked_arrResult = [];
        for( let obj of arrResult ){
            let str = '';
            let isCheked;
            if( obj.ok ){
                str = obj.result.enW+' - '+obj.result.ruW;   
                isCheked = obj.isCheked;
            }else{
                str = obj.result;
                isCheked = false;
            };
            let res = separates_one_string_enW_from_ruW_and_enW_from_num( str );
            res.isCheked = isCheked;
            checked_arrResult.push( res );
        };

        // делим checked_arrResult на два других объекта
        //      let obj_ok_true = []; Ошибок нет
        //      let obj_ok_false = []; Ошибки есть
        let obj_ok_true = [];
        let obj_ok_false = [];
        for( let obj of checked_arrResult ){
            if( obj.ok ){
                obj_ok_true.push( obj );
            }else{
                obj_ok_false.push( obj );
            };
        };

        // создаём массив для отправки на сервер 
        let arrForSendToServer = [];
        for( let obj of obj_ok_true ){
            arrForSendToServer.push( obj.result.enW );
        };
        

        if( GLOBAL.IS_DEVELOPMENT ){

            // создаём фальшивую обработку результата из сервера
            // просто чтоб видеть как всё работает в development
            let new_arrResult = [];
            let index = 0;
            for( let enW of arrForSendToServer ){
                let obj = {
                    ok: true,
                    result: {
                        enW: enW,
                        ruW: 'Русское слово'
                    },
                    exists: false,
                    project: false,
                    ruW: "",
                    isCheked: obj_ok_true[index].isCheked
                };
                new_arrResult.push( obj );
                index++;
            };

            let arrRes = [];
            for( let obj of checked_arrResult ){
                let str;
                if( obj.ok ){
                    str = obj.result.enW;
                }else{
                    str = obj.result;
                };
                let res_obj = undefined;

                for( let y = 0; y < new_arrResult.length; y++ ){
                    let str2 = new_arrResult[y].result.enW;
                    if( str.toLowerCase() === str2.toLowerCase() ){
                        res_obj = new_arrResult[y];
                        break;
                    };
                };
                if( res_obj === undefined ){
                    res_obj = obj;
                };
                arrRes.push(res_obj);
            };

            
            this.setNewArrResult( arrRes );
        }else{
            $.ajax({
                url: this.props.massage.href_for_post,
                type: "POST",
                data: {
                    wordsForCheck: arrForSendToServer,
                    action: 'checkWords',
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: ( data ) => {

                    if( data.ok ){
                        let arrRes = [];
                        let dataRes = data.result;
                        for( let obj of checked_arrResult ){
                            let str;
                            if( obj.ok ){
                                str = obj.result.enW;
                            }else{
                                str = obj.result;
                            };
                            let res_obj = undefined;
                            for( let y = 0; y < dataRes.length; y++ ){
                                let str2 = dataRes[y].checked_enW; 
                                if( str.toLowerCase() === str2.toLowerCase() ){
                                    res_obj = {
                                        ok: true,
                                        result: {
                                            enW: dataRes[y].checked_enW,
                                            ruW: obj.result.ruW
                                        },
                                        exists: dataRes[y].exists,
                                        project: dataRes[y].project,
                                        error_massage: "",
                                        isCheked: obj.isCheked,
                                        ruW: dataRes[y].ruW
                                    };
                                    break;
                                };
                            };

                            if( res_obj === undefined ){
                                res_obj = {
                                    ok: false,
                                    result: obj.result,
                                    exists: false,
                                    project: false,
                                    error_massage: obj.error_massage,
                                    isCheked: false,
                                    ruW: ''
                                };
                            };
                            arrRes.push(res_obj);
                        };
    
                        this.setNewArrResult( arrRes );
                    }else{
                        console.dir('');
                    };

                    //console.dir(data);
                },
                error: function (msg) {
                    console.log( 'error при отправке аякса');
                } 
            });
        };  
    }

    set_arr_with_info_about_repeats_in_state( arrStr ){
        /*
            должен принять массив, где кажый элемент - это строка 'word - слово'
        */

        let arr = arrStr; 
        let arrResultProcessedTextArea = []; // arrResult
        let arrForSendToServer = [];

        for( let i = 0; i < arr.length; i++ ){
            let res = separates_one_string_enW_from_ruW_and_enW_from_num( arr[i] );
            if( res.ok ){
                arrForSendToServer.push( res.result.enW );
                arrResultProcessedTextArea.push( res );
            }else{
                arrResultProcessedTextArea.push( res );
            }; 
        };

        if( GLOBAL.IS_DEVELOPMENT ){
            let new_arrResult = this.merge_server_response_and_arrResult( this.props.massage.falseRespons, arrResultProcessedTextArea );
            this.setNewArrResult( new_arrResult );
        }else{
            $.ajax({
                url: this.props.massage.href_for_post,
                type: "POST",
                data: {
                    wordsForCheck: arrForSendToServer,
                    action: 'checkWords',
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: ( data ) => {
                    if( data.ok ){
                        console.dir(data);
                        let new_arrResult = this.merge_server_response_and_arrResult( data.result, arrResultProcessedTextArea );
                        this.setNewArrResult( new_arrResult );
                    }else{
                        console.dir(data);
                        console.dir('');
                    };
                },
                error: function (msg) {
                    console.log( 'error при отправке аякса');
                } 
            });
        };
    }

    componentWillUpdate( nextProps, nextState ){
        if(  this.state.arrResult !== nextState.arrResult  ){
            let isActiveBut = this.getIsActiveBut( nextState.arrResult );
            if( this.state.isActiveBut !== isActiveBut ){
                this.setState({
                    isActiveBut: isActiveBut
                });
            };
        }; 
    }

    componentDidMount(){
        this.startHeightTextArea = $('.analysis_insertText .analysis_textarea').height();
    }

    render(){
		return (
            <div id = 'analisys'>
                <div className = 'analisys_but_panel'>
                    <div>
                        <input 
                            type = 'checkbox'
                            checked = { this.state.isAllChecked }
                            onChange = { ( e )=>{
                                this.setAllChecked();
                            }}
                        />   
                    </div>
                    <div className = 'select_proj'>
                        <div>
                        <span
                            className = { this.state.isActiveBut? '': 'noactive'  }
                        > Отправить в: </span>
                        <select
                            className = { this.state.isActiveBut? '': 'noactive'  }
                            value={ (this.state.projectId === null)? this.empty_value: this.state.projectId }
                            onChange = { this.setProject }
                        >
                            { this.createOptions( this.state.arrListFreeProjects, this.state.isActiveBut ) }
                        </select>
                        </div>
                    </div>
                    <div>
                        <span 
                            className = { this.state.isActiveBut? 'analysis_send': 'analysis_send noactive'  }
                            onClick = { this.sendResult }
                        >Отправить
                        </span>
                    </div>
                </div>

                <TableResultAnalysis 
                    arrResult = { this.state.arrResult }
                    setNewArrResult = { this.setNewArrResult }
                    isAllChecked = { this.state.isAllChecked }
                    rewrite_arrResult = { this.rewrite_arrResult }
                />

                <div className = "analysis_insertText">
                    <textarea   className ='analysis_textarea' 
                                onChange = { this.setTextArea }
                                placeholder = 'Текст вставлять сюда'
                                autoFocus
                                value = { this.state.textAreaVal }
                    ></textarea>
                    <div className = 'analysis_buts_set_insertText'>
                        <span   className = { this.state.textAreaVal === ''? 'noActive': ''} 
                                onClick = { this.prosessed }
                        >Обработать</span>
                     </div>
                </div>
            
            </div>
		)
	}


};



function from_string_to_array( str ){
    
    let arr = str.split('\n');

    for( let i = 0; i < arr.length; i++){
        arr[i] = $.trim(arr[i]);
    };
    let arr2 = [];
    for( let i = 0; i < arr.length; i++ ){
        if( arr[i] !== '' ){
            arr2.push( arr[i] );
        };
    };

    return arr2;

};


