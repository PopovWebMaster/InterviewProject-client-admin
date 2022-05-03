import $ from "jquery";


// предназначена обрабатывать один элемент массива (строку)
/*

    return {
        ok: false,
        result: str,
        error_massage: 'Или в английском слове присутствуют кирилические символы, или в русском слове есть латинские'
    }

    или 

    return {
        ok: true,
        result: {
            enW,
            num
        },
        error_massage: ''
    };

*/
export const separates_one_string_enW_from_ruW_and_enW_from_num = function( str ){ 
    /*
    
        Правила:
            - всегда английское слово в строке должно присутствовать в единственном значении. 
                Одно слово (или словосочетание, предложение). Можно: 'word' или 'litle word'. Нельзя 'litle, word'
            - точки можно использовать только как сокращения ("и т. д.")
            - одна строка - одна пара enW/ruW или enW/num
            - очерёдность enW/ruW или ruW/enW не имеет значения, также и с enW/num num/enW
            - нельзя использовать числа в русских ответах, приведёт к ошибке
    
    
    
    */
    
    let isset_enW = /[a-zA-Z]/.test( str );
    let isset_ruW = /[а-яёА-ЯЁ]/.test( str );
    let isset_num = /[0-9]/.test( str );

    let res = check_for_an_incorrect_combination( str );

    if( isset_enW && isset_ruW && !isset_num ){
        // в строке есть enW ruW и нет чисел

        if( !res.en_ru && !res.ru_en ){
            // пока ошибки нет
            // мешанины в первых символах слов нет

            return separate_enW_from_ruW( str );

        }else{

            return {
                ok: false,
                result: str,
                error_massage: 'Или в английском слове присутствуют кирилические символы, или в русском слове есть латинские'
            };

        };

    }else if( isset_enW && !isset_ruW && isset_num ){
        // в строке есть enW и есть числа, ruW - нет

        if( /[a-zA-Z][0-9]/.test( str ) ){
            // Ошибка
            return {
                ok: false,
                result: str,
                error_massage: 'Недопустимая форма записи, в английском слове присутствуют числовые символы'
            };
        }else{
            // пока без ошибок

            return separate_enW_from_num( str );

        };
    }else if( isset_enW && !isset_ruW && !isset_num ){
        // Ошибка
        // есть только английское слово и больше ничего
        return {
            ok: false,
            result: str,
            error_massage: 'Недопустимая форма записи, или русское слово написано латинскими символами'
        };

    }else if( !isset_enW && !isset_ruW ){
        // Ошибка
        // Слова на английском и на русском отсутствуют
        return {
            ok: false,
            result: str,
            error_massage: 'Недопустимая форма записи'
        };
    }else if( !isset_enW && isset_ruW && isset_num ){
        // Ошибка
        return {
            ok: false,
            result: str,
            error_massage: 'Отсутствует слово на английском языке, или английское слово написано кирилическими символами'
        }; 
    }else if( !isset_enW && isset_ruW ){
        return {
            ok: false,
            result: str,
            error_massage: 'Недопустимая форма записи, или английское слово написано кирилическими символами'
        };
    }else{
        return {
            ok: false,
            result: str,
            error_massage: 'Неопознанная ошибка'
        };
    };

 
    function check_for_an_incorrect_combination( str ){
        // проверяет, не стоят ли русские и анг символя рядом без пробелов

        let en_ru = /[a-zA-Z][а-яёА-ЯЁ]/.test( str ) || /[a-zA-Z]'[а-яёА-ЯЁ]/.test( str ); // здесь странность дикая
        let ru_en = /[а-яёА-ЯЁ][a-zA-Z]/.test( str ) ||  /[а-яёА-ЯЁ]'[a-zA-Z]/.test( str );// здесь странность дикая

        return {
            en_ru,
            ru_en
        };
    };


    function separate_enW_from_num( str ){

        let first_en;
        let last_en;
        let first_num; // first_ru
        let last_num; // last_ru

        let start_pos = false;
        for( let j = 0; j < str.length; j++){
            if( /[a-zA-Z]/.test( str[j] ) ){
                start_pos = j;
                break;
            }else if( /[0-9]/.test( str[j] ) ){
                start_pos = j;
                break;
            };
        };
        if( start_pos !== false ){

            if( /[a-zA-Z]/.test( str[start_pos] ) ){ // первый en
                first_en = start_pos;
                for( let y = start_pos; y < str.length; y++){
                    if( /[0-9]/.test( str[y] ) ){
                        first_num = y;
                        break;
                    };
                };
            }else if( /[0-9]/.test( str[start_pos] ) ){  // первый num
                first_num = start_pos;
                for( let y = start_pos; y < str.length; y++){
                    if( /[a-zA-Z]/.test( str[y] ) ){
                        first_en = y;
                        break;
                    };
                };
            };

            for( let i = start_pos; i < str.length; i++){
                if( /[a-zA-Z]/.test( str[i] ) ){
                    last_en = i;
                }else if( /[0-9]/.test( str[i] ) ){
                    last_num = i;
                };
            };
            
        }else{
            return {
                ok: false,
                result: str,
                error_massage: 'Неизвестная ошибка, перемешаны латинские и числовые символы в нелогичном порядке'
            };
        };



        if( /[a-zA-Z]/.test( str[start_pos] ) ){ // первый en

            if( last_en < first_num ){
                // ошибок нет
                let enW;
                let num; // ruW

                if( str[last_en+1] === '!' ||  str[last_en+1] === '?' ){
                    enW = str.slice( first_en, last_en+2 );
                }else{
                    enW = str.slice( first_en, last_en+1 );
                };

                num = str.slice( first_num );

                enW = cleans_the_str_from_excess( enW );
                num = cleans_the_str_num_from_excess( num );


                if( check_for_extra_points( num ) ){
                    return {
                        ok: true,
                        result: {
                            enW,
                            num
                        },
                        error_massage: ''
                    };
                }else{
                    return {
                        ok: false,
                        result: str,
                        error_massage: 'Применение точек (запятых), допускается только при написании дробей. Числа с числом точек более одной, считаются ошибочными'
                    };
                };

            }else{
                return {
                    ok: false,
                    result: str,
                    error_massage: 'Латинские и числовые символы расположены в нелогичной последовательности'
                };
            };
        };

        if( /[0-9]/.test( str[start_pos] ) ){  // первый num
            if( last_num < first_en ){
                // ошибок нет
                let enW;
                let num;

                num = str.slice( first_num, last_num+1 );
                enW = str.slice( first_en );

                enW = cleans_the_str_from_excess( enW );
                num = cleans_the_str_num_from_excess( num );


                if( check_for_extra_points( num ) ){
                    return {
                        ok: true,
                        result: {
                            enW,
                            num
                        },
                        error_massage: ''
                    };
                }else{
                    return {
                        ok: false,
                        result: str,
                        error_massage: 'Применение точек (запятых), допускается только при написании дробей. Числа с числом точек более одной, считаются ошибочными'
                    };
                };

            }else{
                return {
                    ok: false,
                    result: str,
                    error_massage: 'Латинские и числовые символы расположены в нелогичной последовательности'
                };
            };
        };
    };

    function separate_enW_from_ruW( str ){

        let first_en;
        let last_en;
        let first_ru;
        let last_ru;

        let start_pos = false;
        for( let j = 0; j < str.length; j++){
            if( /[a-zA-Z]/.test( str[j] ) ){
                start_pos = j;
                break;
            }else if( /[а-яёА-ЯЁ]/.test( str[j] ) ){
                start_pos = j;
                break;
            };
        };
        if( start_pos !== false ){

            if( /[a-zA-Z]/.test( str[start_pos] ) ){ // первый en
                first_en = start_pos;

                for( let y = start_pos; y < str.length; y++){
                    if( /[а-яёА-ЯЁ]/.test( str[y] ) ){
                        first_ru = y;
                        break;
                    };
                };

            }else if( /[а-яёА-ЯЁ]/.test( str[start_pos] ) ){  // первый ru
                first_ru = start_pos;

                for( let y = start_pos; y < str.length; y++){
                    if( /[a-zA-Z]/.test( str[y] ) ){
                        first_en = y;
                        break;
                    };
                };

            };

            for( let i = start_pos; i < str.length; i++){
                if( /[a-zA-Z]/.test( str[i] ) ){
                    last_en = i;
                }else if( /[а-яёА-ЯЁ]/.test( str[i] ) ){
                    last_ru = i;
                };
            };
            
        }else{
            return {
                ok: false,
                result: str,
                error_massage: 'Неопознанная ошибка, хрен его знает что здесь'
            };
        };


        if( /[a-zA-Z]/.test( str[start_pos] ) ){ // первый en

            if( last_en < first_ru ){
                // ошибок нет
                let enW;
                let ruW;

                if( str[last_en+1] === '!' ||  str[last_en+1] === '?' ){
                    enW = str.slice( first_en, last_en+2 );
                }else{
                    enW = str.slice( first_en, last_en+1 );
                };

                ruW = str.slice( first_ru );

                enW = cleans_the_str_from_excess( enW );
                ruW = cleans_the_str_from_excess( ruW );

                return {
                    ok: true,
                    result: {
                        enW,
                        ruW
                    },
                    error_massage: ''
                };
            }else{
                return {
                    ok: false,
                    result: str,
                    error_massage: 'Или в английском слове присутствуют кирилические символы, или в русском слове есть латинские'
                };
            };
        };

        if( /[а-яёА-ЯЁ]/.test( str[start_pos] ) ){  // первый ru
            if( last_ru < first_en ){
                // ошибок нет
                let enW;
                let ruW;

                if( str[last_ru+1] === '!' ||  str[last_ru+1] === '?' ){
                    ruW = str.slice( first_ru, last_ru+2 );
                }else{
                    ruW = str.slice( first_ru, last_ru+1 );
                };

                enW = str.slice( first_en );

                enW = cleans_the_str_from_excess( enW );
                ruW = cleans_the_str_from_excess( ruW );

                return {
                    ok: true,
                    result: {
                        enW,
                        ruW
                    },
                    error_massage: ''
                };

            }else{
                return {
                    ok: false,
                    result: str,
                    error_massage: 'Или в английском слове присутствуют кирилические символы, или в русском слове есть латинские'
                };
            };
        };

    };

    function cleans_the_str_from_excess( str ){

        let newstr = str;

        newstr = trim_illegal_characters( newstr ); // удаляет запрещённые символы 
        newstr = trim_duble_single_quote( newstr ); // удаляет задвоенные одинарные кавычки оставляет "'"
        newstr = trim_duble_semicolon( newstr ); // удаляет лишние ;
        newstr = replace_semicolon_with_a_comma( newstr ); // заменяет ; на ,
        newstr = trim_duble_colon( newstr );// убирает лишние :::
        newstr = replace_colon_with_a_comma( newstr ); // заменяет : на ,
        newstr = trim_question_mark_and_exclamation_mark( newstr );// расставляет по местам и удаляет лишние !? 
        newstr = trim_extra_comma( newstr ); // убирает лишние запятые
        newstr = trim_probel( newstr ); // чистит от лишних пробелов
        newstr = trim_bad_tire( newstr ); // удаляет длинные тире из MS Word
        newstr = trim_probel_tire_probel( newstr ); // замена " - " на "-"
        newstr = trim_duble_tire( newstr ); // удадяет лишние тире подряд "---"
        newstr = trim_duble_single_quote( newstr ); // удаляет задвоенные одинарные кавычки оставляет "'" ВТОРОЙ РАЗ!!!
        newstr = adjusts_brackets( newstr ); // корректирует скобки ()

        newstr = $.trim( newstr );
        return newstr;
    };

    function cleans_the_str_num_from_excess( str ){
        let newstr = str;

        newstr = trim_illegal_characters_from_num( newstr ); // удаляет запрещённые символы
        newstr = replaces_commas_with_periods( newstr ); // заменяет запятые на точки
        newstr = removes_spaces( newstr ); // удаляет пробелы
        newstr = $.trim( newstr );
        return newstr;
    };

    function check_for_extra_points( str ){
        let count = 0;
        for( let char of str ){
            if( char === '.' ){
                count++;
            };
        };
        if( count > 1 ){
            return false;
        }else{
            return true;
        };
    };

    function trim_probel( str ){
        let newstr = '';
        let flag = false;
        for ( let char of str ) {
            if( char === ' '){
                if( !flag ){
                    newstr = newstr + char;
                };
                flag = true;
            }else{
                newstr = newstr + char;
                flag = false;
            };
        };
        return newstr;
    };


    function removes_spaces( str ){
        let newstr = '';
        let flag = false;
        for ( let char of str ) {
            if( char === ' '){
                if( !flag ){
                    newstr = newstr + '';
                };
                flag = true;
            }else{
                newstr = newstr + char;
                flag = false;
            };
        };
        return newstr;
    };

    function trim_bad_tire( str){
        let newstr = '';
        for( let char of str ){
            if( char.codePointAt(0) === 8211 ){
                newstr = newstr + '-';
            }else{
                newstr = newstr + char;
            };
        };
        return newstr;
    };

    function trim_duble_tire( str ){
        let newstr = '';
        let flag = false;
        for ( let char of str ) {

            if( char === '-'){
                if( !flag ){
                    newstr = newstr + char;
                };
                flag = true;
            }else{
                newstr = newstr + char;
                flag = false;
            };
        };
        return newstr;
    };


    function trim_probel_tire_probel( str ){

        let newstr = str;
        let flag = true;
        while( flag ){
            if( newstr.includes(' - ') ){
                newstr = newstr.replace(' - ', '-');
            }else if( newstr.includes(' -') ){
                newstr = newstr.replace(' -', '-');
            }else if( newstr.includes('- ') ){
                newstr = newstr.replace('- ', '-');
            }else{
                flag = false;
            };
        };
        return newstr;
    };

    function trim_illegal_characters( str ){
        let newstr = '';

        for( let ch of str ){

            let group_1 = ( ch !== '@' && ch !== '#' && ch !== '$' && ch !== '%' && ch !== '^' && ch !== '&' && ch !== '*' && ch !== '_' && ch !== '+' && ch !== '='  );
            let group_2 = ( ch !== '{' && ch !== '}' && ch !== '[' && ch !== ']' && ch !== '|' && ch !== '`' && ch !== '/' && ch !== '"' && ch !== '№' );
            let group_3 = /[a-zA-ZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ \.\-\?\',:;!]/.test( ch );

            if( group_1 && group_2 && group_3 ){ 
                newstr = newstr + ch;
            };
        };

        return newstr;
    };


    function trim_illegal_characters_from_num( str ){
        let newstr = '';

        for( let ch of str ){

            let group_1 = ( ch !== '@' && ch !== '#' && ch !== '$' && ch !== '%' && ch !== '^' && ch !== '&' && ch !== '*' && ch !== '_' && ch !== '+' && ch !== '='  );
            let group_2 = ( ch !== '{' && ch !== '}' && ch !== '[' && ch !== ']' && ch !== '|' && ch !== '`' && ch !== '/' && ch !== '"' && ch !== '№' );
            let group_3 = /[0-9\.,]/.test( ch );

            if( group_1 && group_2 && group_3 ){ 
                newstr = newstr + ch;
            };
        };

        return newstr;
    };

    function trim_duble_single_quote( str ){
        let newstr = '';
        let flag = false;
        for ( let char of str ) {
            if( char === "'" ){
                if( !flag ){
                    newstr = newstr + char;
                };
                flag = true;
            }else{
                newstr = newstr + char;
                flag = false;
            };
        };
        return newstr;
    };

    function trim_duble_semicolon( str ){ // точка с запятой
        let newstr = '';
        let flag = false;
        for ( let char of str ) {
            if( char === ';' ){
                if( !flag ){
                    newstr = newstr + char;
                };
                flag = true;
            }else{
                newstr = newstr + char;
                flag = false;
            };
        };
        return newstr;
    };

    function replace_semicolon_with_a_comma( str ){

        let newstr = str;

        let flag = true;

        while( flag ){
            if( newstr.includes(';') ){
                newstr = newstr.replace(';', ',');
            }else{
                flag = false;
            };
        };
        let flag2 = true;
        while( flag2 ){
            if( newstr.includes(' ,') ){
                newstr = newstr.replace(' ,', ', ');
            }else{
                flag2 = false;
            };
        };

        return newstr;
    };

    function trim_duble_colon( str ){ // точка с запятой
        let newstr = '';
        let flag = false;
        for ( let char of str ) {
            if( char === ':' ){
                if( !flag ){
                    newstr = newstr + char;
                };
                flag = true;
            }else{
                newstr = newstr + char;
                flag = false;
            };
        };
        return newstr;
    };

    function replace_colon_with_a_comma( str ){

        let newstr = str;

        let flag = true;

        while( flag ){
            if( newstr.includes(':') ){
                newstr = newstr.replace(':', ',');
            }else{
                flag = false;
            };
        };
        let flag2 = true;
        while( flag2 ){
            if( newstr.includes(' ,') ){
                newstr = newstr.replace(' ,', ', ');
            }else{
                flag2 = false;
            };
        };

        return newstr;
    };

    function replaces_commas_with_periods( str ){
        let newstr = str;
        let flag = true;

        while( flag ){
            if( newstr.includes(',') ){
                newstr = newstr.replace(',', '.');
            }else{
                flag = false;
            };
        };
        return newstr;
    };

    function trim_extra_comma( str ) {
        let newstr = str;

        let flag = true;

        while( flag ){
            if( newstr.includes(',,') ){
                newstr = newstr.replace(',,', ',');
            }else if( newstr.includes(', ,') ){
                newstr = newstr.replace(', ,', ', ');
            }else if( newstr.includes(' ,') ){
                newstr = newstr.replace(' ,', ', ');
            }else if( newstr.includes(', ') ){
                flag = false;
            }else if( newstr.includes(',') ){
                newstr = newstr.replace(',', ', ');
            }else{
                flag = false;
            };
        };
        return newstr;
    };

    function trim_question_mark_and_exclamation_mark( str ){

        let newstr = str;
        let arr = [];
        let i = 0;
        while( i < str.length ){
            if( /[а-яёА-ЯЁ]/.test( str[i] ) || /[a-zA-Z]/.test( str[i] ) ){
                i++;
            }else{
                let flag = true;
                let first_znak = true;
                let substr = '';
                for( let y = i; flag; y++ ){

                    if( /[а-яёА-ЯЁ]/.test( str[y] ) || /[a-zA-Z]/.test( str[y] ) ){ // концовка

                        let part_1 = newstr.slice(0, i);
                        let part_3 = newstr.slice(y, str.length );

                        newstr = part_1+substr+part_3;
                        i = y;
                        arr.push( substr );
                        flag = false;
                    }else{

                        if( y < str.length && y === (str.length-1) ){ // последний символ в str
                            substr = substr + str[y];
                            flag = false;
                        }else{
                            if( str[y] === '?' || str[y] === '!' ){
                                if( first_znak ){ // первая запись ! или ?
                                    substr = substr + str[y];
                                    first_znak = false;
                                }else{
                                    substr = substr + ' '; 
                                };
                            }else{
                                substr = substr + str[y];
                            }; 
                        };
                    };
                };
                i++;
            };
        }; 

        let flag2 = true;
        while( flag2 ){
            if( newstr.includes(' ?') ){
                newstr = newstr.replace(' ?', '? ');
            }else if( newstr.includes('?, ') ){
                flag2 = false;
            }else{
                flag2 = false;
            };
        };

        let flag3 = true;
        while( flag3 ){
            if( newstr.includes(' !') ){
                newstr = newstr.replace(' !', '! ');
            }else if( newstr.includes('!, ') ){
                flag3 = false;
            }else{
                flag3 = false;
            };
        };

        return newstr;

    };

    function adjusts_brackets( str ){
        let newstr = str;

        let flag = true;
        while( flag ){
            if( newstr.includes('(,') ){
                newstr = newstr.replace('(,', '(');
            }else if( newstr.includes('(!') ){
                newstr = newstr.replace('(!,', '(');
            }else if( newstr.includes('(?') ){
                newstr = newstr.replace('(?,', '(');
            }else if( newstr.includes('( ') ){
                newstr = newstr.replace('( ', '(');
            }else{
                flag = false;
            };
        };

        let flag2 = true;
        while( flag2 ){
            if( newstr.includes(',)') ){
                newstr = newstr.replace(',)', ')');
            }else if( newstr.includes(' )') ){
                newstr = newstr.replace(' )', ')');
            }else{
                flag2 = false;
            };
        };

        return newstr;
    };
};


