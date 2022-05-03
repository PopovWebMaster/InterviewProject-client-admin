import React from 'react';
import { Component } from 'react';
import './index.scss';

import { separates_one_string_enW_from_ruW_and_enW_from_num } from './../../../../../../functions/separates_one_string_enW_from_ruW_and_enW_from_num.js';
import EmptyList from './EmptyList';
import TableRowSuccess from './TableRowSuccess';
import TableRowError from './TableRowError';
import { ProjectDescriptionAndStatInfoController } from './../../../../../ProjectDescriptionAndStatInfo';


export default class Table extends Component {
    constructor(props){
        super(props);

        /*
            this.props.words
            this.props.set_item_of_words_to_array_of_words
        */

        this.amount_ready_words_with_audio =        0;
        this.amount_ready_words_without_repeat =    0;
        this.sum_of_ready_words_for_publication =   0;

        this.createTable = this.createTable.bind(this);
        this.setStatistics = this.setStatistics.bind(this);
        this.to_execute_before_rendering = this.to_execute_before_rendering.bind(this);

        

    }

    setStatistics( params ){

        let test_result =   params.test_result;
        let item_of_words = params.item_of_words;

        if( test_result.ok ){
            let isAudio = item_of_words.isAudio.exists;
            let isRepeat = item_of_words.isRepeat.exists

            if( isAudio === true ){
                this.amount_ready_words_with_audio++;
            };

            if( isRepeat === false ){
                this.amount_ready_words_without_repeat++;
            };
            if( isAudio && !isRepeat ){
                this.sum_of_ready_words_for_publication++;
            };

        };

    }



    createTable( params ){

        let words = params.words;

        let rows;

        if( words.length === 0 ){
            return <EmptyList />;

        }else{

            rows = words.map( ( item, index ) => {

                let res = separates_one_string_enW_from_ruW_and_enW_from_num( item.enW + ' ' + item.ruW );

                this.setStatistics({
                    test_result: res,
                    item_of_words: item,
                });

                if( res.ok ){
                    return (
                        <React.Fragment key = { index }>

                            <TableRowSuccess 
                                index =             { index }
                                enW =               { item.enW }
                                ruW =               { item.ruW }
                                isAudio =           { item.isAudio }
                                isRepeat =          { item.isRepeat }
                            />
                        </React.Fragment>
                    );

                }else{ 
                    return (
                        <React.Fragment key = { index }>
                            <TableRowError 
                                index =             { index }
                                enW =               { item.enW }
                                ruW =               { item.ruW }
                                error_massage =     { res.error_massage }
                            />
                        </React.Fragment>
                    );
                };
            });

        };

        this.to_execute_before_rendering();

        return(
            <table>
                <caption></caption>

                <thead>
                    <tr>
                        <th></th>
                        <th colSpan='2'></th>
                        <th>аудио</th>
                        <th>повторы</th>
                        <th>Удалить</th>
                    </tr>
                </thead>

                <tbody>
                    { rows }
                </tbody>

                <tfoot>
                    <tr>
                        <th rowSpan = "2"></th>
                        <th colSpan='2'></th>
                        <th>{ this.amount_ready_words_with_audio }</th>
                        <th>{ this.amount_ready_words_without_repeat }</th>
                        <th></th>
                    </tr>
                    <tr className = 'totalFoot'>
                        <th colSpan = '4'>Готово к публикации: { this.sum_of_ready_words_for_publication }</th>
                        <th></th>
                    </tr>
                </tfoot>

            </table>
        );
    }


    to_execute_before_rendering(){

        ProjectDescriptionAndStatInfoController.updateStatistyc({
            ready_sum_words: this.sum_of_ready_words_for_publication ,
            total_sum_words: this.props.words.length,
        });

    }

    render(){

        return (
            <div className = 'projectTabListTable'>
                { 
                    this.createTable({
                        words: this.props.words,
                    }) 
                }
            </div>
        )
    }
};



