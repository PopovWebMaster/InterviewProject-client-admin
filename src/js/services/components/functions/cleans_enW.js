import $ from "jquery";


export const cleans_enW = function( str ){
    let newstr = str;

    //newstr = extra_character( newstr ); // всё что не a-zA-Z !?,-'

    
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



    newstr = final( newstr );


    newstr = $.trim( newstr );
   

    return newstr;
};


function final( str ){

    let newstr = '';
    let start_pos = undefined;
    for( let i = 0; i < str.length; i++ ){
        if( /[a-zA-Z]/.test( str[i] ) ){
            start_pos = i;
            break;
        };
    };
    let arr = [];
    let word = '';

    for( let i = start_pos; i < str.length; i++ ){

        if( /[a-zA-Z\-\']/.test( str[i] ) ){

            if( str[i] === '-' ){
                if( str[i+1] !== undefined ){
                    if( /[a-zA-Z]/.test( str[i+1] ) ){
                        // 
                        if( word !== ''){
                            word = word + str[i];
                        };
                    }else{
                        // значит тирешка лишняя
                        arr.push( word );
                        word = '';
                    };
                }else{
                    // последний i
                    arr.push( word );
                    word = '';
                };
            }else if( str[i] === "'" ){
                if( str[i+1] !== undefined ){
                    if( /[a-zA-Z]/.test( str[i+1] ) ){
                        // 
                        if( word !== ''){
                            word = word + str[i];
                        };
                    }else{
                        // значит ' лишняя
                        arr.push( word );
                        word = '';
                    };
                }else{
                    // последний i
                    arr.push( word );
                    word = '';
                };
            }else{ // текущий i является буквой

                if( str[i+1] !== undefined ){
                    word = word + str[i];

                }else{
                    // последний i
                    word = word + str[i];
                    arr.push( word );
                    word = '';
                };
            };

        }else{ // здесь все остальные знаки ! ,?
            if( /[a-zA-Z]/.test( str[i-1] ) ){
                // это концовка одного слова
                word = word + str[i];
                arr.push( word );
                word = '';

            }else{
                // игнорировать
            };
        };
    };

    for( let i = 0; i < arr.length; i++ ){

        if( i+1 !== arr.length ){
            newstr = newstr + arr[i] + ' ';
        }else{
            newstr = newstr + arr[i];
        }

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

function  extra_character( str ) {
    let newstr = '';
     for( let char of str ){

        let ok = /[a-zA-Z \-\?\',!]/.test( char );

        if( ok ){
            newstr = newstr + char;
        };
    };

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
        let group_2 = ( ch !== '{' && ch !== '}' && ch !== '[' && ch !== ']' && ch !== '|' && ch !== '`' && ch !== '/' && ch !== '"' && ch !== '№' && ch !== '(' && ch !== ')' );
        //let group_3 = /[a-zA-ZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ \.\-\?\',:;!]/.test( ch );
        let group_3 = /[a-zA-Z \.\-\?\',:;!]/.test( ch );

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