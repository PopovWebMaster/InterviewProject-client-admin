
export const validator_setting_site_name = function( str = undefined ){
    let res = {
        isErr: false,
        massage: '',
        value: ''
    }
    if( str === undefined ){
        res.isErr = true;
        res.massage = 'Не передано значение, нечего валидировать';
        res.value = str;
    }else{
        let value = str.trim();
        if( value === '' ){
            res.isErr = true;
            res.massage = 'Данное поле обязательно к заполнению';
        }else{
            let isMaxChars = /^.{1,250}$/.test( value );
            if( !isMaxChars ){
                res.isErr = true;
                res.massage = 'Максимальное чсило символов 250';
            }else{
                let isValidChars = /^[0-9a-zA-ZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ \.\-\?\',:;!]+$/.test( value );
                if( !isValidChars ){
                    res.isErr = true;
                    res.massage = 'Можно использовать только кирилические и латинские символы, цифры, а также символы .,?!-:;';
                }else{
                    res.isErr = false;
                    res.massage = '';
                };
            };
        };
        res.value = value;
    };
    return res;
};

export const validate_str = function( val, isErr ){
    let res = {
        ok: true,
        value: val.trim()
    };
    if( isErr ){ // ошибка есть
        res.ok = false;
    };
    let valid_chars = validator_setting_site_name( res.value );
    if( valid_chars.isErr ){ // ошибка есть
        res.ok = false;
    };
    res.value = valid_chars.value;
    return res;
};

export const validate_num = function( Str ){
    let res = {};
    res.ok = undefined;
    res.value = undefined; 
    let str = Str;
    let num = Number( str );
    if( num === 0 ){
        res.ok = false;
        res.value = str
        return res;
    };
    if( isNaN( num ) ){
        res.ok = false;
        res.value = str
    }else{
        if( isInteger( num ) ){
            res.ok = true;
        }else{
            res.ok = false;
        };
        res.value = num;
    };

    function isInteger( num ) {
        return (num ^ 0) === num;
    };
    return res;
};














