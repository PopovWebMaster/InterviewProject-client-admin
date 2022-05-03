//import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
// import "babel-polyfill";

//import { GLOBAL } from './../CONSTANTS.js';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            arrListArticles: sortArrFromOrder( this.props.massage.listArticles )
        };
        this.createList = this.createList.bind(this);

        //console.dir( this.props.massage );
    }

    createList( arr ){

        if( !Array.isArray( arr ) ){
            return '';
        };

        let arr_status_true = [];
        let arr_status_false = [];
        for( let obj of arr ){
            if( obj.status ){
                arr_status_true.push(obj);
            }else{
                arr_status_false.push(obj);
            };
        };

        let rows_status_true;
        if( arr_status_true.length === 0 ){
            rows_status_true = (<tr className = 'empty_admin'><th>(пусто)</th></tr>);
        }else{
            rows_status_true = arr_status_true.map( ( item, index ) => {
                return(
                    <tr 
                        className = 'full_admin'
                        key = { index } 
                        onClick = { () => {
                            document.location.href = item.href_article;
                        }}
                    >
                        <th>{ index + 1 }</th>
                        <th>{ item.title }</th>
                    </tr>
                );
            });
        };

        let rows_status_false;
        if( arr_status_false.length === 0 ){
            rows_status_false = (<tr className = 'empty_admin'><th>(пусто)</th></tr>);
        }else{
            rows_status_false = arr_status_false.map( ( item, index ) => {
                return(
                    <tr  
                        className = 'full_admin'
                        key = { index } 
                        onClick = { () => {
                            document.location.href = item.href_article;
                        }}
                    >
                        <th> - </th>
                        <th>{ item.title }</th>
                    </tr>
                );
            });
        };

        return (<>
            <table className = 'articles_true'>
                <caption>Готовые (опубл.)</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { rows_status_true }
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>

            <table className = 'articles_false'>
                <caption>Не опубликованные</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { rows_status_false }
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>

        </>);
    }

    render(){
		return (
            <div id = 'articles_admin'>
                { this.createList( this.state.arrListArticles ) }
                <div className = 'newArticle_admin'>
                    <span onClick = { () => {
                        document.location.href = this.props.massage.href_add_article;
                    }}
                    >Создать новую статью</span>
                </div>
            </div>
        );
	}

};

function sortArrFromOrder( arr ) {

    let newarr = arr;
    let flag = true;
    
    if( newarr.length !== 0 ){
        while( flag ){
            let flag2 = false;
            for( let i = 0; i < newarr.length; i++){
                if( newarr[i+1] !== undefined ){
                    if( arr[i].order > newarr[i+1].order ){
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


