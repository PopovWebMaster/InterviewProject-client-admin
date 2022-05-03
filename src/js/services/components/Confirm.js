//import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';

class Confirm extends Component{
    /*
        Его задача показать модальное окно с вопросов да или нет
        принимает два значения:

            asq: текст вопроса
            action: выбранное действие которое должно принять в себя true или false
    
    */
    constructor(props){
        super(props);

        this.state = {
            list: this.props.list
        };
        this.ok = this.ok.bind(this);
        this.cansel = this.cansel.bind(this);
    }

    ok(){
        this.props.action( true );
    }
    cansel(){
        this.props.action( false );
    }
    render(){
        return (
            <div id='confirm' > 
                <div id='dialogWindow'>
                    <div className='asq'>
                        { this.props.asq }
                    </div>
                    <div className ='resp'>
                        <div    className='ok'
                                onClick = { this.ok }
                        >Ok</div>
                        <div    className='cansel'
                                onClick = { this.cansel } 
                        >Cansel</div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Confirm;