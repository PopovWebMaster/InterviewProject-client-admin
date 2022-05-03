// import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
// import { GLOBAL} from './../CONSTANTS.js';
import './index.scss';

import { CLASS_NAME, REG_EX } from './config.js';

// import { change_textarea_size } from './../functions/change_textarea_size.js';
import { change_textarea_size } from './../../../generalFunction/change_textarea_size.js';
import { send_to_server } from './../../../generalFunction/send_to_server.js';

import { controller } from './controller.js';

export const ProjectDescriptionAndStatInfoController = controller;


export default class ProjectDescriptionAndStatInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            description: this.props.description
        };

        this.prev_description = undefined;  // только для tracks_the_end_of_printing_and_runs_a_handler_at_the_end
        this.interval_is_started = false;   // только для tracks_the_end_of_printing_and_runs_a_handler_at_the_end

        this.setTextarea = this.setTextarea.bind(this);
        this.checkDescriptionString = this.checkDescriptionString.bind(this);
        this.send_description_to_server = this.send_description_to_server.bind(this);
        this.tracks_the_end_of_printing_and_runs_a_handler_at_the_end = this.tracks_the_end_of_printing_and_runs_a_handler_at_the_end.bind(this);


  
    }

    setTextarea( e ){
        let value = e.target.value;

        if( this.checkDescriptionString( value ) ){
            this.setState({
                description: value,
            });

            let selector = `.${ CLASS_NAME.DESCRIPTION_AND_STAT_INFO } textarea`;
            change_textarea_size( selector ); 

            this.tracks_the_end_of_printing_and_runs_a_handler_at_the_end( this.send_description_to_server );
        };

    }

    checkDescriptionString( str ){

        let regEx = REG_EX.DESCRIPTION;
        let strIsVal = regEx.test( str );
        let result = false;

        if( strIsVal || str === '' ){
            result = true;
        };

        return result;
    }

    tracks_the_end_of_printing_and_runs_a_handler_at_the_end( handler ){ 
        // отслеживает окончание печати и запускает обработчик в конце

        if( this.interval_is_started ){
            return;

        }else{
            this.interval_is_started = true;
            let timeout = 400;

            let interval = setInterval( () => {

                if( this.prev_description === this.state.description ){
                    clearInterval( interval );

                    handler();
                    this.interval_is_started = false;
                };

                this.prev_description = this.state.description;

            }, timeout );
        };
        
    }

    send_description_to_server( finishHandler = undefined ){

        let href =      this.props.href_for_post;
        let action =    'setDescription';
        let data =      {
            description: this.state.description,
        };


        let successCallback = ( data ) => {
            
            if( finishHandler !== undefined ){
                finishHandler();
            };

            if( data.ok ){
                this.setState({
                    description: data.description
                });
                // console.log('успех');
                // console.dir(data);

            }else{
                console.log('что-то не так');
                console.dir(data);
            };

        };

        let errorCallback = () => {
            console.log('Ошибка в send_description_to_server');
        };

        send_to_server({
            href,
            action,
            data,
            successCallback,
            errorCallback,
        });

    }

    componentDidMount(){
        let selector = `.${ CLASS_NAME.DESCRIPTION_AND_STAT_INFO } textarea`;
        change_textarea_size( selector );

    }
   
   
    render(){
        return (
            <div className = { CLASS_NAME.DESCRIPTION_AND_STAT_INFO }>
                <textarea   
                        type = "textarea" 
                        className = { CLASS_NAME.DESCRIPTION }
                        value = { this.state.description } 
                        onChange = { this.setTextarea }
                />

                <div className = { CLASS_NAME.STATISTIC }>
                    <ul>
                        <li>Всего собрано:</li>
                        <li>Готовых к публикации:</li>
                    </ul>
                    <ul>
                        <li className = { CLASS_NAME.TOTAL_SUM_WORDS }>{ this.props.total_sum_words } сл</li>
                        <li className = { CLASS_NAME.READY_SUM_WORDS }>{ this.props.ready_sum_words } сл (из 250)</li>
                    </ul>
                </div>
            </div>
        )
    }
};



