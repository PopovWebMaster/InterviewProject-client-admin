import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';

import { GLOBAL } from './../CONSTANTS.js';

import {    validator_setting_site_name,
            validate_str,
            validate_num } from './components/functions/validator_setting_site_name';

import EditSiteNamePart1                from './components/settings/EditSiteNamePart1/EditSiteNamePart1.js'; 
import EditSiteNamePart2                from './components/settings/EditSiteNamePart2/EditSiteNamePart2.js'; 
import EditSumDictionariesInOneLevel    from './components/settings/EditSumDictionariesInOneLevel/EditSumDictionariesInOneLevel.js';
import EditScaleStarsForOneDictionary   from './components/settings/EditScaleStarsForOneDictionary/EditScaleStarsForOneDictionary.js';
import EditPassingScoreFrom100          from './components/settings/EditPassingScoreFrom100/EditPassingScoreFrom100.js';   
import ButtonsSaveCancel                from './components/settings/ButtonsSaveCancel/ButtonsSaveCancel.js';  
import SetDefaultSettings               from './components/settings/SetDefaultSettings/SetDefaultSettings.js';  

export default class App extends Component{
    constructor(props){
        super(props);

        this.initialState = {
            isChenged: false,

            site_name_part_1_val: this.props.massage.arrListSettings.site_name_part_1.value,
            site_name_part_1_err: {
                isErr: false,
                massage: ''
            },

            site_name_part_2_val: this.props.massage.arrListSettings.site_name_part_2.value,
            site_name_part_2_err: {
                isErr: false,
                massage: ''
            },

            sum_dictionaries_in_one_level: this.props.massage.arrListSettings.sum_dictionaries_in_one_level.value,
            scale_stars_for_one_dictionary: this.props.massage.arrListSettings.scale_stars_for_one_dictionary.value,
            passing_score_from_100: this.props.massage.arrListSettings.passing_score_from_100.value,


            sending_a_message_during_registration: this.props.massage.arrListSettings.sending_a_message_during_registration.value,

        };

        this.state = this.initialState; 

        this.setIsChenged = this.setIsChenged.bind(this);

        this.set_site_name_part_1_val = this.set_site_name_part_1_val.bind(this);
        this.set_site_name_part_2_val = this.set_site_name_part_2_val.bind(this);
        this.set_sum_dictionaries_in_one_level = this.set_sum_dictionaries_in_one_level.bind(this);
        this.set_scale_stars_for_one_dictionary = this.set_scale_stars_for_one_dictionary.bind(this);
        this.set_passing_score_from_100 = this.set_passing_score_from_100.bind(this);

        this.sendToServer = this.sendToServer.bind(this);
        this.cancel = this.cancel.bind(this);
        this.getParamsFromSendToServer = this.getParamsFromSendToServer.bind(this);

        console.dir( this.props.massage );

    }
    
    setIsChenged( flag ){
        this.setState({
            isChenged: flag
        });
    }

    getParamsFromSendToServer(){
        let params = {};
        let obj = {
            site_name_part_1: validate_str( this.state.site_name_part_1_val, this.state.site_name_part_1_err.isErr ),
            site_name_part_2: validate_str( this.state.site_name_part_2_val, this.state.site_name_part_2_err.isErr ),
            sum_dictionaries_in_one_level: validate_num( this.state.sum_dictionaries_in_one_level ),
            scale_stars_for_one_dictionary: validate_num( this.state.scale_stars_for_one_dictionary ),
            passing_score_from_100: validate_num( this.state.passing_score_from_100 ),
            sending_a_message_during_registration:  {
                ok: true,
                value: this.state.sending_a_message_during_registration,
            },
        };

        let isVadid = true;
        for( let key in obj ){
            if( obj[key].ok ){
                params[key] = obj[key].value
            }else{
                isVadid = false;
                break;
            };
        };
        let res = { ok: undefined, params: {} };
        if( isVadid ){
            res.ok = true;
            res.params = params;
        }else{
            res.ok = false;
        };
        return res;
    }

