//import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
// import "babel-polyfill";

import NewProject       from './components/projects/NewProject.js'; 
import ListProjects     from './components/projects/ListProjects.js'; 

//import { GLOBAL } from './../CONSTANTS.js';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: this.props.massage.listProjects
        };
        this.setNewList = this.setNewList.bind(this);
    }
    setNewList( newList ){
        this.setState({
            list: newList
        });
    }

    render(){
		return (
            <>
                <NewProject 
                    list = { this.state.list }
                    href_for_post = { this.props.massage.href_for_post }
                    setNewList = { this.setNewList }
                />
                <ListProjects 
                    list = { this.state.list }
                    href_for_post = { this.props.massage.href_for_post }
                    setNewList = { this.setNewList }
                />
            </>
		)
	}
};
