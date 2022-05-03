import { IS_DEVELOPMENT } from './../CONSTANTS.js';

export const ADD_ARTICLE = function(){

    if( !IS_DEVELOPMENT ){
        return {};
    };
    
    return {
        arrListOfTitles: [
            "Добро пожаловать на сайт!",
            "Как учиться?",
            "Что важно?"
        ],
        arrListOfAliases: [
            'welcome',
            'how_to_learn',
            'important'
        ],
        href_for_post: 'http//ddd/dd/dd'
    };

};