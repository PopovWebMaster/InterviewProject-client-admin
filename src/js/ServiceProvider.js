import $ from "jquery";

import React from 'react';
import ReactDOM from 'react-dom';
//import { Component } from 'react';

// import "regenerator-runtime/runtime";
// import "core-js/stable"; // or a more selective import such as "core-js/es/array"
// import "babel-polyfill";

import { AddConteinerToMain } from './services/components/AddConteinerToMain.js';

import Home             from './services/home.js'; 
import Projects         from './services/projects.js'; 
import Project          from './services/project.js'; 
import Analysis         from './services/analysis.js'; 
import Dictionaries     from './services/dictionaries.js'; 
import Dictionary       from './services/dictionary.js'; 
import Anticipation     from './services/anticipation.js'; 

// import Setting          from './services/setting.js'; 
import Setting          from './services/setting/Setting.js'; 

import Articles         from './services/articles.js'; 
import Article          from './services/article.js'; 
import AddArticle       from './services/addArticle.js'; 
import Advertising      from './services/advertising.js';

import { GLOBAL, PAGE } from './CONSTANTS.js';

export default class ServiceProvider {
    //     Данный класс работает в двух режимах. В режиме development и production. Эти режимы выбираются автоматически
    // при сборке проекта в файле "./CONSTANTS.js"
    //     В режиме development он: 
    //         1 - узнайт какая страница должна быть подгружена. Это указано вручную в 
    //             файле "./CONSTANTS.js" в GLOBAL.CURRENT_PAGE
    //         2 - выбирает соответствующий данному названию React-class и подгружает его,
    //             передав в него GLOBAL.FALSE_MASSAGE - объект, предназначенный для разработки, имитирующий объект 
    //             переданный сервером
    //     В режиме production он: 
    //         1 - считывает переданный сервером json-объект и согласно его полю currentPage подгружает соответствующий
    //         React-class
    constructor(){
        this.massage;

        this.addConteinerToMain = this.addConteinerToMain.bind(this);
        this.getMassage = this.getMassage.bind(this);
        this.connectServices = this.connectServices.bind(this);
        this.renderActualComponent = this.renderActualComponent.bind(this);

        this.addConteinerToMain(); 
        this.getMassage();
        this.connectServices();
    }

    addConteinerToMain(){
        if( GLOBAL.IS_DEVELOPMENT ){
            AddConteinerToMain();
        }else{
            return;
        };
    }

    getMassage(){
        if( $('#jsonMassage').length !== 0 ){
            this.massage = JSON.parse( $('#jsonMassage').text() );
        }else{
            this.massage = { currentPage: '' };
        };
        $('div#jsonMassage').remove();
    }

    renderActualComponent( App ){

        let massage = this.massage;
        let id = PAGE[ this.massage.currentPage].id;
        ReactDOM.render(
            <App massage = { GLOBAL.IS_DEVELOPMENT? GLOBAL.FALSE_MASSAGE: massage }/>,
            document.getElementById( id )
        );
    }

    connectServices(){
        let currentPage = this.massage.currentPage;
        switch ( currentPage ) {
            
            case PAGE.HOME.name:
                this.renderActualComponent( Home );
                break;

            case PAGE.PROJECTS.name:
                this.renderActualComponent( Projects );
                break;

            case PAGE.PROJECT.name:
                this.renderActualComponent( Project ); 
                break;

            case PAGE.ANALYSIS.name:
                this.renderActualComponent( Analysis ); 
                break;

            case PAGE.DICTIONARIES.name:
                this.renderActualComponent( Dictionaries ); 
                break;

            case PAGE.DICTIONARY.name:
                this.renderActualComponent( Dictionary ); 
                break;

            case PAGE.ANTICIPATION.name:
                this.renderActualComponent( Anticipation ); 
                break;

            case PAGE.SETTING.name:
                this.renderActualComponent( Setting ); 
                break;

            case PAGE.ARTICLES.name:
                this.renderActualComponent( Articles ); 
                break;

            case PAGE.ARTICLE.name:
                this.renderActualComponent( Article ); 
                break;

            case PAGE.ADD_ARTICLE.name:
                this.renderActualComponent( AddArticle ); 
                break;

            case PAGE.ADVERTISING.name:
                this.renderActualComponent( Advertising ); 
                break;
   
        };
    }
    
};

let serviceProvider = new ServiceProvider();
