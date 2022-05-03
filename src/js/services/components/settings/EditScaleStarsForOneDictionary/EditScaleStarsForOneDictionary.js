//import $ from "jquery";
import React from 'react';
import { Component } from 'react';
import './EditScaleStarsForOneDictionary.scss';

//import { GLOBAL } from '../../../../CONSTANTS.js';

class EditScaleStarsForOneDictionary extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
        };
        
        // начало настроек
        this.elem_className = 'editScaleStarsForOneDictionary';         // <- здесь
        this.className_nameItem = 'nameItem_set';                       // <- здесь
        this.className_item = 'item_set';                               // <- здесь
        this.className_editItem = 'editItem_set';                       // <- здесь
        this.setResult = this.props.set_scale_stars_for_one_dictionary; // <- здесь
        // конец настроек

        this.createSelect = this.createSelect.bind(this);
        this.setSelect = this.setSelect.bind(this);
    }

    createSelect( value ){
        let interval = this.props.interval;
        let arr = [];
        for( let i = 0; i < interval[1]+1; i++ ){
            if( i >= interval[0] && i <= interval[1] ){
                arr.push(i);
            };
        };

        let option = arr.map( ( item, index ) => {
            return (
                <option     
                    key = {index} 
                    value = { item }
                >{ item }</option>
            );
        });

        return (
            <select
                    value = { value }
                    onChange = { this.setSelect }
            >
                { option }
            </select>
        );
    }

    setSelect( e ){
        this.setState({
            value: e.target.value
        });
        this.setResult( e.target.value );
    }

    componentDidUpdate( prevProps, prevState ) { 
        if( this.props.value !== this.state.value ){
            this.setState({
                value: this.props.value
            });
        };
    }

    render(){
        return (
            <div className = { this.elem_className +' '+this.className_item }>
                <div className = { this.className_nameItem }>
                    <span>{ this.props.description }:</span>
                </div>
                <div className = { this.className_editItem }>
                    <div>{ this.createSelect( this.state.value ) }</div>
                </div>

            </div>
        )
    }
};

export default EditScaleStarsForOneDictionary;