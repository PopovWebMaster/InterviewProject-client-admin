
export const action_for_development = ( handler ) => {

    if( typeof handler !== 'function' ){
        console.log('Ошибка, action_for_development не получила в качестве параметра функцию');
    }else{
        if( DEVELOPMENT_VERSION ){
            handler();
        };
    };

};