//import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
// import "babel-polyfill";
//import { GLOBAL } from './../CONSTANTS.js';
import ButtonWithInputGreen from './components/independent/ButtonWithInputGreen/ButtonWithInputGreen.js'; 
import ListDictionaries from './components/dictionaries/listDictionaries/ListDictionaries.js'; 

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            arrListDictionaries: this.props.massage.listDictionaries
        };

        this.getListNames = this.getListNames.bind(this);
        this.setNewList = this.setNewList.bind(this);

    }

    getListNames(){
        if( this.props.massage.listDictionaries === undefined ){
            return [];
        };
        let arr = this.props.massage.listDictionaries;
        let listNames = [];
        for( let i = 0; i < arr.length; i++){
            listNames.push( arr[i].name );
        };
        return listNames;
    }

    setNewList( newList ){
        this.setState({
            arrListDictionaries: newList
        });
    }

    render(){
		return (
            <>
                <ButtonWithInputGreen 
                    list_of_existing_names = { this.getListNames() }
                    href_for_post = { this.props.massage.href_for_post }
                    setNewList = { this.setNewList }   
                    action = 'createDictionary'
                    plaseholder = 'Имя будущего словаря'  
                    nameButton = 'Создать словарь'  
                />
                <ListDictionaries 
                    arrListDictionaries = { this.state.arrListDictionaries }
                    sum_dictionaries_in_one_level = { this.props.massage.sum_dictionaries_in_one_level }
                
                />
            </>
		)
	}


};