    sendToServer(){
        let result = this.getParamsFromSendToServer();

        if( result.ok ){

            if( GLOBAL.IS_DEVELOPMENT ){
                console.log('Это отправляем на сервер');
                console.dir( result.params );
                console.log('');
            }else{
                $.ajax({
                    url: this.props.massage.href_for_post,
                    type: "POST",
                    data: {
                        params: result.params,
                        action: 'setNewSettings',
                        _token: $('meta[name="csrf-token"]').attr('content')
                    },
                    success: ( data ) => {
                        if( data.ok ){
                            console.dir( data );
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
        };
        return;
    }

    cancel(){
        this.setState(this.initialState);
    }

    set_site_name_part_1_val( val ){
        let res = validator_setting_site_name(val);
        this.setState({
            site_name_part_1_val: res.value,
            site_name_part_1_err: {
                isErr: res.isErr,
                massage: res.massage
            },
        });
        this.setIsChenged( true );
    }

    set_site_name_part_2_val( val ){
        let res = validator_setting_site_name(val);
        this.setState({
            site_name_part_2_val: res.value,
            site_name_part_2_err: {
                isErr: res.isErr,
                massage: res.massage
            },
        });
        this.setIsChenged( true );
    }

    set_sum_dictionaries_in_one_level( sum ){
        this.setState({
            sum_dictionaries_in_one_level: sum
        });
        this.setIsChenged( true );
    }

    set_scale_stars_for_one_dictionary(sum){
        this.setState({
            scale_stars_for_one_dictionary: sum
        });
        this.setIsChenged( true );
    }

    set_passing_score_from_100( sum ){
        this.setState({
            passing_score_from_100: sum
        });
        this.setIsChenged( true );
    }

    render(){
		return (
            <div id = 'settings_admin'>
                <EditSiteNamePart1 
                    value = { this.state.site_name_part_1_val }
                    error = { this.state.site_name_part_1_err }
                    description = { this.props.massage.arrListSettings.site_name_part_1.description }
                    set_site_name_part_1_val = { this.set_site_name_part_1_val }
                    isChenged = { this.state.isChenged }
                />
                <EditSiteNamePart2 
                    value = { this.state.site_name_part_2_val }
                    error = { this.state.site_name_part_2_err }
                    description = { this.props.massage.arrListSettings.site_name_part_2.description }
                    set_site_name_part_2_val = { this.set_site_name_part_2_val }
                    isChenged = { this.state.isChenged }
                />

                <EditSumDictionariesInOneLevel 
                    value = { this.state.sum_dictionaries_in_one_level }
                    description = { this.props.massage.arrListSettings.sum_dictionaries_in_one_level.description }
                    interval = { this.props.massage.arrListSettings.sum_dictionaries_in_one_level.interval  }
                    set_sum_dictionaries_in_one_level = { this.set_sum_dictionaries_in_one_level }
                />

                <EditScaleStarsForOneDictionary 
                    value = { this.state.scale_stars_for_one_dictionary }
                    description = { this.props.massage.arrListSettings.scale_stars_for_one_dictionary.description }
                    interval = { this.props.massage.arrListSettings.scale_stars_for_one_dictionary.interval  }
                    set_scale_stars_for_one_dictionary = { this.set_scale_stars_for_one_dictionary }
                />

                <EditPassingScoreFrom100
                    value =         { this.state.passing_score_from_100 }
                    description =   { this.props.massage.arrListSettings.passing_score_from_100.description }
                    interval =      { this.props.massage.arrListSettings.passing_score_from_100.interval }
                    set_passing_score_from_100 = { this.set_passing_score_from_100 }
                />












                <ButtonsSaveCancel 
                    isChenged = { this.state.isChenged }
                    sendToServer = { this.sendToServer }
                    cancel = { this.cancel }
                />

                <SetDefaultSettings
                    href_for_post = { this.props.massage.href_for_post }
                />



            </div>
        );
    }

};
