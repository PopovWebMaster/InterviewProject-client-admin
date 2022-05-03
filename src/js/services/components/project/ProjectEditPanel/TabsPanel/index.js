// import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './index.scss';

// import { CLASS_NAME, TAB_NAME, STARTING_TAB } from './../config.js';
import { CLASS_NAME, TAB_NAME, STARTING_TAB } from './../../config.js';

import List             from './Tabs/List';
import InsertText       from './Tabs/InsertText';
import InsertAudio      from './Tabs/InsertAudio';


export default class TabsPanel extends Component {
    constructor(props){
        super(props);

        this.state = {
        };


        this.createWorkComponent = this.createWorkComponent.bind(this);

       
    }

    createWorkComponent( tabName ){
        if( tabName === TAB_NAME.LIST ){ 
            return (
                <List  
                    href_for_post = { this.props.href_for_post }
                    action_list =   { this.props.action_list }
                />
            );
        }else if( tabName === TAB_NAME.INSERT_TEXT ){ 
            return (
                <InsertText 
                    href_for_post = { this.props.href_for_post }
                    action_list =   { this.props.action_list }
                />
            );
        }else if( tabName === TAB_NAME.ADD_AUDIO ){
            return (
                <InsertAudio 
                    href_for_post = { this.props.href_for_post }
                    action_list =   { this.props.action_list }
                />
            );
        };

    }

   
    render(){
        return (

            <div id="workProject">
                { this.createWorkComponent( this.props.activeTabName ) }
            </div>

        )
    }
};



