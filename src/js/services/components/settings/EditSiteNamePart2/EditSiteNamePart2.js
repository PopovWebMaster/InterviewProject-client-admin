import $ from "jquery";

import React from 'react';
import { Component } from 'react';
import './EditSiteNamePart2.scss';
//import { GLOBAL } from '../../../../CONSTANTS.js';

class EditSiteNamePart2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,  
            isErr: this.props.error.isErr, 
            errMassage: this.props.error.massage 
        };
        // начало настроек
        this.elem_className = 'editSiteNamePart2';              // <- здесь
        this.className_nameItem = 'nameItem_set';               // <- здесь
        this.className_item = 'item_set';                       // <- здесь
        this.className_editItem = 'editItem_set';               // <- здесь
        this.className_label_err = 'label_err_set';             // <- здесь
        this.setResult = this.props.set_site_name_part_2_val;   // <- здесь
        this.max_length = '250';                                // <- здесь
        // конец настроек

        this.selector_input = '.' + this.elem_className + ' .' + this.className_editItem + ' input';
        this.selector_hr = '.' + this.elem_className + ' .' + this.className_editItem + ' hr';

        this.input_backgroundColor = ''; // не трогать
        this.input_backgroundColor_gray = '#00000008'; // не трогать
        
        this.setValue = this.setValue.bind(this);
        this.focus = this.focus.bind(this);
        this.blure = this.blure.bind(this);
        this.keyDown = this.keyDown.bind(this);

    }

    setValue( e ){
        this.setState({
            value: e.target.value
        });
    }

    blure(){
        let input = document.querySelector( this.selector_input );
        let hr = document.querySelector( this.selector_hr );
        input.style.backgroundColor = this.input_backgroundColor; 
        hr.style.width = '0%';
        this.setResult( this.state.value );
    }

    focus(){
        let input = document.querySelector( this.selector_input );
        let hr = document.querySelector( this.selector_hr );
        input.style.backgroundColor = this.input_backgroundColor_gray;
        hr.style.width = '100%';
    }

    keyDown( e ){
        if( e.which === 13 ){ // Enter
            this.blure();
            document.querySelector( this.selector_input ).blur();
        };
    }

    componentDidMount(){
        let input = document.querySelector( this.selector_input );
        this.input_backgroundColor = $( input ).css( 'background-color' );
    }

    componentDidUpdate( prevProps, prevState ) {

        if ( this.props.error !== prevProps.error ) {
            this.setState({
                isErr: this.props.error.isErr,
                errMassage: this.props.error.massage
            });
        };

        if( this.props.value !== prevProps.value ){
            this.setState({
                value: this.props.value
            });
        };

        if( this.props.isChenged !== prevProps.isChenged && !this.props.isChenged ){ // нажата отмена 
            this.setState({
                value: this.props.value
            });
        };
    }

    render(){
        return (
            <div className = { this.elem_className +' '+ this.className_item }>
                <div className = { this.className_nameItem }>
                    <span>{ this.props.description }:</span>
                </div>
                <div className = { this.className_editItem  }>
                    <input  name = 'name1'
                            type ='text' 
                            value = { this.state.value } 
                            maxLength = { this.max_length }
                            onChange = { this.setValue }
                            autoFocus={ this.state.isErr }
                            onBlur = { () => { this.blure(); } }
                            onFocus = { () => { this.focus(); } }
                            onKeyDown = { this.keyDown }
                    />
                    <hr/>
                    <label className = { this.className_label_err }>{ this.state.errMassage }</label>
                </div>
            </div>
        )
    }
};


export default EditSiteNamePart2;