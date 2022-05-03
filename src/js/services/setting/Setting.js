import React from 'react';
// //import ReactDOM from 'react-dom';
// import { Component } from 'react';

import './Setting.scss';

// import { GLOBAL } from './../../CONSTANTS.js';
import { ID, INPUT_TYPE } from './config.js';
import { get_a_clone_of_an_object } from './../components/functions/get_a_clone_of_an_object.js';

import MainApp              from './components/MainApp.js';

import InputText            from './components/InputText/InputText.js';
import InputNumberList      from './components/InputNumberList/InputNumberList.js';
import InputSwitch          from './components/InputSwitch/InputSwitch.js';



export default class Setting extends MainApp{
    constructor(props){
        super(props);

        this.state = {
            isChenged: false,

            arrListSettings: get_a_clone_of_an_object( this.props.massage.arrListSettings ),

        };

        this.createListInputs = this.createListInputs.bind(this);
        this.setIsChenged = this.setIsChenged.bind(this);
        this.setValueInto_arrListSettings = this.setValueInto_arrListSettings.bind(this);

    }

    setIsChenged(){
        this.setState({
            isChenged: true
        });
    }

    setValueInto_arrListSettings( params ){
        let key =   params.key;
        let value = params.value;

        let arr = { ...this.state.arrListSettings };
        arr[ key ].value = value;

        this.setState({
            arrListSettings: arr,
        });

    }

    createListInputs( arrListSettings ){

        let arr = arrListSettings;

        let inputs =  Object.keys( arr ).map( ( key, index ) => {

            let input_type = this.determine_the_type_of_input({
                interval: arr[key].interval,
            });

            let InputComponent;
            
            let get_a_component_with_props = ( Component) => {
                return (
                    <React.Fragment key = { index }>
                        <Component 
                            value =         { arr[key].value  }
                            description =   { arr[key].description  }
                            name =          { key }
                            interval =      { arr[key].interval }
                            setIsChenged =  { this.setIsChenged }
                            setValue =      { this.setValueInto_arrListSettings }
                        />
                    </React.Fragment>
                );
            };

            switch ( input_type ) {
            
                case INPUT_TYPE.TEXT:
                    InputComponent = get_a_component_with_props( InputText );
                    break;

                case INPUT_TYPE.NUMBER_LIST:
                    InputComponent = get_a_component_with_props( InputNumberList );
                    break;

                case INPUT_TYPE.SWITCH:
                    InputComponent = get_a_component_with_props( InputSwitch );
                    break;

                default: 
                    return '';
            };

            return InputComponent;
        });

        return inputs;
    }
    
    render(){
		return (
            <div id = { ID }>
                <form>
                    { this.createListInputs( this.state.arrListSettings ) }
                    { this.createButtonPanel( this.state.isChenged ) }
                </form>
            </div>
        );
    }

};
