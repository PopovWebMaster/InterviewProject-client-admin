//import $ from "jquery";
import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';

import { GLOBAL } from './../../CONSTANTS.js';

class App extends Component{
    // Предназначен для использования только в режиме отладки
    constructor(props){
        super(props);
    }
    render(){
		return (
            <>
                <aside id="enter">
                    <div id="enter_page" >
                        <span className = "us_name">Имя пользователя</span>
                        <span className = "icon-user"></span>
                        <a  className = "enter_exit" href = "/vremIndex'">Выход</a>
                    </div>
                </aside>
                <section id = 'adminPage'>
                    <article>
                        <header>
                            <img src = { this.props.GLOBAL.CURRENT_PAGE.img } alt="" />
                            <h2 className = "accent1">{ this.props.GLOBAL.CURRENT_PAGE.title }</h2>
                        </header>
                        <div id = { this.props.GLOBAL.CURRENT_PAGE.id }></div>
                    </article>
                </section>
                <div 
                    id = "jsonMassage" 
                    style = {{display: 'none'}} 
                >{ JSON.stringify( this.props.GLOBAL.FALSE_MASSAGE ) }</div>
            </>
        );
    }
};

export const AddConteinerToMain = function(){
    ReactDOM.render(
        <App GLOBAL = { GLOBAL } />,
        document.getElementsByTagName('main')[0]
    );
};