// import { INPUT_TYPE } from './../../config.js';
// import { isset } from './../../../components/functions/isset.js';

import { INPUT_TYPE } from './../config.js';
import { isset } from './../../components/functions/isset.js';


export const determine_the_type_of_input = ( params ) => {

    let interval = params.interval;

    let typeOfInput = '';

    if( interval !== undefined || interval !== null || interval !== false ){
        if( interval === '' || ( Array.isArray( interval ) && interval.length === 0 ) ){
            typeOfInput = INPUT_TYPE.TEXT;

        }else{
            if( Array.isArray( interval ) ){

                let isNubbers = false;
                let isStrings = false;

                for( let i = 0; i < interval.length; i++ ){
                    if( typeof interval[i] === 'string' ){
                        isStrings = true;
                    }else if( typeof interval[i] === 'number' ){
                        isNubbers = true;
                    };
                };

                if( isNubbers && !isStrings ){ // только числа в массиве
                    typeOfInput = INPUT_TYPE.NUMBER_LIST;
                }else{
                    if( isNubbers && isStrings ){ // и числа и строки 
                        typeOfInput = INPUT_TYPE.RADIO_LIST_SWITCH;

                    }else{
                        if( !isNubbers && isStrings ){ // только строки в массиве

                            let index_0 = isset( interval[0] )? interval[0]: '';
                            let index_1 = isset( interval[1] )? interval[1]: '';

                            let index_0_isBoolean = index_0 === 'true' || index_0 === 'false';
                            let index_1_isBoolean = index_1 === 'true' || index_1 === 'false';

                            if( index_0_isBoolean && index_1_isBoolean && interval.length === 2 ){
                                typeOfInput = INPUT_TYPE.SWITCH;

                            }else{
                                typeOfInput = INPUT_TYPE.RADIO_LIST_SWITCH;

                            };

                        }else{
                            
                            if( !isNubbers && !isStrings ){ // и не числа и не строки, хрен его знает что там
                                // правил для такого нет
                            };
                            
                        };
                    };
                };
            }else{
                /*
                    Новые правила записывать сюда
                */
            };
        };
    };

    return typeOfInput;

};