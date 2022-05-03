// import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
// import { Component } from 'react';
import './index.scss';

// import { CLASS_NAME, TAB_NAME, STARTING_TAB } from './../config.js';
import MainTab from './../MainTab.js'


export default class InsertText extends MainTab {
    constructor(props){
        super(props);

        this.state = {
            words: {},
        };

    }
    
    // componentDidMount(){


    // }


    render(){

        return (

            <div>
                    InsertText

            </div>

        )
    }
};



