import { IS_DEVELOPMENT } from './../CONSTANTS.js';

export const PROJECTS = function(){

    if( !IS_DEVELOPMENT ){
        return {};
    };
    
    return {
        listProjects: [
            {
                name: "Мой первый проект",
                author: "sasha",
                date: {
                    date: "2019-09-20 11:05:00.000000", 
                    timezone_type: 3, 
                    timezone: "UTC"
                },
                status: 0,
                id_project: 1,
                href: "http://en-v6/admin/workspace/project/1"
            },
            {
                name: "second project",
                author: "anna",
                date: {
                    date: "2019-09-20 11:12:00.000000",
                    timezone: "UTC",
                    timezone_type: 3
                },
                status: 1,
                id_project: 2,
                href: "http://en-v6/admin/workspace/project/2"
            }
        ],
        href_for_post: "http://en-v6/admin/workspace/projects"
    };

};