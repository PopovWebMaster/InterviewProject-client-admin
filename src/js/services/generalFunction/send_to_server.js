import { isset } from './isset.js';
import $ from "jquery";

// import "regenerator-runtime/runtime";
// import "core-js/stable"; // or a more selective import such as "core-js/es/array"

/*

        send_to_server - отправляет данные на сервер и вызывает указанную функцию-обработчик после того,
    как получит ответ от сервера. Использует метод POST

        принимате в params: {
            href (обязательный) - путь на страничку сервера
            action (не обязательный) - строка, это команда серверу что сделать с данными
            data (не обязательный) - объект с данными 
            successCallback (не обязательный) - этот метод будет вызван в случае успеха. В него будут 
                переданы данные от сервера
            errorCallback (не обязательный) - этот метод будет вызван в случае неудачи
        }
    
        Все возможные ошибки выводит в консоль

*/

export const  send_to_server = ( params ) => {

    if( IS_DEVELOPMENT ){

        console.dir('Отправляем на сервер это');
        console.dir( params );

    }else{

        let validParams = validation( params );

        if( validParams.fail ){
            console.error('Операция отправки данных на сервер остановлена');
            console.dir( validParams.errors );
            return;
        };

        let href = validParams.href;

        let dataSend = {
            _token:             validParams.token,
            action:             validParams.action,
            data:               validParams.data,
            successCallback:    validParams.successCallback,
            errorCallback:      validParams.errorCallback,
        };

        // postData_fetch( href, dataSend );
        postData_jquery( href, dataSend );

    };

};


function validation( params ){

    let fail = false;
    let errors = [];

    let token;
    let href;
    let action;
    let data;
    let successCallback;
    let errorCallback;

    function setError( text ){
        fail = true;
        errors.push( text );
    };

    token = get_token();
    if( !isset( token ) ){
        let text = 'Проблемы с токеном';
        setError( text );
    };

    if( !isset( params.href ) ){
        let text = 'Не указан путь для отправки данных на сервер';
        setError( text );
        href = '';
    }else{
        href = params.href;
    };

    if( !isset( params.action ) ){
        action = '';
    }else{
        action = params.action;
    };

    if( !isset( params.data ) ){
        data = '';
    }else{
        data = params.data;
    };

    if( !isset( params.successCallback ) ){
        successCallback = () => {};
    }else{
        successCallback = params.successCallback;
    };

    if( !isset( params.errorCallback ) ){
        errorCallback = () => {};
    }else{
        errorCallback = params.errorCallback;
    };

    return {
        fail,
        errors,
        token,
        href,
        action,
        data,
        successCallback,
        errorCallback,
    };

};


function get_token(){

    let result = null;
    let meta = document.querySelector('meta[name="csrf-token"]');

    if( isset( meta ) ){
        result = meta.content;
    };
    return result;
};

// async function postData_fetch( href, dataSend ) {

//     try {
//         const response = await fetch( href, {
//             method: 'POST',  
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 _token: dataSend._token,
//                 action: dataSend.action,
//                 data:   dataSend.data,
//             }) 
//         });

//         if ( response.ok ) { 

//             let data = await response.json();
//             dataSend.successCallback( data );

//         }else{
//             dataSend.errorCallback();
//             console.error(`Ошибка HTTP: ${response.status}.` );

//         };

//     } catch (error) {
//         console.error( `Ошибка: ${error}. При попытке вызвать fetch` );

//     };

    
// };


function postData_jquery( href, dataSend ){

    $.ajax({
        url: href,
        type: "POST",
        data: {
            _token: dataSend._token,
            action: dataSend.action,
            data:   dataSend.data,
        },
        success: ( data ) => {
            dataSend.successCallback( data );
        },
        error: function ( msg ) {
            console.log( 'Ошибка, что-то при отправке на сервер не сработало');
            console.dir( msg );
            console.log( 'Отправляли это:' );
            console.dir( dataSend._token );
            console.dir( dataSend.action );
            console.dir( dataSend.data );
            console.dir( dataSend.href );
            
            dataSend.errorCallback();
 
        }
    });





};