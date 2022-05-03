import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';
import './EditProject.scss';

import { GLOBAL } from './../../../CONSTANTS.js';


class EditProject extends Component {
    constructor(props){
        super(props);

        this.empty_value = 'нет';

        this.state = {
            newProjectId: this.props.projectId,
            newProjectName: this.props.projectName,
            arrListFreeProjects: this.getArrListProjects( this.props.arrListFreeProjects )   
        };

        this.createSelect = this.createSelect.bind(this);
        this.setSelect = this.setSelect.bind(this);
    }

    getArrListProjects( arr ){
        let list = arr;

        let flag = false;
        for( let item of list ){
            if( item.id === this.props.oldProjectId ){
                flag = true;
                break;
            };
        };
        if( flag ){ return list;};
        let obj = {
            id: this.props.oldProjectId,
            name: this.props.oldProjectName
        };
        list.push(obj);
        return list;
    }

    createSelect( new_id ){

        let arr = this.state.arrListFreeProjects;

        let option = arr.map( ( item, index ) => {
            return (
                <option key = {index} 
                        value = { item.id }
                >
                    { item.name }
                </option>
            )

        });

        return (
            <select value={ (this.state.newProjectId === null)? this.empty_value: this.state.newProjectId }
                    onChange={ this.setSelect }
            >
                <option     value = { this.empty_value }
                >---</option>
                { option }
            </select>
        );
 
    }

    setSelect( e ){
        let val = e.target.value;
        let new_name = null;
        let new_id = null;

        if( val === this.empty_value ){
            new_id = null;
            new_name = null;
        }else{
            new_id = Number( val );
            for( let item of this.state.arrListFreeProjects ){
                if( item.id === new_id ){
                    new_name = item.name;
                    break;
                };
            };
        };

        this.setState({
            newProjectId: new_id,
            newProjectName: new_name
        });
        
        this.props.setProject( new_id, new_name );

    }

    render(){
        return (
            <div className = 'editProject_dic'>

                <div className = 'nameItem_dic'>
                    <span>Проект <span className = 'editProjectName_dic'>({ this.props.oldProjectName !== null? this.props.oldProjectName: '_' })</span>:</span>
                </div>

                <div className = 'editItem_dic'>
                    <div>
                        { this.createSelect( this.state.newProjectId ) }
                    </div>
                </div>
            </div>
            
        )
    }
};


export default EditProject;




