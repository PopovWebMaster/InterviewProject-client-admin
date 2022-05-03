import $ from "jquery";

import React from 'react';
import { Component } from 'react';
import './EditTitle.scss';

//import { GLOBAL } from './../../../../CONSTANTS.js';

class EditTitle extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            isErr: this.props.errTitle.isErr,
            errMassage: this.props.errTitle.massage,
        };

        this.input_backgroundColor = '';
        this.setTitle = this.setTitle.bind(this);
        this.focus = this.focus.bind(this);
        this.blure = this.blure.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }

    setTitle( e ){
        this.setState({
            title: e.target.value
        });
    }

    blure(){
        let input = document.querySelector('.editTitle_art .editItem_art input');
        let hr = document.querySelector('.editTitle_art .editItem_art hr');
        input.style.backgroundColor = this.input_backgroundColor; // '#00000000'
        hr.style.width = '0%';
        this.props.setTitle( this.state.title );
    }

    focus(){
        let input = document.querySelector('.editTitle_art .editItem_art input');
        let hr = document.querySelector('.editTitle_art .editItem_art hr');
        input.style.backgroundColor = '#00000008';
        hr.style.width = '100%';
    }

    keyDown( e ){
        if( e.which === 13 ){ // Enter
            this.blure();
            document.querySelector('.editTitle_art .editItem_art input').blur();
        };
    }

    componentDidMount(){
        let input = document.querySelector('.editTitle_art .editItem_art input');
        this.input_backgroundColor = $( input ).css( 'background-color' );
    }

    componentDidUpdate( prevProps, prevState ) { 
        // if( this.props.errTitle.isErr ){
        //     document.querySelector('.editTitle_art .editItem_art input').focus();
        // };

        if ( this.props.errTitle !== prevProps.errTitle ) {
            this.setState({
                isErr: this.props.errTitle.isErr,
                errMassage: this.props.errTitle.massage
            });
        };

        if( this.props.isChenged !== prevProps.isChenged && !this.props.isChenged ){ // нажата отмена 
            this.setState({
                title: this.props.title
            });
        };
    }

    render(){
        return (
            <div className = 'editTitle_art item_art'>
                <div className = 'nameItem_art'>
                    <span>Заголовок:</span>
                </div>

                <div className = 'editItem_art'>
                    <input  name = 'title'
                            type ='text' 
                            value = { this.state.title } 
                            //maxLength = '250'
                            onChange = { this.setTitle }
                            //autoFocus={ this.state.isErr }
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
                    <label className = 'label_err_art'>{ this.state.errMassage }</label>

                </div>
            </div>
        )
    }
};


export default EditTitle;