import { IS_DEVELOPMENT } from './../CONSTANTS.js';

export const HOME = function(){

    if( !IS_DEVELOPMENT ){
        return {};
    };
    
    return {
        // Содержимое здесь
    };

};