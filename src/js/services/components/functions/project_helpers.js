export const getTotal = function( arr ){
    if( arr !== undefined ){
        return arr.length;
    };
    
};


export const issetAudio = function( arrWords, arrAudio ){
    if( arrWords === undefined || arrAudio === undefined ){
        return;
    };
    let count = 0;
    if( arrAudio.length !== 0 ){
        for ( let obj of arrWords ) {
            let enW = obj.enW;
            for ( let audioName of arrAudio ) {
                if( audioName === enW ){
                    count++;
                    break;
                };
            };
        };
    };
    return count;
};

export const issetRepeat = function( arr ){
    if( arr === undefined ){
        return;
    };
    let count = 0;
    for( let i = 0; i < arr.length; i++ ){
        if( !arr[i].isRepeat.exists ){
            count++;
        };
    };
    return count;
};




export const getReady = function( /*arr*/arrWords, arrAudio ){

    if( arrWords === undefined || arrAudio === undefined ){
        return;
    };

    let count = 0;
    for( let objWord of arrWords ){
        let enW = objWord.enW;
        let isRepeat = objWord.isRepeat.exists;
        let isAudio = false;
        if( arrAudio.length !== 0 ){
            for( let audioName of arrAudio ){
                if( audioName === enW ){
                    isAudio = true;
                    break;
                }
            };
        };
        if( isAudio && !isRepeat ){
            count++;
        };
    };

    return count;
};


export const sortArrWords = function(arr) {

    let newarr = arr;
    let flag = true;
    
    if( newarr.length !== 0 ){
        while( flag ){
            let flag2 = false;
            for( let i = 0; i < newarr.length; i++){
                if( newarr[i+1] !== undefined ){
                    if( arr[i].enW.toLowerCase() > newarr[i+1].enW.toLowerCase() ){
                        let a = newarr[i+1];
                        let b = newarr[i];
                        newarr[i] = a;
                        newarr[i+1] = b;
                        flag2 = true;
                    };
                };  
                flag = flag2;
            };
        };
    };
    return newarr;
};
