import { updateStatistyc } from './function/updateStatistyc.js';

export const controller = {
    updateStatistyc( params ){
        
        let ready_sum_words = params.ready_sum_words;
        let total_sum_words = params.total_sum_words;

        updateStatistyc({
            ready_sum_words,
            total_sum_words
        });
    },
};