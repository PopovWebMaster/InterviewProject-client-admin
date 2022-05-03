import $ from "jquery";
import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './ButtonWithInputGreen.scss';

import { GLOBAL } from './../../../../CONSTANTS.js';
import { check_valid_name } from './../../functions/check_valid_name.js';

/*
    Принимает:
    list_of_existing_names: [ /object/ ( список существующих имён )
        'Мой первый проект', 
        'словарь 2', ... 
    ]
    href_for_post   - /string/ ( адрес для post-запроса, чтоб создать новый проект/словарь )
    setNewList()    - /function/ ( метод от родительского компонента, записывает новый список проектов в родительский компонент)
    plaseholder     - /string/ 
    nameButton      - /string/
*/


class ButtonWithInputGreen extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            val: '',
            butIsOpen: false,
            butVal: this.props.nameButton,
            listNames: this.props.list_of_existing_names,
            isErr: false,
            errMassage: ''
        };

        this.ok = "Готово";
        this.maxlength = '250';
        this.errStyleOpen = {
            top: '42px',
            opacity: '1',
            transition: 'top 0.3s ease, opacity 0.8s ease'
        };
        this.errStyleClose = {
            top: '0',
            opacity: '0',
            transition: 'top 0.8s ease, opacity 0.3s ease'
        };

        this.setValue = this.setValue.bind(this);
        this.butClick = this.butClick.bind(this);
        this.submit = this.submit.bind(this);
        this.keypressEnter = this.keypressEnter.bind(this);
        this.openBut = this.openBut.bind(this);
        this.closedBut = this.closedBut.bind(this);

    }

    setValue( event ){
        let val = event.target.value;
        this.setState({
            val: val,
            isErr: false,
        });
        
    }

    butClick(){
        if( !this.state.butIsOpen ){ // Закрыта, нужно открыть
            this.openBut();
        }else{ // Открыта, нужно закрыть
            if( !this.state.isErr ){ // значение инпута валидно
                this.submit();
            };
        }; 
    }

    openBut(){
        let button = $('#ButtonWithInputGreen div button');
        let button_span = $('#ButtonWithInputGreen div button span');
        let div_input = $('#ButtonWithInputGreen div div');

        this.setState({
            butIsOpen: !this.state.butIsOpen,
            butVal: this.ok
        }); 
        $( button ).css({
            "width": "92px",
            "border-radius": "0px 4px 4px 0px"
        });
        $( button_span ).css({
            "opacity": "0"
        });
        $( div_input ).css({
            "width": "80%"
        });
        $('#ButtonWithInputGreen div div input').focus();
        $( button_span ).animate({opacity: "1"}, 400 );
    }

    closedBut(){
        let button = $('#ButtonWithInputGreen div button');
        let button_span = $('#ButtonWithInputGreen div button span');
        let div_input = $('#ButtonWithInputGreen div div');

        this.setState({
            val: '',
            butIsOpen: !this.state.butIsOpen,
            butVal: this.props.nameButton,
            isErr: false,
            errMassage: ''
        }); 

        $( button ).css({
            "width": "155px", 
            "border-radius": "4px 4px 4px 4px"
        });
        $( button_span ).css({
            "opacity": "0"
        });
        $( div_input ).css({
            "width": "0px",
            'color': '#00000000'
        });

        $( button_span ).animate({opacity: "1"}, 400, () => {
            this.setState({
                val: ''
            }); 
        });
    }

    submit(){

        let name = this.state.val;
        let listNames = this.state.listNames;
        let oldName = ''; // чтоб не путаться, она здесь не обязательна
        
        let resValidation = check_valid_name( name, listNames, oldName );

        if( !resValidation.isErr ){ // Ошибок валидации нет

            if( $.trim( name ) === '' ){
                return;
            };
            this.closedBut();

            if( GLOBAL.IS_DEVELOPMENT ){
                console.dir( 'Отправление на сервер' );
                console.dir( $.trim(name) );
                console.dir('');
            }else{
                $.ajax({
                    url: this.props.href_for_post,
                    type: "POST",
                    data: {
                        name: $.trim( name ),
                        action: this.props.action,
                        _token: $('meta[name="csrf-token"]').attr('content')
                    },
                    success: ( data ) => {
                        if( data.ok ){
                            //console.dir( data );
                            this.props.setNewList( data.listDictionaries );
                        }else{
                            //console.dir( data );
                            console.dir( '' );
                        };
                    },
                    error: function (msg) {
                        console.log('Ошибка при отправке аякса');
                    } 
                });
            };
        }else{ // Ошибка есть
            this.setState({
                isErr: true,
                errMassage: resValidation.massage
            });
        };

    }

    keypressEnter( event ){
        if( event.which === 13 ){   //нажат Enter
            if( this.state.butIsOpen ){
                this.submit();
            };
        };
    }

    componentDidMount(){

        $( document ).on( "keypress", this.keypressEnter );

        $( document ).on('click', (e) => {
            // закрывает инпут если он потерял фокус
            let res = true;
            let listParents = $( e.target ).parents();
            for( let i = 0; i < listParents.length; i++ ){
                if( listParents[i].id ){
                    if( listParents[i].id === 'ButtonWithInputGreen' ){
                        if( e.target.tagName !== "DIV" ){
                            res = false
                        };
                    };
                };
            };
            if( res ){
                if( this.state.butIsOpen ){
                    this.closedBut();
                };
            };
        });
    }
    
	componentWillUnmount(){
        $( document ).off( "keypress" );
        $('#ButtonWithInputGreen div div input').off( "focusout" );
    }

	render(){
		return (
            <>
                <div id = "ButtonWithInputGreen">
                    <div>
                        <div>
                            <input 
                                type = "text" 
                                value = { this.state.val } 
                                placeholde = { this.plaseholder }
                                maxLength = { this.maxlength }
                                onChange = { this.setValue } 
                            />
                            <span   className = "error"
                                    style = { this.state.isErr? this.errStyleOpen: this.errStyleClose }
                            >{ this.state.errMassage }</span>
                        </div>
                        
                        <button 
                            onClick = { this.butClick }
                        >
                            <span>{ this.state.butVal }</span>
                        </button>
                        
                    </div>
                </div>

            </>

		)
	}
};

export default ButtonWithInputGreen;
