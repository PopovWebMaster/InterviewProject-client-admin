import React from 'react';
import { Component } from 'react';
import './index.scss';

export default class EmptyList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className = 'emptyTabList'>
                Список пуст
            </div>
        );
    }
};



