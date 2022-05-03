import React from 'react';
import { Component } from 'react';


export default class TableRowMain extends Component {
    constructor(props){
        super(props);

        this.state = {
            enW: '',
            ruW: '',
        };

        /*
            this.props.index
            this.props.enW
            this.props.ruW
            this.props.isAudio
            this.props.isRepeat
        */

        this.setValueEnW = this.setValueEnW.bind(this);
        this.setValueRuW = this.setValueRuW.bind(this);
        this.deleteOneWord = this.deleteOneWord.bind(this);

    }

    setValueEnW( e ){
        let index = this.props.index;
        let enW =   e.target.value;

        this.setState({
            enW
        });
    }

    setValueRuW( e ){
        let index = this.props.index;
        let ruW =   e.target.value

        this.setState({
            ruW
        });
    }

    

    deleteOneWord(){

        console.log('deleteOneWord');

    }

    
    
};



