import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
// import "babel-polyfill";

import { GLOBAL } from './../CONSTANTS.js';
import EditTitle from './components/article/EditTitle/EditTitle.js'; 
import EditSecondTitle from './components/article/EditSecondTitle/EditSecondTitle.js'; 
import EditAlias from './components/article/EditAlias/EditAlias.js'; 
import EditOrder from './components/article/EditOrder/EditOrder.js'; 
import EditStatus from './components/article/EditStatus/EditStatus.js'; 
import EditText from './components/article/EditText/EditText.js'; 
import ButtonsSaveCancel from './components/article/ButtonsSaveCancel/ButtonsSaveCancel.js'; 
import DeleteArticle from './components/article/DeleteArticle/DeleteArticle.js'; 

export default class App extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            isChenged: false,
            title: this.props.massage.title,
            errTitle: {
                isErr: false,
                massage: ''
            },
            second_title: this.props.massage.second_title,
            errSecondTitle: {
                isErr: false,
                massage: ''
            },
            alias: this.props.massage.alias,
            errAlias: {
                isErr: false,
                massage: ''
            },
            order: this.props.massage.order,
            status: Boolean( this.props.massage.status ),
            text: this.props.massage.text

        };

        this.setIsChenged = this.setIsChenged.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setSecondTitle = this.setSecondTitle.bind(this);
        this.setAlias = this.setAlias.bind(this);
        this.setOrder = this.setOrder.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.setText = this.setText.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
        this.getParamsFromSendToServer = this.getParamsFromSendToServer.bind(this);
        this.canselIsChenged = this.canselIsChenged.bind(this);

        //console.dir( this.props.massage );

    }

    setIsChenged( flag ){
        this.setState({
            isChenged: flag
        });
    }

    setTitle( title ){
        let title_trim = title.trim();

        if( title_trim === '' ){
            this.setState({
                title: title_trim,
                errTitle: {
                    isErr: true,
                    massage: 'Данное поле обязательно к заполнению'
                }
            });
            return;
        };

        let regex = /^[0-9a-zA-ZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ \.\-\?\',:;!=\+@#\$%&\*\(\)"]+$/;
        let isValidTitle = regex.test( title_trim );

        if(isValidTitle){

            if( title_trim.toLowerCase() === this.props.massage.title.toLowerCase() ){
                this.setState({
                    title: title_trim,
                    errTitle: {
                        isErr: false,
                        massage: ''
                    },
                });
            }else{

                let isNewTitle = true;
                for( let item of this.props.massage.arrListOfTitles ){
                    let itemTitle = item.toLowerCase();
                    let newTitle = title_trim.toLowerCase();
                    if( itemTitle === newTitle ){
                        isNewTitle = false;
                    };
                };

                
                if( isNewTitle ){
                    this.setState({
                        title: title_trim,
                        errTitle: {
                            isErr: false,
                            massage: ''
                        },
                    });
                }else{
                    this.setState({
                        title: title_trim,
                        errTitle: {
                            isErr: true,
                            massage: 'Статья с таким заголовком уже существует. Заголовок должен быть уникальным'
                        },

                    });
                };
            };

            this.setIsChenged( true );
        }else{
            this.setState({
                title: title_trim,
                errTitle: {
                    isErr: true,
                    massage: 'В названии статьи можно использовать только кирилические, латинские символы, цифры и знаки .-?\',:;!=+@#$%&*()\"'
                },
            });
        };
    } 

    setSecondTitle( secondTitle ){

        let second_title = secondTitle.trim();

        if( second_title === '' ){
            this.setState({
                second_title: second_title,
                errSecondTitle: {
                    isErr: false,
                    massage: ''
                },
            });
        }else{
            let regex = /^[0-9a-zA-ZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ \.\-\?\',:;!=\+@#\$%&\*\(\)"]+$/;
            let isValidTitle = regex.test( second_title );
            this.setIsChenged( true );
            if( isValidTitle ){
                this.setState({
                    second_title: second_title,
                    errSecondTitle: {
                        isErr: false,
                        massage: ''
                    },
                });
            }else{
                this.setState({
                    second_title: second_title,
                    errSecondTitle: {
                        isErr: true,
                        massage: 'В слогане статьи можно использовать только кирилические, латинские символы, цифры и знаки .-?\',:;!=+@#$%&*()\"'
                    },
                });
            };
        };  
    }

    setAlias( alias ){

        let alias_trim = alias.trim();

        if( alias_trim === '' ){
            this.setState({
                alias: alias_trim.toLowerCase(),
                errAlias: {
                    isErr: true,
                    massage: 'Данное поле обязательно к заполнению'
                }
            });
        }else{
            let isValidAlias = /^[0-9a-zA-Z_-]{1,150}$/.test( alias_trim );
            if( isValidAlias ){
                if( alias_trim.toLowerCase() === this.props.massage.alias.toLowerCase() ){
                    this.setState({
                        alias: alias_trim.toLowerCase(),
                        errAlias: {
                            isErr: false,
                            massage: ''
                        },
                    });
                }else{
                    let isNewAlias = true;
                    for( let item of this.props.massage.arrListOfAliases ){
                        let itemAlias = item.toLowerCase();
                        let newAlias = alias_trim.toLowerCase();
                        if( itemAlias === newAlias ){
                            isNewAlias = false;
                        };
                    };

                    this.setIsChenged( true );
                    if( isNewAlias ){
                        this.setState({
                            alias: alias_trim.toLowerCase(),
                            errAlias: {
                                isErr: false,
                                massage: ''
                            },
                        });
                    }else{
                        this.setState({
                            alias: alias_trim.toLowerCase(),
                            errAlias: {
                                isErr: true,
                                massage: 'Статья с таким псевдонимом уже существует. Псевдоним должен быть уникальным'
                            },
                        });
                    };
                };
            }else{
                this.setState({
                    alias: alias_trim.toLowerCase(),
                    errAlias: {
                        isErr: true,
                        massage: 'Данный псевдоним содержит запрещённые символы. Можно использовать только латинские символы, цифры и знаки -_. Также он не должен превышать длины в 150 символов.'
                    }
                });
            }; 
        };  
    }

    setOrder( newOrder ){
        if( Number( newOrder ) === Number( this.props.massage.order ) ){
            return;
        };
        this.setIsChenged( true );
        this.setState({
            order: Number( newOrder )
        });
    }

    setStatus( newStatus ){
        this.setIsChenged( true );
        this.setState({
            status: Boolean( newStatus )
        });
    }

    setText( newText ){
        this.setIsChenged( true );
        this.setState({
            text: newText
        });
    }

    getParamsFromSendToServer(){
        return {
            title: this.state.title,
            second_title: this.state.second_title,
            alias: this.state.alias,
            order: this.state.order,
            status: this.state.status,
            text: this.state.text
        }
    }

    sendToServer(){
        if( this.state.errTitle.isErr ){
            return;
        }else if( this.state.errAlias.isErr ){
            return;
        };
    
        let params = this.getParamsFromSendToServer();

        if( GLOBAL.IS_DEVELOPMENT ){
            console.log('Это отправляем на сервер');
            console.dir( params );
            console.log('');
        }else{
            
            $.ajax({
                url: this.props.massage.href_for_post,
                type: "POST",
                data: {
                    params: params,
                    action: 'setNewParamsOneArticle',
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: ( data ) => {
                    if( data.ok ){
                        document.location.href = data.href;
                        //console.dir(data); 
                    }else{
                        //console.dir(data); 
                        console.dir(''); 
                    };  
                },
                error: function (msg) {
                    console.log( 'error при отправке аякса');
                } 
            });
        };
    }

    canselIsChenged(){
        this.setState({
            title: this.props.massage.title,
            isChenged: false,
            errTitle: {
                isErr: false,
                massage: ''
            },
            second_title: this.props.massage.second_title,
            alias: this.props.massage.alias,
            errAlias: {
                isErr: false,
                massage: ''
            },
            order: this.props.massage.order,
            status: Boolean( this.props.massage.status ),
            text: this.props.massage.text
        });
    }

    componentDidUpdate( prevProps, prevState ) { 
        if( this.state.isChenged !== prevState.isChenged && !this.state.isChenged ){ // нажата отмена 
            this.canselIsChenged();
        };
    }

    render(){
		return (
            <div id = 'article_admin'>
                <EditTitle 
                    title = { this.state.title }
                    setTitle = { this.setTitle }
                    errTitle = { this.state.errTitle }
                    isChenged = { this.state.isChenged }
                />
                <EditSecondTitle 
                    second_title = { this.state.second_title }
                    setSecondTitle = { this.setSecondTitle }
                    isChenged = { this.state.isChenged }
                    errSecondTitle = { this.state.errSecondTitle }
                />

                <EditAlias 
                    alias = { this.state.alias }
                    setAlias = { this.setAlias }
                    errAlias = { this.state.errAlias }
                    isChenged = { this.state.isChenged }
                />
                <EditOrder 
                    oldOrder = { this.props.massage.order }
                    arrListOfOrders = { this.props.massage.arrListOfOrders }
                    setOrder = { this.setOrder }
                />
                <EditStatus 
                    status = { this.state.status }
                    setStatus = { this.setStatus }
                    isChenged = { this.state.isChenged }
                />

                <EditText 
                    text = { this.state.text }
                    setIsChenged = { this.setIsChenged }
                    setText = { this.setText } 
                />

                <ButtonsSaveCancel
                    isChenged = { this.state.isChenged }
                    sendToServer = { this.sendToServer } 
                    canselIsChenged = { this.canselIsChenged }
                />

                <DeleteArticle 
                    href_for_post = { this.props.massage.href_for_post }
                    title = { this.props.massage.title }
                    
                />
                
            </div>
        );
    }
    
};
