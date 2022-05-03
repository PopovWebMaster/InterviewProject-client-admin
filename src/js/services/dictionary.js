import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
// import "babel-polyfill";

import { GLOBAL } from './../CONSTANTS.js';

import { check_valid_name } from './components/functions/check_valid_name.js';

import './components/dictionary/dictionary.scss';

import EditName             from './components/dictionary/EditName.js'; 
import EditQueue            from './components/dictionary/EditQueue.js'; 
import EditStatus           from './components/dictionary/EditStatus.js'; 
import EditProject          from './components/dictionary/EditProject.js'; 
import DeleteDictionary     from './components/dictionary/DeleteDictionary.js'; 
import ButtonsSaveCancel    from './components/dictionary/ButtonsSaveCancel.js'; 

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.massage.name, // строка
            queue: this.props.massage.queue, // null или число
            queueAction: false, // принимает только false (ничего не делать), 'insert' или 'replase'
            status: this.props.massage.status, // true или false
            projectName: this.props.massage.projectName, // null или строка
            projectId: this.props.massage.projectId, // null или число
            href_project: this.props.massage.href_project,  // null или строка
            arrListQueue: this.props.massage.arrListQueue, // []
            arrListNamesDictionaries: this.props.massage.arrListNamesDictionaries, // []
            arrListFreeProjects: this.props.massage.arrListFreeProjects, // []
            words: this.props.massage.words, // []

            isChenged: false, // было ли что-то изменено
            errName: {
                isErr: false,
                massage: ''
            },
            isOpenWords: false

        };

        this.setNewParams = this.setNewParams.bind(this);
        this.isProject = this.isProject.bind(this);
        this.showWords = this.showWords.bind(this);
        this.openProject = this.openProject.bind(this);
        this.setIsChenged = this.setIsChenged.bind(this);
        this.setName = this.setName.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.setQueue = this.setQueue.bind(this);
        this.setProject = this.setProject.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
        this.getParamsFromSendToServer = this.getParamsFromSendToServer.bind(this);
        this.createListWords = this.createListWords.bind(this);
        this.getSumWords = this.getSumWords.bind(this);


    }

    setNewParams( newMassage ){
        /*
            Предназначен для использования как запись того? что прислал сервер в ответ. 
            В функциях где отправляются запросы при помощи ajax

            newMassage - это только ответ сервера, аналог this.props.massage
        
        */
        this.setState({
            name: newMassage.name,
            queue: newMassage.queue,
            status: newMassage.status,
            projectName: newMassage.projectName,
            projectId: newMassage.projectId,
            href_project: newMassage.href_project,
            arrListQueue: newMassage.arrListQueue,
            arrListNamesDictionaries: newMassage.arrListNamesDictionaries,
            arrListFreeProjects: newMassage.arrListFreeProjects,
            words: newMassage.words,
        });

    }
    isProject(){
        let res = false;
        if( this.props.massage.projectId !== null ){ // проект есть
            res = true;
        };
        return res;
    }
    showWords(){
        if( this.isProject() ){
            this.setState({
                isOpenWords: !this.state.isOpenWords
            });
        };
    }
    openProject(){
        if( this.isProject() ){
            if( this.state.href_project !== null ){
                document.location.href = this.state.href_project;
            };
        };
    }
    setIsChenged( flag ){
        this.setState({
            isChenged: flag
        });
    }

    setName( name ){
        this.setIsChenged( true );
        this.setState({
            name: name
        });
    }

    setStatus( status ){
        this.setIsChenged( true );
        this.setState({
            status: status
        });
    }
    setQueue( newQueue, queueAction ){
        this.setIsChenged( true );
        if( this.props.massage.queue !== newQueue ){ 
            if( newQueue === null ){
                this.setState({
                    queue: null,
                    queueAction: false // <- здесь
                });
            }else{
                this.setState({
                    queue: newQueue,
                    queueAction: queueAction
                });
            };  
        }else{
            if( newQueue === null ){
                this.setState({
                    queue: null,
                    queueAction: false // <- здесь
                });
            }else{
                this.setState({
                    queue: newQueue,
                    queueAction: false // <- здесь
                });
            };  
        }; 
    }
    setProject( id, name ){
        this.setIsChenged( true );
        this.setState({
            projectId: id,
            projectName: name
        });
    }

    createListWords( arr ){
        if( arr === undefined || arr === null ){
            return '';
        }else if( typeof arr !== 'object' ){
            return '';
        };

        arr.sort(( a, b ) => a.enW > b.enW);

        let li = arr.map( (item, index ) => {
            return (
                <li key = { index }>
                    <span className = 'enW_list'>{ item.enW }</span>
                    <span className = 'ruW_list'>{ item.ruW }</span>
                </li>
            );
        });

        return (
            <ul>
                { li }
            </ul>
        );

    }

    getParamsFromSendToServer(){

        name = undefined;
        let newName = this.state.name;
        newName = $.trim( newName );
        let oldName = this.props.massage.name;
        let listNames = this.state.arrListNamesDictionaries;
        let resValid = check_valid_name( newName, listNames, oldName );
        this.setState({
            errName: {
                isErr: resValid.isErr,
                massage: resValid.massage
            }
        });
        if( !resValid.isErr ){
            name = newName;
        }else{
            return {
                ok: false,
                params: {}
            }
        };

        if( this.state.status ){ 
            if( this.state.queue === null ){
                return {
                    ok: true,
                    params: {
                        name: name,
                        status: true,
                        queue: 0,
                        queueAction: false,
                        projectId: this.state.projectId === null? 0: this.state.projectId
                    }
                };
            }else{
                return {
                    ok: true,
                    params: {
                        name: name,
                        status: true,
                        queue: this.state.queue,
                        queueAction: this.state.queueAction,
                        projectId: this.state.projectId === null? 0: this.state.projectId
                    }
                };
            };

        }else{ 
            return {
                ok: true,
                params: {
                    name: name,
                    status: false,
                    queue: 0,
                    queueAction: false,
                    projectId: this.state.projectId === null? 0: this.state.projectId
                }
            };
        }
    }

    getSumWords(){
        if( this.state.words !== null ){
            return this.state.words.length;
        }else{
            return 0;
        };
        
    }

    sendToServer(){

        let result = this.getParamsFromSendToServer();

        // Анимация тряски если не выбран проект при выбраном статусе true
        if( result.params.status === true && result.params.projectId === 0 ){
            $(".editProject_dic .editItem_dic").css('animation', 'bounce 0.3s ease-in');
            $(".editProject_dic .editItem_dic").css('animation-play-state', 'running');
            setTimeout( () => {
                let elem = $(".editProject_dic .editItem_dic");
                $(".editProject_dic .editItem_dic").remove();
                $(".editProject_dic").append( elem );
                $(".editProject_dic div").css('animation-play-state', 'paused');
            }, 300);
            return;
        };

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
                        action: 'setNewParamsOneDictionary',
                        _token: $('meta[name="csrf-token"]').attr('content')
                    },
                    success: ( data ) => {
                        if( data.ok ){
                            //console.dir(data);
                            document.location.href = data.href;
                        }else{
                            //console.dir(data);
                            console.dir('');
                        };
                    },
                    error: function (msg) {
                        console.log( 'error при отправке аякса');
                    } 
                });
            };
        };

    }
    

    render(){
		return (
            <div id = 'editDictionary'>
                <div className = 'edit_top_buts_dic'>
                    <span>{ this.getSumWords() }сл.</span>
                    <span   className = { this.isProject()? '': 'noactive' } 
                            onClick = { this.showWords }
                    >{ this.state.isOpenWords? 'Закрыть': 'Список' }</span>
                    <span   className = { this.isProject()? '': 'noactive' } 
                            onClick = { this.openProject }
                    >Проект</span>
                </div>
                { this.state.isOpenWords? 
                    (
                        <div  className = 'listWords'>

                            { this.createListWords( this.state.words ) }
                            
                        </div>
                    ): (
                        <>
                            <EditName 
                                name = { this.state.name }
                                setIsChenged = { this.setIsChenged }
                                setName = { this.setName }
                                errName = { this.state.errName }
                                listNames = { this.state.arrListNamesDictionaries }
                            />

                            <EditQueue 
                                status = { this.state.status }
                                oldStatus = { this.props.massage.status }
                                queue = { this.state.queue }
                                oldQueue = { this.props.massage.queue }
                                setQueue = { this.setQueue }
                                arrListQueue = { this.state.arrListQueue }

                            />
                            <EditStatus 
                                status = { this.state.status }
                                setStatus = { this.setStatus }
                            />
                            <EditProject 
                                status = { this.state.status }
                                projectName = { this.state.projectName }
                                projectId = { this.state.projectId }
                                oldProjectName = { this.props.massage.projectName }
                                oldProjectId = { this.props.massage.projectId }
                                setProject = { this.setProject }
                                arrListFreeProjects = { this.props.massage.arrListFreeProjects }
                            />
                            <ButtonsSaveCancel 
                                isChenged = { this.state.isChenged }
                                sendToServer = { this.sendToServer }
                            />
                            <DeleteDictionary 
                                href_for_post = { this.props.massage.href_for_post }
                                name_dictionary = { this.state.name }
                            />
                        </>
                    )}
                
            </div>
		)
	}


};
