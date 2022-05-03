import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';

import { GLOBAL, PAGE } from './../../../CONSTANTS.js';

import { validator_name_of_new_project } from './../functions/validator_name_of_new_project';


class NewProject extends Component {
    constructor(props){
        super(props);

        this.str_createProject = 'Создать проект';
        this.str_ok = 'Готово';
        this.id_name = 'newProject';
        this.max_length = 250;
        this.plaseholder = 'Имя будущего проекта';

        this.state = {
            val: '',
            isOpen: false,
            butVal: this.str_createProject,
            isErr: false,
            errMassage: '',

        };

        this.setValue = this.setValue.bind(this);
        this.blure = this.blure.bind(this);
        //this.focus = this.focus.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
        this.enter = this.enter.bind(this);
        this.butClick = this.butClick.bind(this);
        this.openBut = this.openBut.bind(this);
        this.closedBut = this.closedBut.bind(this);
 
    }

    setValue( event ){
        let val = event.target.value;
        this.setState({
            val: val,
            isErr: false,
            errMassage: '',
        });
    }

    butClick(){
        if( !this.state.isOpen ){ // Закрыта, нужно открыть
            this.openBut();
        }else{
            if( this.state.val === '' ){
                this.closedBut();
            }else{
                
                this.enter();
            };
        }; 
    }
    openBut(){
        let button_selector =       '#'+this.id_name+' div.wrap button';
        let button_span_selector =  '#'+this.id_name+' div.wrap button span';
        let div_input_selector =    '#'+this.id_name+' div.wrap div';

        this.setState({
            isOpen: true,
            butVal: this.str_ok
        }); 
        $( button_selector ).css({
            "width": "92px", // 
            "border-radius": "0px 4px 4px 0px"
        });
        $( button_span_selector ).css({
            "opacity": "0"
        });
        $( div_input_selector ).css({
            "width": "calc( 99% - 92px )"
        });
        $( div_input_selector + ' input' ).focus();
        $( button_span_selector ).animate({opacity: "1"}, 400 );
    }

    closedBut(){
        let button_selector =       '#'+this.id_name+' div.wrap button';
        let button_span_selector =  '#'+this.id_name+' div.wrap button span';
        let div_input_selector =    '#'+this.id_name+' div.wrap div';

        this.setState({
            isOpen: false,
            butVal: this.str_createProject
        }); 

        $( button_selector ).css({
            "width": "155px", // 
            "border-radius": "4px 4px 4px 4px"
        });
        $( button_span_selector ).css({
            "opacity": "0"
        });
        $( div_input_selector ).css({
            "width": "0px",
            'color': '#00000000'
        });

        $( button_span_selector ).animate({opacity: "1"}, 400, () => {
            this.setState({
                val: ''
            });
        });
    }

    enter(){
        let res = validator_name_of_new_project( this.state.val, this.props.list );
        if( res.isErr ){ // ошибка есть
            $( '#'+this.id_name+' div.wrap div input' ).focus();
            this.setState({
                val: res.value,
                isErr: true,
                errMassage:  res.massage,
            });
        }else{
            this.setState({
                val: '',
                isErr: false,
                errMassage: '',
            });
            this.closedBut();
            this.sendToServer( res.value );
        };
    }

    blure( e ){
        if(e.relatedTarget === null){
            this.setState({
                val: '',
                isErr: false,
                errMassage: ''
            });
            this.closedBut();
        };
    }
    //focus(){}
    keyDown( e ){
        if( e.which === 13 ){ // Enter
            this.enter();
        };
    }

    sendToServer( val ){

        if( GLOBAL.IS_DEVELOPMENT ){
            console.dir('Отправляю на сервер это');
            console.dir( val );
        }else{
            $.ajax({
                url: this.props.href_for_post,
                type: "POST",
                data: {
                    name: val,
                    action: 'setNewProject',
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: ( data ) => {
                    //console.dir(data);
                    this.props.setNewList( data.listProjects );
                },
                error: function (msg) {
                    console.log( 'error при отправке аякса');
                } 
            });
        };
    }
    
	render(){
		return (
            <>
                <div id = "newProject">
                    <div className="wrap">
                        <div>
                            <input 
                                type = "text" 
                                className = "enterProject"
                                value = { this.state.val } 
                                placeholde = { this.plaseholder }
                                maxLength = { this.max_length }
                                onChange = { this.setValue } 
                                //autoFocus={ this.state.isOpen }
                                onBlur = { ( e ) => { this.blure( e ); } }
                                //onFocus = { () => { this.focus(); } }
                                onKeyDown = { this.keyDown }
                            />
                            <span 
                                className = { this.state.isErr? 'error': 'error noActive' }
                            >{ this.state.errMassage }</span>
                        </div>
                        
                        <button 
                            onClick = { this.butClick }
                            className = "enterProject"
                        >
                            <span className = "enterProject">{ this.state.butVal }</span>
                        </button>
                        
                    </div>
                </div>
            </>
		)
	}
};

export default NewProject;
