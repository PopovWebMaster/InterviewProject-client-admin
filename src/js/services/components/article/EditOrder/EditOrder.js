//import $ from "jquery";

import React from 'react';
import { Component } from 'react';
import './EditOrder.scss';

//import { GLOBAL } from './../../../../CONSTANTS.js';

class EditOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            order: this.props.oldOrder
        };
        this.createSelect = this.createSelect.bind(this);
        this.setSelect = this.setSelect.bind(this);
    }

    setSelect( e ){
        this.setState({
            order: Number( e.target.value )
        });
        this.props.setOrder( Number( e.target.value ) );
    }

    createSelect( arrListOfOrders, oldOrder ){
        let listOrders = arrListOfOrders;
        listOrders.sort( ( a, b ) =>  a - b );

        let option = listOrders.map( ( item, index ) => {
            return (
                <option     key = { index } 
                            value = { item }
                >{ item }</option>
            );
        });
        return (
            <select
                    value={ this.state.order }
                    onChange={ this.setSelect }
            >
                { option }
            </select>
        );
    }


    componentDidUpdate( prevProps, prevState ) { 

        if( this.props.isChenged !== prevProps.isChenged && !this.props.isChenged ){ // нажата отмена 
            this.setState({
                order: this.props.order
            });
        };

    }

    render(){
        return (
            <div className = 'editOrder_art item_art'>
                <div className = 'nameItem_art'>
                    <span>Порядковый номер <span className = 'editOrder_num_art'>({ this.props.oldOrder })</span>:</span>
                </div>

                <div className = 'editItem_art'>
                    <div>{ this.createSelect( this.props.arrListOfOrders, this.props.oldOrder ) }</div>
                </div>
            </div>
        )
    }
};


export default EditOrder;