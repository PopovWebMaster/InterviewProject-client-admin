import { IS_DEVELOPMENT } from './../CONSTANTS.js';

export const SETTING = function(){

    if( !IS_DEVELOPMENT ){
        return {};
    };
    
    return {
        //currentPage: page.SETTING, 
        arrListSettings: {
            site_name_part_1: {
                value: "От ноля до 10 000",
                description: "Название сайта (1 часть)",
                interval: ''
            },
            site_name_part_2: {
                value: "english words",
                description: "Название сайта (2 часть)",
                interval: ''
            },
            sum_dictionaries_in_one_level: {
                value: "4",
                description: "Сумма словарей в одном уровне",
                interval: [ 2, 10 ]
            },
            scale_stars_for_one_dictionary: {
                value: "5",
                description: "Шкала звёзд для одного словаря",
                interval: [ 2, 10 ]
            },
            passing_score_from_100: {
                value: "95",
                description: "Сколько слов из 100 необходимо знать для прохождения на следующий уровень",
                interval: [ 1, 100 ]
            },

            sending_a_message_during_registration: {
                description: "Отправлять письмо для подтверждения адреса электронной почты ",
                interval: [ 'true', 'false', ], //  "true", "false" 
                value: "true"
            },

        },
        href_for_post: "http://en-v6/admin/workspace/setting",

        actions: {
            setNewSettings: 'setNewSettings',
        },

    };

};