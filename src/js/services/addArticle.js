import $ from "jquery";

import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';

import { GLOBAL} from '../CONSTANTS.js';
// import "babel-polyfill";

import EditTitle        from './components/article/EditTitle/EditTitle.js'; 
import EditSecondTitle  from './components/article/EditSecondTitle/EditSecondTitle.js'; 
import EditAlias        from './components/article/EditAlias/EditAlias.js'; 
import EditText         from './components/article/EditText/EditText.js'; 
import ButtonSave       from './components/addArticle/ButtonSave/ButtonSave.js'; 

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            isChenged: false,

            title: '',
            errTitle: {
                isErr: false,
                massage: ''
            },

            second_title: '',
            errSecondTitle: {
                isErr: false,
                massage: ''
            },

            alias: '',
            errAlias: {
                isErr: false,
                massage: ''
            },

            text: ''

        };

        this.setIsChenged = this.setIsChenged.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setSecondTitle = this.setSecondTitle.bind(this);
        this.setAlias = this.setAlias.bind(this);
        this.setText = this.setText.bind(this);
        this.sendToServer = this.sendToServer.bind(this);

        //console.dir( this.props.massage );
    }

    setIsChenged( flag ){
        this.setState({
            isChenged: flag
        });
    }

    setTitle( title ){
        let title_trim = title.trim();

        if( title_trim === '' ){
            this.setState({
                title: title_trim,
                errTitle: {
                    isErr: true,
                    massage: 'Данное поле обязательно к заполнению'
                }
            });
        }else{
            let regex = /^[0-9a-zA-ZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ \.\-\?\',:;!=\+@#\$%&\*\(\)"]+$/;
            let isValidTitle = regex.test( title_trim );
    
            if(isValidTitle){
                let isNewTitle = true;
                for( let item of this.props.massage.arrListOfTitles ){
                    let itemTitle = item.toLowerCase();
                    let newTitle = title_trim.toLowerCase();
                    if( itemTitle === newTitle ){
                        isNewTitle = false;
                    };
                };

                this.setIsChenged( true );
                
                if( isNewTitle ){
                    this.setState({
                        title: title_trim,
                        errTitle: {
                            isErr: false,
                            massage: ''
                        },
                    });
                }else{
                    this.setState({
                        title: title_trim,
                        errTitle: {
                            isErr: true,
                            massage: 'Статья с таким заголовком уже существует. Заголовок должен быть уникальным'
                        },

                    });
                };
            }else{
                this.setState({
                    title: title_trim,
                    errTitle: {
                        isErr: true,
                        massage: 'В названии статьи можно использовать только кирилические, латинские символы, цифры и знаки .-?\',:;!=+@#$%&*()\"'
                    },
                });
            };
        };
 
    } 

    setSecondTitle( secondTitle ){
        let second_title = $.trim( secondTitle );

        if( secondTitle === '' ){
            this.setState({
                second_title: second_title,
                errSecondTitle: {
                    isErr: false,
                    massage: ''
                },
            });
        }else{
            let regex = /^[0-9a-zA-ZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ \.\-\?\',:;!=\+@#\$%&\*\(\)"]+$/;
            let isValidTitle = regex.test( second_title );

            this.setIsChenged( true );
            if( isValidTitle ){
                this.setState({
                    second_title: second_title,
                    errSecondTitle: {
                        isErr: false,
                        massage: ''
                    },
                });
            }else{
                this.setState({
                    second_title: second_title,
                    errSecondTitle: {
                        isErr: true,
                        massage: 'В слогане статьи можно использовать только кирилические, латинские символы, цифры и знаки .-?\',:;!=+@#$%&*()\"'
                    },
                });
            };

        };   
    }

    setAlias( alias ){
        let alias_trim = alias.trim();

        if( alias_trim === '' ){
            this.setState({
                alias: alias_trim.toLowerCase(),
                errAlias: {
                    isErr: true,
                    massage: 'Данное поле обязательно к заполнению'
                }
            });
        }else{
            let isValidAlias = /^[0-9a-zA-Z_-]{1,150}$/.test( alias_trim );
            if( isValidAlias ){
                let isNewAlias = true;
                for( let item of this.props.massage.arrListOfAliases ){
                    let itemAlias = item.toLowerCase();
                    let newAlias = alias_trim.toLowerCase();
                    if( itemAlias === newAlias ){
                        isNewAlias = false;
                    };
                };

                this.setIsChenged( true );
                if( isNewAlias ){
                    this.setState({
                        alias: alias_trim.toLowerCase(),
                        errAlias: {
                            isErr: false,
                            massage: ''
                        },
                    });
                }else{
                    this.setState({
                        alias: alias_trim.toLowerCase(),
                        errAlias: {
                            isErr: true,
                            massage: 'Статья с таким псевдонимом уже существует. Псевдоним должен быть уникальным'
                        },
                    });
                };

            }else{
                this.setState({
                    alias: alias_trim.toLowerCase(),
                    errAlias: {
                        isErr: true,
                        massage: 'Данный псевдоним содержит запрещённые символы. Можно использовать только латинские символы, цифры и знаки -_. Также он не должен превышать длины в 150 символов.'
                    }
                });
            };
        }; 
    }

    setText( newText ){
        this.setIsChenged( true );
        this.setState({
            text: newText
        });
    }

    sendToServer(){
        if( !this.state.isChenged ){
            return;
        };
        if( this.state.errTitle.isErr ){
            return;
        };
        if( this.state.errAlias.isErr ){
            return;
        };
        if( this.state.title === '' || this.state.alias === '' ){
            return;
        };

        let params = {
            title: this.state.title,
            second_title: this.state.second_title,
            alias: this.state.alias,
            text: this.state.text
        };

        if( GLOBAL.IS_DEVELOPMENT ){
            console.log('Это отправляем на сервер');
            console.dir( params );
            console.log('');
        }else{
            $.ajax({
                url: this.props.massage.href_for_post,
                type: "POST",
                data: {
                    params: params,
                    action: 'AddNewArticle',
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: ( data ) => {
                    if( data.ok ){
                        document.location.href = data.href;
                        //console.dir(data);
                    }else{
                        //console.dir(data);
                        console.dir('');
                    };
                   
                    
                },
                error: function (msg) {
                    console.log( 'error при отправке аякса');
                } 
            });
        };
    }

    render(){
		return (
            <div id = 'addArticle_admin'>
                <EditTitle 
                    title = { this.state.title }
                    setTitle = { this.setTitle }
                    errTitle = { this.state.errTitle }
                />

                <EditSecondTitle 
                    second_title = { this.state.second_title }
                    setSecondTitle = { this.setSecondTitle }
                    errSecondTitle = { this.state.errSecondTitle }
                />

                <EditAlias 
                    alias = { this.state.alias }
                    setAlias = { this.setAlias }
                    errAlias = { this.state.errAlias }
                />

                <EditText 
                    text = { this.state.text }
                    setIsChenged = { this.setIsChenged }
                    setText = { this.setText } 
                />

                <ButtonSave
                    isChenged = { this.state.isChenged }
                    sendToServer = { this.sendToServer } 
                />

            </div>
        );
	}
};
