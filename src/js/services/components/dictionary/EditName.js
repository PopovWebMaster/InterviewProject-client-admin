import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './EditName.scss';

import { GLOBAL } from './../../../CONSTANTS.js';
import { check_valid_name } from './../functions/check_valid_name.js';


class EditName extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            isErr: this.props.errName.isErr, // this.props.errName.isErr
            errMassage: this.props.errName.massage, // this.props.errName.massage
        };

        this.oldName = this.props.name;

        this.focus = this.focus.bind(this);
        this.blure = this.blure.bind(this);
        this.setName = this.setName.bind(this);
        this.keyDownEnter = this.keyDownEnter.bind(this);
        this.onEvents = this.onEvents.bind(this);
        this.offEvents = this.offEvents.bind(this);

        
    }

    
    focus(){
        let input = $('.editName_dic>div input');
        let hr = $('.editName_dic>div hr');
        $( input ).css({
            backgroundColor: '#00000008'
        });

        $( hr ).css({
            width: '100%'
        });
    }

    blure(){
        let input = $('.editName_dic>div input');
        let hr = $('.editName_dic>div hr');
        $( input ).css({
            backgroundColor: '#00000000'
        });

        $( hr ).css({
            width: '0%'
        });
    }

    setName( e ){
        this.setState({
            name: e.target.value
        });
        this.props.setName( e.target.value );
    }


    keyDownEnter( e ){
        if( e.which !== 13){ return; }; // Enter
        let input = $('.editName_dic .editItem_dic input');
        if( !$( input ).is(":focus") ){ return; };

        let resValidation = check_valid_name( this.state.name, this.props.listNames, this.oldName );
        
        if( resValidation.isErr ){ // ошибка есть
            this.setState({
                isErr: resValidation.isErr,
                errMassage: resValidation.massage
            });
          

        }else{ // ощшибки нет
            this.setState({
                isErr: false,
                errMassage: ''
            });
            $( input ).blur();
        };

    }

    onEvents(){
       this.offEvents();
       $( document ).on("keydown", this.keyDownEnter );

    }

    offEvents(){
        $(document).off("keydown");

    }

    componentDidMount(){

        this.onEvents();


    }
    componentWillUnmount(){
        this.offEvents();


    }
    componentDidUpdate( prevProps, prevState ) {

        if( this.props.errName.isErr ){
            $('.editName_dic .editItem_dic input').focus();
        };

        
        if ( this.props.errName.isErr !== prevProps.errName.isErr ) {
            this.setState({
                isErr: this.props.errName.isErr,
                errMassage: this.props.errName.massage
            });
        };
    }


    render(){
        return (
            <div className = 'editName_dic'>
               
                <div className = 'nameItem_dic'>
                    <span>Имя:</span>
                </div>
                
                <div className = 'editItem_dic'>
                    <input  name = 'editName'
                            type ='text' 
                            value = { this.state.name } 
                            maxLength = '250'
                            onChange = { this.setName }
                            autoFocus={ this.state.isErr }
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
                    <label className = 'label_err_dic'>{ this.state.errMassage }</label>

                </div>
                    

            </div>
            
        )
    }
};


export default EditName;




