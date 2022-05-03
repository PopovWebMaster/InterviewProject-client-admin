import { IS_DEVELOPMENT } from './../CONSTANTS.js';

export const DICTIONARIES = function(){

    if( !IS_DEVELOPMENT ){
        return {};
    };
    
    return {
        listDictionaries: [
            {
                name: "Мой первый проект",
                sumWords: 246,
                href: "http://en-v6/admin/workspace/dictionary/1",
                queue: 5,
                status: true
    
            },
            {
                name: "Словарь 2",
                sumWords: 252,
                href: "http://en-v6/admin/workspace/dictionary/2",
                queue: 2,
                status: true
            },
            {
                name: "Словарь 3",
                sumWords: 250,
                href: "http://en-v6/admin/workspace/dictionary/3",
                queue: 4,
                status: true
            },
            {
                name: "Словарь 4",
                sumWords: 248,
                href: "http://en-v6/admin/workspace/dictionary/4",
                queue: 1,
                status: true
            },
            {
                name: "Словарь 5",
                sumWords: 249,
                href: "http://en-v6/admin/workspace/dictionary/5",
                queue: 3,
                status: true
            },
            {
                name: "Словарь 6",
                sumWords: 249,
                href: "http://en-v6/admin/workspace/dictionary/5",
                status: false
            },
            {
                name: "Словарь 7",
                sumWords: 249,
                href: "http://en-v6/admin/workspace/dictionary/5",
                status: false
            },
        ],
        href_for_post: "http://en-v6/admin/workspace/dictionaries",
        sum_dictionaries_in_one_level: 4
    };

};