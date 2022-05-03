



export const get_a_clone_of_an_object = ( obj ) => {

    return JSON.parse( JSON.stringify(obj) );

};