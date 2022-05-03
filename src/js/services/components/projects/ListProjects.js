import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';

import Confirm from './../Confirm.js'; 

class ListProjects  extends Component {
    constructor(props){
        super(props);

        this.state = {
            list: this.props.list,
            isOpen: false,
            resultConfirm: false,
            deletedProject: '',
            deletedProjectId: null
        };

        this.create = this.create.bind( this );
        this.deleteProject = this.deleteProject.bind( this );
        this.showConfirm = this.showConfirm.bind( this );
        this.getStrAsq = this.getStrAsq.bind(this);
        this.setResultConfirm = this.setResultConfirm.bind(this);
        this.runDeleted = this.runDeleted.bind(this);

    }
    getStrAsq( name ){
        return 'Проект "'+name+'" будет удалён безвозвратно, продолжить удаление?';
    }

    create( list ){
        if( list.length === 0 ){
            return '';
        };
        let items = list.map((item, key) =>{
            let date = new Date( item.date.date );
            let options = {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            };

            let dateStr = date.toLocaleString("ru", options);

            return  <li key={ key }>
                        <div className='projectLink'>
                            <a href={ item.href } >{item.name}</a>
                        </div>
                        <div className='projectDescription'>
                            <span>{ item.author }</span>
                            <span>{ dateStr }</span>
                            <span className = { item.status === 0? '': 'project_published' }>
                                { item.status === 0? 'Не опубликован': 'Опубликован' }
                            </span>
                            <span className="delete">
                                <div    className="deleteBut"
                                        onClick = { () => { 
                                            this.deleteProject( item.id_project, item.name ); 
                                        } }
                                >
                                    Удалить
                                </div>
                            </span>
                        </div>
                    </li>;
        });
        return items;
    }

    deleteProject( id, name ){
        this.setState({
            isOpen: true,
            deletedProject: name,
            deletedProjectId: id
        });
    }
    runDeleted( res ){
        if( res){
            $.ajax({
                url: this.props.href_for_post,
                type: "POST",
                data: {
                    action: 'deleteProject',
                    id: this.state.deletedProjectId,
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: ( data ) => {
                    //console.dir(data);
                    this.props.setNewList(data.listProjects);

                },
                error: function (msg) {
                    console.log( 'error при отправке аяксом');
                }
            });
            this.setState({
                resultConfirm: null,
                deletedProject: null,
                deletedProjectId: null
            });
        };
    }

    setResultConfirm( result ){
        this.setState({
            resultConfirm: result,
            isOpen: false
        });
        this.runDeleted( result );
    }
    
    static getDerivedStateFromProps( nextProps, prevState ) {
        if (nextProps.list !== prevState.list) {
            return {list: nextProps.list };
        };
        return null;
    }

    showConfirm( asq ){
        return (
            <Confirm  
                asq = { asq }
                action = { this.setResultConfirm }
            />
        );
    }

    render(){
        return (
            <>
                { this.state.isOpen? this.showConfirm( this.getStrAsq( this.state.deletedProject ) ): '' }
                <ul id = 'projectList'>
                    { this.state.list.length !== 0? this.create( this.state.list ):'Пусто' }
                </ul>
            </>
        );
    }
};

export default ListProjects;
