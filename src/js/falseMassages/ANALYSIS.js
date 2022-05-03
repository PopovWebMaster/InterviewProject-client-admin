import { IS_DEVELOPMENT } from './../CONSTANTS.js';

export const ANALYSIS = function(){

    if( !IS_DEVELOPMENT ){
        return {};
    };
    
    return {
        href_for_post: "http://en-v6/admin/workspace/analysis/",
        arrListFreeProjects: [
            {id: 16, name: "проект 2"},
            {id: 17, name: "проект 3"},
            {id: 18, name: "проект 4"},
            {id: 19, name: "проект 5"},
            {id: 20, name: "проект 6"},
            {id: 21, name: "проект 7"},
            {id: 22, name: "проект 8"},
            {id: 23, name: "проект 9"},
            {id: 24, name: "проект 10"},
            {id: 25, name: "проект 11"},
            {id: 26, name: "проект 12"}
        ],

        falseRespons: [
            {checked_enW: "words", exists: false, project: false, ruW: ""},
            {checked_enW: "analysis", exists: false, project: false, ruW: ""},
            {checked_enW: "also", exists: true, project: "Мой первый проект", ruW: "тоже"},
            {checked_enW: "five", exists: false, project: false, ruW: ""},
        ]
    };

};