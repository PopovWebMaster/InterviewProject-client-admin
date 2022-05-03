import { action_for_development } from '@generalFunction/action_for_development.js';
import { isset } from '@generalFunction/isset.js';

export const pre_processing_of_the_array_words = ( arr ) => {
    /*
        Проверяет массив на пригодность для использования в arr.map.
        Нужен для того чтоб всегда возвращать массив.
        Если что то возвращает пустой массив и предупреждение в консоль.
        
        PHP-сервер пустой массив может вернуть как пустой объект,
        также первый рендер может подхватить еще не существующий массив words,
        ну и навсяк случай
    */

    let result;

    if( isset( arr ) ){

        if( Array.isArray( arr ) ){
            result = arr;
        }else{
            action_for_development( () => {
                console.log('в pre_processing_of_the_array_words передан не массив', arr );
            });
            result = [];
        };

    }else{
        // action_for_development( () => {
        //     console.log('Что-то странное передано в pre_processing_of_the_array_words', arr );
        // });
        result = [];
    };

    return result;
};

