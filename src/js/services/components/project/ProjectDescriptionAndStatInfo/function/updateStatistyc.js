// updateStatistyc
import { CLASS_NAME } from './../config.js';

export const updateStatistyc = ( params ) => {

    let ready_sum_words = params.ready_sum_words;
    let total_sum_words = params.total_sum_words;

    let li_total_elem = document.querySelector(`.${CLASS_NAME.STATISTIC} li.${CLASS_NAME.TOTAL_SUM_WORDS}`);
    let li_ready_elem = document.querySelector(`.${CLASS_NAME.STATISTIC} li.${CLASS_NAME.READY_SUM_WORDS}`);

    li_total_elem.innerText = `${total_sum_words} сл`;
    li_ready_elem.innerText = `${ready_sum_words} сл`;

};