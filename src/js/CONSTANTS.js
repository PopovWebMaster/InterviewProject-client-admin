import { HOME }         from './falseMassages/HOME.js';
import { PROJECTS }     from './falseMassages/PROJECTS.js';
import { PROJECT }      from './falseMassages/PROJECT.js';
import { ANALYSIS }     from './falseMassages/ANALYSIS.js';
import { DICTIONARY }   from './falseMassages/DICTIONARY.js';
import { DICTIONARIES } from './falseMassages/DICTIONARIES.js';
import { ANTICIPATION } from './falseMassages/ANTICIPATION.js';
import { SETTING }      from './falseMassages/SETTING.js';
import { ARTICLES }     from './falseMassages/ARTICLES.js';
import { ARTICLE }      from './falseMassages/ARTICLE.js';
import { ADD_ARTICLE }  from './falseMassages/ADD_ARTICLE.js';
import { ADVERTISING }  from './falseMassages/ADVERTISING.js';

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const PAGE = {
    HOME:           { name: 'HOME',             id: 'home',         img: '/assets/img/icons/home-2.png',        title: 'Главная'        },
	PROJECTS:       { name: 'PROJECTS',         id: 'projects',     img: '/assets/img/icons/project-4.png',     title: 'Мои проекты'    },
    PROJECT:        { name: 'PROJECT',          id: 'project',      img: '/assets/img/icons/project-4.png',     title: 'Имя проекта'    },
    ANALYSIS:       { name: 'ANALYSIS',         id: 'analysis',     img: '/assets/img/icons/analiz-4.png',      title: 'Анализ'         },
    DICTIONARY:     { name: 'DICTIONARY',       id: 'dictionary',   img: '/assets/img/icons/dictionary-3.png',  title: 'Имя словаря'    },
    DICTIONARIES:   { name: 'DICTIONARIES',     id: 'dictionaries', img: '/assets/img/icons/dictionary-3.png',  title: 'Словари'        },
    ANTICIPATION:   { name: 'ANTICIPATION',     id: 'anticipation', img: '',                                    title: ''               },
    SETTING:        { name: 'SETTING',          id: 'setting',      img: '/assets/img/icons/settings-2.png',    title: 'Настройки сайта'},
    ARTICLES:       { name: 'ARTICLES',         id: 'articles',     img: '/assets/img/icons/settings-2.png',    title: 'Статьи'         },
    ARTICLE:        { name: 'ARTICLE',          id: 'article',      img: '/assets/img/icons/settings-2.png',    title: 'Имя статьи'     },
    ADD_ARTICLE:    { name: 'ADD_ARTICLE',      id: 'addArticle',   img: '/assets/img/icons/project-1.png',     title: 'Добавить статью'},
    ADVERTISING:    { name: 'ADVERTISING',      id: 'advertising',  img: '',                                    title: ''               },

    CURRENT_PAGE(){
        if( IS_DEVELOPMENT ){
            return this.PROJECT; // <- НАСТРОЙКИ МЕНЯТЬ ЗДЕСЬ !!!!!!!!!!!!!!!!!!!!!!!!!
        }else{
            return { name: '', id: '', img: '', title: '' };
        };
    },

    CURRENT_ID(){
        if( IS_DEVELOPMENT ){
            return this.CURRENT_PAGE().id
        }else{
            return '';
        };
    },

    falseMassage(){
        if( !IS_DEVELOPMENT ){
            return {};
        };
        let obj;
        switch( this.CURRENT_PAGE().name ){
            case this.HOME.name :
                obj = HOME();
                break;
            case this.PROJECTS.name :
                obj = PROJECTS();
                break;
            case this.PROJECT.name :
                obj = PROJECT();
                break;
            case this.ANALYSIS.name :
                obj = ANALYSIS();
                break;
            case this.DICTIONARY.name :
                obj = DICTIONARY();
                break;
            case this.DICTIONARIES.name :
                obj = DICTIONARIES();
                break;
            case this.ANTICIPATION.name :
                obj = ANTICIPATION();
                break;
            case this.SETTING.name : 
                obj = SETTING();
                break;
            case this.ARTICLES.name :
                obj = ARTICLES();
                break;
            case this.ARTICLE.name :
                obj = ARTICLE();
                break;
            case this.ADD_ARTICLE.name :
                obj = ADD_ARTICLE();
                break;
            case this.ADVERTISING.name :
                obj = ADVERTISING();
                break;
        };
        return obj;
    },

    FALSE_MASSAGE_FROM_JSON(){
        if( IS_DEVELOPMENT ){
            return {
                currentPage: this.CURRENT_PAGE().name,
                ...this.falseMassage()
            }
        }else{
            return {};
        };
    },

};

export const GLOBAL = {
    IS_DEVELOPMENT,
    CURRENT_PAGE: PAGE.CURRENT_PAGE(),
    FALSE_MASSAGE: PAGE.FALSE_MASSAGE_FROM_JSON() ,
    ID: PAGE.CURRENT_ID(),
};