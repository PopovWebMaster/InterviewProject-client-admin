import $ from "jquery";

import React from 'react';
import { Component } from 'react';
import './EditAlias.scss';

//import { GLOBAL } from './../../../../CONSTANTS.js';

class EditAlias extends Component {
    constructor(props){
        super(props);
        this.state = {
            alias: this.props.alias,
            isErr: this.props.errAlias.isErr,
            errMassage: this.props.errAlias.massage
        };

        this.input_backgroundColor = '';

        this.serAlias = this.serAlias.bind(this);
        this.blure = this.blure.bind(this);
        this.focus = this.focus.bind(this);
        this.keyDown = this.keyDown.bind(this);
    
    }

    serAlias( e ){
        this.setState({
            alias: e.target.value
        });
        
    }

    blure(){
        let input = document.querySelector('.editAlias_art .editItem_art input');
        let hr = document.querySelector('.editAlias_art .editItem_art hr');
        input.style.backgroundColor = this.input_backgroundColor; // '#00000000'
        hr.style.width = '0%';
        this.props.setAlias( this.state.alias );
    }

    focus(){
        let input = document.querySelector('.editAlias_art .editItem_art input');
        let hr = document.querySelector('.editAlias_art .editItem_art hr');
        input.style.backgroundColor = '#00000008';
        hr.style.width = '100%';
    }

    keyDown( e ){
        if( e.which === 13 ){ // Enter
            this.blure();
            document.querySelector('.editAlias_art .editItem_art input').blur();
        };
    }

    componentDidMount(){
        let input = document.querySelector('.editAlias_art .editItem_art input');
        this.input_backgroundColor = $( input ).css( 'background-color' );
    }

    componentDidUpdate( prevProps, prevState ) { 
        // if( this.props.errAlias.isErr ){
        //     document.querySelector('.editAlias_art .editItem_art input').focus();
        // };

        if ( this.props.errAlias !== prevProps.errAlias ) {
            this.setState({
                isErr: this.props.errAlias.isErr,
                errMassage: this.props.errAlias.massage
            });
        };

        if ( this.props.alias !== prevProps.alias ) {
            this.setState({
                alias: this.props.alias
            });
        };

        if( this.props.isChenged !== prevProps.isChenged && !this.props.isChenged ){ // нажата отмена 
            this.setState({
                alias: this.props.alias
            });
        };
    }

    render(){
        return (
            <div className = 'editAlias_art item_art'>
                <div className = 'nameItem_art'>
                    <span>Псевдоним:</span>
                </div>

                <div className = 'editItem_art'>
                    <input  name = 'title'
                            type ='text' 
                            value = { this.state.alias } 
                            //maxLength = '250'
                            onChange = { this.serAlias }
                            onBlur = {
                                () => {
                                    this.blure();
                                }
                            }
                            onFocus = {
                                () => {
                                    this.focus();
                                }
                            }
                            onKeyDown = { this.keyDown }
                    />
                    <hr/>
                    <label className = 'label_errAlias_art'>{ this.state.errMassage }</label>

                </div>
            </div>
        )
    }
};


export default EditAlias;