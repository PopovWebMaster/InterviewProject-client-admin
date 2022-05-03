import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import $ from "jquery";

import { get_a_clone_of_an_object } from './../../components/functions/get_a_clone_of_an_object.js';

import { determine_the_type_of_input }  from './../functions/determine_the_type_of_input.js';
import ButtonPanel                      from './ButtonPanel/ButtonPanel.js';

import { GLOBAL } from './../../../CONSTANTS.js';

export default class MainApp extends Component{
    constructor(props){
        super(props);

        this.determine_the_type_of_input = this.determine_the_type_of_input.bind(this);
        this.createButtonPanel = this.createButtonPanel.bind(this);
        this.button_save_handler = this.button_save_handler.bind(this);
        this.button_cancel_handler = this.button_cancel_handler.bind(this);
        this.getDataFromSendToServer = this.getDataFromSendToServer.bind(this);

    }

    determine_the_type_of_input( params ){

        let interval = params.interval;

        let result = determine_the_type_of_input({
            interval,
        });

        return result;
    }

    getDataFromSendToServer(){

        let arrListSettings = this.state.arrListSettings;
        let result = {};

        for( let key in arrListSettings ){
            result[ key ] = arrListSettings[ key ].value;
        };

        return result;
    }

    button_save_handler(){

        let href =      this.props.massage.href_for_post;
        let action =    this.props.massage.actions.setNewSettings;
        let data =      this.getDataFromSendToServer();

        if( GLOBAL.IS_DEVELOPMENT ){
            console.log('Это отправляем на сервер');
            console.dir( data );
            console.log('');
        }else{
            $.ajax({
                url: href,
                type: "POST",
                data: {
                    params: data,
                    action: action,
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: ( data ) => {
                    if( data.ok ){
                        // console.dir( data );
                        document.location.href = data.href;
                    }else{
                        console.dir( data );
                        console.dir( '' );
                    };
                    
                },
                error: function (msg) {
                    console.log( 'error при отправке аякса');
                } 
            });
        };
 
    }

    button_cancel_handler(){

        this.setState({
            arrListSettings: get_a_clone_of_an_object( this.props.massage.arrListSettings ), 
            isChenged: false,
        });

    }

    createButtonPanel( isChenged ){
        return (
            <ButtonPanel 
                isChenged =             { isChenged }
                button_save_handler =   { this.button_save_handler }
                button_cancel_handler = { this.button_cancel_handler }
            />
        );
    }


};