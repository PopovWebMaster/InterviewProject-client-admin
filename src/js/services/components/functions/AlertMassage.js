import $ from "jquery";

import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';


class AlertMassage {
    /*
        Предназначен для вывода сообщений на экран

    
    
    
    
    */

    constructor(){
        this.a = '222';
    }


    asq( name, callback ){
        callback( name );

    }

    info( header, infoText ){
        add_id_alertMassage()

        ReactDOM.render(
            <Info   infoText = { infoText }
                    head = { header }
            />,
            document.getElementById('alertMassage')
        );


    }
    

};

export default AlertMassage;





class Info extends Component{
    
    constructor(props){
        super(props);

        this.ok = this.ok.bind(this);
    }

    ok(){
        delete_id_alertMassage();
    }
    
    render(){
        return (
            <div className='infoWindow'>
                <div className='head'>
                    { this.props.head }
                </div>
                <div className='info'>
                    { this.props.infoText }
                </div>
                <div className ='resp'>
                    <div    className='ok'
                            onClick = { this.ok }
                    >Ok</div>
                </div>
            </div>
        );
    }

};




/*

class Info extends Component{
    constructor(props){
        super(props);
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
            <div className='dialogWindow'>
                <div className='info'>
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
        );
    }

};
*/





function add_id_alertMassage(){
    $("body").prepend("<div id='alertMassage'></div>");
};
function delete_id_alertMassage(){
    $("#alertMassage").remove();
};

















