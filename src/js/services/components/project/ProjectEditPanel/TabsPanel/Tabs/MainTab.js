// import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';

// import { CLASS_NAME, TAB_NAME, STARTING_TAB } from './../config.js';

import { send_to_server } from './../../../../functions/send_to_server.js';
import { action_for_development } from './../../../../../generalFunction/action_for_development.js';
import { WORDS_FOR_DEVELOPMENT } from './data_for_development/words.js';

import { pre_processing_of_the_array_words } from './functions/pre_processing_of_the_array_words.js'

import { TEST } from './functions/TESTS'; // НЕ УДАЛЯТЬ !!!!!!!!



export default class MainTab extends Component {
    constructor(props){
        super(props);

        this.state = {
            words: {},

        };

        this.get_words_from_server_and_set_them_to_state = this.get_words_from_server_and_set_them_to_state.bind(this);
        this.pre_processing_of_the_array_words = this.pre_processing_of_the_array_words.bind(this);

        



        // TEST.pre_processing_of_the_array_words(); // НЕ УДАЛЯТЬ !!!!!!!!



    }

    get_words_from_server_and_set_them_to_state(){

        let href =      this.props.href_for_post;
        let action =    this.props.action_list.getWords; // 'getWords'
        let data =      {};

        let successCallback = ( data ) => {
            if( data.ok ){

                action_for_development( () => {
                    console.log('успех');
                    console.dir(data);
                });

                this.setState({
                    words: data.words
                });

            }else{

                action_for_development( () => {
                    console.log('что-то не так при попытке получить слова от сервера при загрузке');
                    console.dir(data);
                });

            };
        };

        let errorCallback = () => {
            action_for_development( () => {
                console.log('Ошибка в get_words_from_server_and_set_them_to_state');
            });
        };

        if( IS_DEVELOPMENT ){

            console.dir('Отправляем на сервер такой запрос');
            console.log( 'action', action );
            console.log( 'data', data );

            successCallback( { ok: true, words: WORDS_FOR_DEVELOPMENT } );

        }else{
            send_to_server({
                href,
                action,
                data,
                successCallback,
                errorCallback,
            });
        };

    }

    pre_processing_of_the_array_words( arr ){
        return pre_processing_of_the_array_words( arr );

    }

    componentDidMount(){

        this.get_words_from_server_and_set_them_to_state();

    }


};



