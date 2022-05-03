import { IS_DEVELOPMENT } from './../CONSTANTS.js';

export const ADVERTISING = function(){

    if( !IS_DEVELOPMENT ){
        return {};
    };
    
    return {
        // Содержимое здесь
    };

};