// import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './index.scss';

import { CLASS_NAME, TAB_NAME, STARTING_TAB } from './../config.js';


import ProjectNavPanel  from './../ProjectNavPanel';
// import List             from './Tabs/List';
// import InsertText       from './Tabs/InsertText';
// import InsertAudio      from './Tabs/InsertAudio';
import TabsPanel        from './TabsPanel';

export default class ProjectEditPanel extends Component {
    constructor(props){
        super(props);

        this.state = {

            activeTabName: STARTING_TAB,
        };

        this.setActiveTab = this.setActiveTab.bind(this);

       
    }

    setActiveTab( tabName ){

        this.setState({
            activeTabName: tabName
        });
    }



   
    render(){
        return (
            <div className = { CLASS_NAME.EDIT_PANEL }>

                <ProjectNavPanel
                    activeTabName = { this.state.activeTabName }
                    setActiveTab =  { this.setActiveTab }
                
                />

                <TabsPanel  
                    activeTabName = { this.state.activeTabName }
                    href_for_post = { this.props.href_for_post }
                    action_list =   { this.props.action_list }
                />

               

            </div>

        )
    }
};



