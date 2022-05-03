export const isset = ( variable ) => {
    if( typeof(variable) != "undefined" && variable !== null ){
        return true;
    }else{
        return false;
    };
};