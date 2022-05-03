// import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
// import { GLOBAL} from './../CONSTANTS.js';
import './index.scss';

import { CLASS_NAME } from './config.js';


export default class ProjectTopInfoPanel extends Component {
    constructor(props){
        super(props);
        this.state = {};

        this.getDate = this.getDate.bind(this);
        
    }

    getDate(){
        let date = new Date( this.props.created_at );
        let options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        return date.toLocaleString( "ru", options );
    }

    
   
    render(){
        return (
            <div className = { CLASS_NAME.PROJECT_TOP_INFO_PANEL }>
                <span>{ this.props.author }</span>
                <span>{ this.getDate() }</span>
                <span>{ this.props.projectStatus === 0? 'Не опубликован': 'Опубликован' }</span>
            </div>
        )
    }
};



