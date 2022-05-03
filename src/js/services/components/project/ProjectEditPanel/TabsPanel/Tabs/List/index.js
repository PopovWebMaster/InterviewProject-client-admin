import React from 'react';
//import ReactDOM from 'react-dom';
// import { Component } from 'react';
import './index.scss';

// import { CLASS_NAME, TAB_NAME, STARTING_TAB } from './../config.js';
import MainTab from './../MainTab.js'

import Table from './Table';

export default class List extends MainTab {
    constructor(props){
        super(props);

        this.state = {
            words: {},
        };
        /*
            this.props.href_for_post 
            this.props.action_list 
        */

        this.createListTable = this.createListTable.bind(this);
        this.updates_the_array_of_words_on_the_server = this.updates_the_array_of_words_on_the_server.bind(this);
        this.set_item_of_words_to_array_of_words = this.set_item_of_words_to_array_of_words.bind(this);

    }
    
    updates_the_array_of_words_on_the_server( params ){
        let index = params.index;
        let ruW =   params.ruW;
        let enW =   params.enW;

    }

    set_item_of_words_to_array_of_words( params ){
        let index = params.index;
        let ruW =   params.ruW;
        let enW =   params.enW;

    }

    createListTable( params ){

        let words = this.pre_processing_of_the_array_words( params.words );

        return (
            <Table 
                words = { words }
                set_item_of_words_to_array_of_words = { this.set_item_of_words_to_array_of_words }
            />
        )

    }


    render(){

        return (
            <div className = 'projectTabList'>
                { 
                    this.createListTable({
                        words: this.state.words,
                    })
                }
            </div>

        )
    }
};



