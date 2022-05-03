import $ from "jquery";

import React from 'react';
import { Component } from 'react';
import './EditSecondTitle.scss';

//import { GLOBAL } from './../../../../CONSTANTS.js';

class EditSecondTitle extends Component {
    constructor(props){
        super(props);
        this.state = {
            second_title: this.props.second_title,
            isErr: this.props.errSecondTitle.isErr,
            errMassage: this.props.errSecondTitle.massage,
        };

        this.textarea_backgroundColor = '';

        this.setSecondTitle = this.setSecondTitle.bind(this);
        this.focus = this.focus.bind(this);
        this.blure = this.blure.bind(this);
        this.setHeightTextarea = this.setHeightTextarea.bind(this);
    }

    setSecondTitle( e ){
        this.setState({
            second_title: e.target.value
        });
        this.setHeightTextarea();
    }

    blure(){
        let textarea = document.querySelector( '.editSecondTitle_art .editItem_art textarea' );
        let hr = document.querySelector( '.editSecondTitle_art .editItem_art hr' ); 
        textarea.style.backgroundColor = this.textarea_backgroundColor; // '#00000000' 
        hr.style.width = '0%';
        this.props.setSecondTitle( $.trim(this.state.second_title));
    }

    focus(){
        let textarea = document.querySelector( '.editSecondTitle_art .editItem_art textarea' );
        let hr = document.querySelector( '.editSecondTitle_art .editItem_art hr' ); 
        textarea.style.backgroundColor = '#00000008';
        hr.style.width = '100%';
    }

    setHeightTextarea(){
        let textarea = document.querySelector( '.editSecondTitle_art .editItem_art textarea' );
        textarea.style.height = 0 + 'px';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    componentDidMount(){
        let textarea = document.querySelector( '.editSecondTitle_art .editItem_art textarea' );
        this.textarea_backgroundColor = $( textarea ).css( 'background-color' );
        this.setHeightTextarea();
    }

    componentDidUpdate( prevProps, prevState ) { 
        if( this.props.isChenged !== prevProps.isChenged && !this.props.isChenged ){ // нажата отмена 
            this.setState({
                second_title: this.props.second_title
            });
            let setHeight = setInterval( ()=>{
                if( this.props.second_title === this.state.second_title ){
                    this.setHeightTextarea();
                    clearInterval(setHeight);
                };
            }, 10 );
        };

        // if( this.props.errSecondTitle.isErr ){
        //     document.querySelector('.editSecondTitle_art .editItem_art textarea').focus();
        // };

        if ( this.props.errSecondTitle !== prevProps.errSecondTitle ) {
            this.setState({
                isErr: this.props.errSecondTitle.isErr,
                errMassage: this.props.errSecondTitle.massage
            });
        };



    }

    render(){
        return (
            <div className = 'editSecondTitle_art item_art'>
                <div className = 'nameItem_art'>
                    <span>Слоган:</span>
                </div>

                <div className = 'editItem_art'>
                    <textarea
                            name = 'second_title'
                            value = { this.state.second_title } 
                            //maxLength = '250'
                            onChange = { this.setSecondTitle }
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
                    />
                    <hr/>
                    <label className = 'label_err_art'>{ this.state.errMassage }</label>
                </div>
            </div>
        )
    }
};


export default EditSecondTitle;