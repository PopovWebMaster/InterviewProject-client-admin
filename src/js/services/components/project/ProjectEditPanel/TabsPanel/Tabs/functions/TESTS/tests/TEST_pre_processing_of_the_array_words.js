import { pre_processing_of_the_array_words } from './../../pre_processing_of_the_array_words.js';

const testArr = [
    [],
    undefined,
    {},
    [{enW: 'russkiy', ruW: 'русский'}],
    null,
    true,
    false,
    'stroshka',
    100,
    () => { return [];},

];

export const TEST_pre_processing_of_the_array_words = () => { // использовать только при тестах

    console.log('');
    console.log('Начало TEST_pre_processing_of_the_array_words');
    for( let i = 0; i < testArr.length; i++ ){

        let item = testArr[i];

        console.log('i', i );
        console.dir( item );

        let result = pre_processing_of_the_array_words( item );

        console.dir( 'result' );
        console.dir( result );

    };
    console.log('Конец TEST_pre_processing_of_the_array_words');
    console.log('');

};