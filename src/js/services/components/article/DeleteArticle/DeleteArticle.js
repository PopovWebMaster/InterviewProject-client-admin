import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './DeleteArticle.scss';

import { GLOBAL } from './../../../../CONSTANTS.js';

import Confirm from './../../Confirm';

class DeleteArticle extends Component {
    constructor(props){
        super(props);
        this.state = {
            ok: false,
            isOpen: false
        };
        this.action = this.action.bind(this);
        this.getStrAsq = this.getStrAsq.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.openConfirm = this.openConfirm.bind(this);
 
    }

    action( flag ){
        this.setState({
            ok: flag,
            isOpen: false
        });
    }

    getStrAsq( title ){
        return 'Вы действительно хотите безвозвратно удалить статью "'+title+'" ?';
    }

    openConfirm(){
        this.setState({
            isOpen: true
        });

    }

    showConfirm( asq ){
        return (
            <Confirm  
                asq = { asq }
                action = { this.action }
            />
        );
    }

    componentDidUpdate( prevProps, prevState ) {
        if( prevState.ok !== this.state.ok ){
            if( this.state.ok ){
                if( GLOBAL.IS_DEVELOPMENT ){
                    console.log('Отправка запроса на удаление на сервер');
                    console.log( this.props.href_for_post );
                }else{
                    $.ajax({
                        url: this.props.href_for_post,
                        type: "POST",
                        data: {
                            action: 'deleteArticle',
                            _token: $('meta[name="csrf-token"]').attr('content')
                        },
                        success: ( data ) => {
                            document.location.href = data.href;
                        },
                        error: function (msg) {
                            console.log( 'error при отправке аякса');
                        } 
                    });
                };

            };
        };
    }

    render(){
        return (
            <>
                <div className = 'editDelete_art'>
                    { this.state.isOpen? this.showConfirm( this.getStrAsq( this.props.title ) ): '' }
                    <span
                        onClick = { this.openConfirm }
                    >
                        Удалить статью
                    </span>
                </div>
            </>
            
        )
    }
};


export default DeleteArticle;




