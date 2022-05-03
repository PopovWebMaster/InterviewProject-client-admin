export const validator_name_of_new_project = function( val = undefined, arrListNames = [] ){
    let res = {
        isErr: false,
        massage: '',
        value: val
    };
    
    if( val === undefined ){
        res.isErr = true;
        res.massage = 'Ошибка! В функцию validator_name_of_new_project не передано значение для валидации';
        res.value = val;
        return res;
    };

    let value = String(val);
    value = value.trim();

    if( value === '' ){
        res.isErr = true;
        res.massage = 'Ошибка! Имя нового проекта не может быть пустой строкой';
    }else{
        let strIsVal = /^[_a-zA-Z0-9абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ \.\-\+\?,:;_!]+$/.test( value );
        if( !strIsVal){
            res.isErr = true;
            res.massage = 'Ошибка! В имени нового проекта присутствуют запрещённые символы. Можно использовать только кирилические и латинские символы, цифры, а также знаки -+!?_:;.,';
        }else{
            let list = arrListNames;
            let isRepeat = false;
            for( let i = 0; i < list.length; i++ ){
                let newVal = value.toLowerCase();
                let newName = list[i].name.toLowerCase();
                if( newVal === newName ){
                    isRepeat = true;
                    break;
                };
            };
            if( isRepeat ){
                res.isErr = true;
                res.massage = 'Ошибка! Проект с таким именем уже существует, выберите другое имя для проекта'
            };
        };
    };
    res.value = value;
    
    return res;
};