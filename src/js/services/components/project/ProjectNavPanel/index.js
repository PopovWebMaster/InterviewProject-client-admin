// import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './index.scss';

import { TAB_NAME, STARTING_TAB } from './../config.js';



export default class ProjectNavPanel extends Component {
    constructor(props){
        super(props);

        this.state = {};

       
    }

   
    render(){
        return (
            <div className = "projectNavPanel">

                <div // listProject' 
                    className = { this.props.activeTabName === TAB_NAME.LIST? 'active': ''} 
                    onClick = { () => {
                        this.props.setActiveTab( TAB_NAME.LIST );
                    }}
                >
                    Список
                </div>

                <div //insertTextProject'
                    className = { this.props.activeTabName === TAB_NAME.INSERT_TEXT? 'active': ''} 
                    onClick = { () => {
                        this.props.setActiveTab( TAB_NAME.INSERT_TEXT );
                    }}
                >
                    Вставить текст
                </div>

                <div // 'addAudioProject' 
                    className = { this.props.activeTabName === TAB_NAME.ADD_AUDIO? 'active': ''}
                    onClick = { () => {
                        this.props.setActiveTab( TAB_NAME.ADD_AUDIO );
                    }}
                >
                    Добавить аудио
                </div>

            </div>

        )
    }
};



