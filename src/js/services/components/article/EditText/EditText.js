import $ from "jquery";

import React from 'react';
import { Component } from 'react';
import './EditText.scss';

import { GLOBAL } from './../../../../CONSTANTS.js';

import { Editor } from '@tinymce/tinymce-react'; 


class EditText extends Component {
    constructor(props){
        super(props);
        //this.state = {};

        this.handleEditorChange = this.handleEditorChange.bind(this);
    }


    handleEditorChange(e){
        let newText = e.target.getContent();
        this.props.setIsChenged(true);
        this.props.setText( newText );

    }

    render(){
        return (
            <Editor
                initialValue = { this.props.text }
                init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image', 
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste wordcount',
                    'link'
                ],
                toolbar:
                    'undo redo | formatselect | forecolor backcolor | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | link'
                }}
                onChange={ this.handleEditorChange }
            />
        )
    }
};

export default EditText;