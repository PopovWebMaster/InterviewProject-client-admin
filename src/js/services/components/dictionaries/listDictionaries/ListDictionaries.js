//import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './ListDictionaries.scss';

//import { GLOBAL } from './../../../../CONSTANTS.js';

class ListDictionaries extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrListDictionaries: this.props.arrListDictionaries
        };

        this.createListDictionaries = this.createListDictionaries.bind(this);
    }
    
    static getDerivedStateFromProps( nextProps, prevState ){
        if ( nextProps.arrListDictionaries !== prevState.arrListDictionaries) {
            return {
                arrListDictionaries: nextProps.arrListDictionaries
            }
        };
        return null;
    }

    createListDictionaries( arr ){

        if( !Array.isArray( arr ) ){
            return '';
        };

        let arr_with_projects = [];
        let arr_without_projects = [];
        for( let i = 0; i < arr.length; i++ ){
            if( arr[i].status ){
                arr_with_projects.push( arr[i] );
            }else{
                arr_without_projects.push( arr[i] );
            };
        };

        let arr_with = sortArrFromQueue( arr_with_projects );
        let arrOnLevel = [];
        let count = 1;
        let level = 0;
        let Levels = arr_with.map(( item, index ) => {

            if( count%this.props.sum_dictionaries_in_one_level !== 0){
                if( arr_with[index+1] !== undefined ){
                    arrOnLevel.push( item );
                    count++;
                }else{
                    // выход 
                    arrOnLevel.push( item );
                    level++;
                    let onelevel = (
                        <OneLevel   
                            arrList = { arrOnLevel }
                            key = {index}
                            level = { level }
                        />
                    );
                    arrOnLevel = [];
                    count = 1;
                    return onelevel;
                };
            }else{
                arrOnLevel.push( item );
                level++;
                let onelevel = (
                    <OneLevel   
                        arrList = { arrOnLevel }
                        key = {index}
                        level = { level }
                    />
                );
                arrOnLevel = [];
                count = 1;
                return onelevel;
            };

        });

        let without_Levels_rows = arr_without_projects.map( ( item, index ) => {

            let rows = (
                <tr key = {index} 
                    onClick = { () => {
                        document.location.href = item.href;
                    }}
                >
                    <th></th>
                    <th>{ item.name }</th>
                    <th>{ item.sumWords? item.sumWords: '-'}</th>
                </tr>
            );
            return rows;
        });

        return (
            <>
                <h2>Готовые (опубл.)</h2>
                { Levels }
                <h2>Не опубликованные </h2>
                <table className = 'without_Levels'>
                    <caption></caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { without_Levels_rows }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </>
        );

    }


	render(){
		return (<>
            <div id='listDictionaries_admin'>
                { this.createListDictionaries( this.state.arrListDictionaries ) }
            </div>
		</>);
	}
};

export default ListDictionaries;








class OneLevel extends Component {
    
    constructor(props){
        super(props);

        this.create = this.create.bind(this);

    }

    create( arr ){

        if( !Array.isArray( arr ) ){
            return '';
        };

        let sumWords = 0;

        let rows = arr.map( ( item, index ) => {
            sumWords = item.sumWords + sumWords;
            let tr = (
                <tr key = { index }
                    onClick = { () => {
                        document.location.href = item.href;
                    }}
                >
                    <th>{ item.queue }</th>
                    <th>{ item.name }</th>
                    <th>{ item.sumWords }</th>
                </tr>
            );
            return tr;
        });

        return (
            <>
                <table className = 'with_Levels'>
                    <caption><span>Уровень { this.props.level }</span> <span>{sumWords}сл.</span></caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { rows }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </>
        );
   
    }


	render(){
		return (
            <>
                { this.create( this.props.arrList ) }
            </>
		)
	}
};







function sortArrFromQueue(arr) {

    let newarr = arr;
    let flag = true;
    
    if( newarr.length !== 0 ){
        while( flag ){
            let flag2 = false;
            for( let i = 0; i < newarr.length; i++){
                if( newarr[i+1] !== undefined ){
                    if( arr[i].queue > newarr[i+1].queue ){
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





















