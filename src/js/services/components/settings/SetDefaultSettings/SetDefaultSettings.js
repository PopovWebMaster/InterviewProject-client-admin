import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './SetDefaultSettings.scss';

import { GLOBAL } from './../../../../CONSTANTS.js';
import Confirm from './../../Confirm';


class SetDefaultSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            ok: false,
            isOpen: false
        };
        this.action = this.action.bind(this);
        this.getStrAsq = this.getStrAsq.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.openConfirm = this.openConfirm.bind(this);
    }

    action( flag ){
        this.setState({
            ok: flag,
            isOpen: false
        });
    }

    getStrAsq(){
        return 'Вы действительно хотите сбросить все настройки сайта и установить настройки по умолчанию?';
    }

    openConfirm(){
        this.setState({
            isOpen: true
        });
    }

    showConfirm( asq ){
        return (
            <Confirm  
                asq = { asq }
                action = { this.action }
            />
        );
    }

    componentDidUpdate( prevProps, prevState ) {
        if( prevState.ok !== this.state.ok ){
            if( this.state.ok ){
                if( GLOBAL.IS_DEVELOPMENT ){
                    console.log('Отправка запроса на удаление на сервер');
                    console.log( this.props.href_for_post );
                }else{
                    
                    $.ajax({
                        url: this.props.href_for_post,
                        type: "POST",
                        data: {
                            action: 'setDefaultSettings',
                            _token: $('meta[name="csrf-token"]').attr('content')
                        },
                        success: ( data ) => {
                            if( data.ok ){
                                //console.dir(data);
                                document.location.href = data.href;
                            }else{
                                //console.dir(data);
                                console.dir('');

                            };
                        },
                        error: function (msg) {
                            console.log( 'error при отправке аякса');
                            //console.dir(msg);
                        } 
                    });
                };

            };
        };
    }

    render(){
        return (
            <>
                <div className = 'setDefaultSettinds_set'>
                    { this.state.isOpen? this.showConfirm( this.getStrAsq() ): '' }
                    <span
                        onClick = { this.openConfirm }
                    >
                        Установить настройки по умолчанию
                    </span>
                </div>
            </>
        )
    }
};

export default SetDefaultSettings;