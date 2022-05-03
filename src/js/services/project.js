import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';

import { CLASS_NAME, TAB_NAME, STARTING_TAB } from './components/project/config.js';

// import "babel-polyfill";



import { GLOBAL} from './../CONSTANTS.js';

import List from './components/project/List.js'; 
import InsertText from './components/project/InsertText.js'; 
import InsertAudio from './components/project/InsertAudio.js'; 

import {    getTotal,
            issetAudio,
            issetRepeat,
            getReady,
            sortArrWords } from './components/functions/project_helpers.js'; 


import ProjectTopInfoPanel from './components/project/ProjectTopInfoPanel';
import ProjectDescriptionAndStatInfo from './components/project/ProjectDescriptionAndStatInfo';
import ProjectNavPanel from './components/project/ProjectNavPanel';

import ProjectEditPanel from './components/project/ProjectEditPanel';


export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            idItemActive:   STARTING_TAB, // подлежит замене
            activeTabName:  STARTING_TAB, // подлежит удалению, используется в ProjectEditPanel





            arrListWords:   sortArrWords(this.props.massage.words), 
            arrListAudio:   this.props.massage.audioList,
            total:          getTotal( this.props.massage.words ),
            issetAudio:     issetAudio( this.props.massage.words, this.props.massage.audioList ), // под вопросом, возможно не нужна !!!!!!!!
            issetRepeat:    issetRepeat( this.props.massage.words ),
            ready:          getReady( this.props.massage.words, this.props.massage.audioList ),
            
        };

        this.sending_ajax = this.sending_ajax.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);


        this.createWorkComponent = this.createWorkComponent.bind(this);
        this.setArrListWords = this.setArrListWords.bind(this);

        console.dir( this.props.massage );
    }


    sending_ajax( action, newData, success_func ){ /// возможно устарела!!!!!!!!!!!!!
        if( GLOBAL.IS_DEVELOPMENT ){
            return;
        };
       
        let data = {
            action: action,
            _token: $('meta[name="csrf-token"]').attr('content'),
            ...newData
        };

        $.ajax({
            url: this.props.massage.href_for_post,
            type: "POST",
            data: data,
            success: ( data ) => {
                if( data.ok ){
                    success_func(data);
                }else{
                    console.dir( '' );
                };
            },
            error: function (msg) {
                console.log( 'error при отправке аяксом');
                //console.dir( msg );
            }
        });
    }

    // setItemActive( e ){ // подлежит замене, устарела
    //     this.setState({
    //         idItemActive: e.target.id
    //     });
    // }





    setActiveTab( tabName ){
        console.log( 'tabName', tabName );
        this.setState({
            activeTabName: tabName
        });
    }

    setArrListWords( newarr ){
        let words = newarr.words;

        let audioList;
        if( newarr.audioList !== undefined ){
            audioList = newarr.audioList;
        }else{
            audioList = this.state.arrListAudio;
        };

        this.setState({
            arrListWords: sortArrWords(words),
            arrListAudio: audioList,
            total: getTotal( words ),
            issetAudio: issetAudio( words, audioList ), // под вопросом, нужна ли !!!!!!!!!!!!!!!!
            issetRepeat: issetRepeat( words ),
            ready: getReady( words, audioList )
        });
    }

    createWorkComponent( tabName, arr ){
        if( tabName === TAB_NAME.LIST ){ 

            return (

                <List           massage = { this.props.massage }
                                arrListWords = { arr }
                                arrListAudio = { this.state.arrListAudio }
                                setArrListWords = { this.setArrListWords }
                                total = { this.state.total }
                                issetAudio = { this.state.issetAudio }
                                issetRepeat = { this.state.issetRepeat }
                                ready = { this.state.ready }
                />
            );

        }else if( tabName === TAB_NAME.INSERT_TEXT ){ 
            return (
                <InsertText     massage = { this.props.massage }
                                setArrListWords = { this.setArrListWords }
                                instruction = { this.props.massage.instruction }
                />
            );
        }else if( tabName === TAB_NAME.ADD_AUDIO ){
            return (
                <InsertAudio    massage = { this.props.massage }
                                setArrListWords = { this.setArrListWords }
                                arrListWords = { this.state.arrListWords }
                                arrListAudio = { this.state.arrListAudio }
                                href_for_audio_files = { this.props.massage.href_for_audio_files }
                                href_for_audio_file = { this.props.massage.href_for_audio_file }
                />
            );
        };

    }

    // componentDidMount(){
        
    // }

    render(){
		return ( 
            <div className = 'project'>


                <ProjectTopInfoPanel 
                    author =            { this.props.massage.author }
                    created_at =        { this.props.massage.created_at.date }
                    projectStatus =     { this.props.massage.status }
                />

                <ProjectDescriptionAndStatInfo  
                    description =       { this.props.massage.description }
                    total_sum_words =   { this.state.total }  
                    ready_sum_words =   { this.state.ready }
                    href_for_post =     { this.props.massage.href_for_post }
                />

                {/* <ProjectEditPanel 
                    href_for_post =     { this.props.massage.href_for_post }
                    action_list =       { this.props.massage.action }
                
                /> */}


                <div className="mainProject">

                    <ProjectNavPanel 
                        activeTabName = { this.state.activeTabName }
                        setActiveTab = { this.setActiveTab }
                    
                    />
                    <div id="workProject">
                        { this.createWorkComponent( this.state.activeTabName, this.state.arrListWords ) }
                    </div>

                </div>


            </div>
        );
	}
};

