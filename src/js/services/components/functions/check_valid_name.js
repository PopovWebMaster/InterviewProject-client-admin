import $ from "jquery";


export const check_valid_name = function( newName, listNames, oldName = undefined ){

    if( newName === undefined || listNames === undefined ){
        console.log( 'ОШИБКА! Не правильное использование функции check_valid_name()' );
        return { // ошибка
            isErr: true,
            massage: 'Неверно переданы аргументы в check_valid_name()'
        };
    };

    if( typeof newName  !== "string" ){
        console.log( 'ОШИБКА! Не правильное использование функции check_valid_name(). newName должна быть строкой' );
        return { // ошибка
            isErr: true,
            massage: 'Неверно переданы аргументы в check_valid_name()'
        };
    };
    if( typeof oldName  !== "string" && oldName !== undefined ){
        console.log( 'ОШИБКА! Не правильное использование функции check_valid_name(). oldName должна быть строкой' );
        return { // ошибка
            isErr: true,
            massage: 'Неверно переданы аргументы в check_valid_name()'
        };
    };
    if( typeof listNames  !== "object" ){
        console.log( 'ОШИБКА! Не правильное использование функции check_valid_name(). listNames должен быть массивом' );
        return { // ошибка
            isErr: true,
            massage: 'Неверно переданы аргументы в check_valid_name()'
        };
    };

    let newname = $.trim( newName );
    newname = newname.toLowerCase();
    let oldname;
    if( oldName === undefined ){
        oldname = '';
    }else{
        oldname = oldName.toLowerCase();
    };

    if( newname === oldname ){
        return {// нет ошибки
            isErr: false,
            massage: 'ничего делать не нужно'
        };
    };

    if( newname === ''){
        return {// ошибка
            isErr: true,
            massage: 'Имя словаря обязательно для заполнения (не может быть пустой строкой)'
        };
    };

    if( newname.length > 250 ){
        return{// ошибка
            isErr: true,
            massage: 'Слишком длинное имя, оно не должно содержать больше 250 символов'
        };
    };

    let val_ch = /^[0-9a-zA-ZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ \.\-\?\',:;!]{1,250}$/.test( newname );
    if( !val_ch ){
        return{// ошибка
            isErr: true,
            massage: 'Данное имя содержит запрещённые символы. Имя может состоять только из латинских и кирилических символов, цифр, а также символов .,-?!:;'
        };
    };


    let nameIsUniq = true;
    for( let listName of listNames ){
        if( listName.toLowerCase() === newname ){
            nameIsUniq = false;
            break;
        };
    };
    if( !nameIsUniq ){
        return{// ошибка
            isErr: true,
            massage: 'Данное имя не уникально, уже существует словарь с таким именем'
        };
    };

    return{// ошибка
        isErr: false,
        massage: ''
    };

};