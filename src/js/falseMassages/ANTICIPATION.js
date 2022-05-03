import { IS_DEVELOPMENT } from './../CONSTANTS.js';

export const ANTICIPATION = function(){

    if( !IS_DEVELOPMENT ){
        return {};
    };
    
    return {
        // Содержимое здесь
    };

};