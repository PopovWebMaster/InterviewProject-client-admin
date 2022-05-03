import $ from "jquery";

import React from 'react';
//import ReactDOM from 'react-dom';
import { Component } from 'react';

import { GLOBAL } from './../../../CONSTANTS.js';
import AudioPlay from './../functions/AudioPlay.js';

class InsertAudio extends Component {
    constructor(props){
        super(props);
        this.state = {
            files: {},
            arrListWords: this.props.arrListWords,
            arrListAudio: this.props.arrListAudio,
            arrSortList: getSortList( this.props.arrListWords, this.props.arrListAudio ),
            arrSortListValues: getArrValues( getSortList( this.props.arrListWords, this.props.arrListAudio ) ),
        };

        this.permitionDeleteAudio = true;

        this.getToken = this.getToken.bind(this);
        this.sendFiles = this.sendFiles.bind(this);
        this.setFiles = this.setFiles.bind(this);
        this.createTableAudio = this.createTableAudio.bind(this);

        this.set_arrSortListValues = this.set_arrSortListValues.bind(this);
        this.processedList = this.processedList.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.eventsOn = this.eventsOn.bind(this);
        this.eventsOff = this.eventsOff.bind(this);

        this.deleteAudioFile = this.deleteAudioFile.bind(this);
        this.audioPlay = this.audioPlay.bind(this);
    }

    static getDerivedStateFromProps( nextProps, prevState ){
        if ( nextProps.arrListAudio !== prevState.arrListAudio) {
            return {
                arrListAudio: nextProps.arrListAudio,
                arrSortList: getSortList( nextProps.arrListWords, nextProps.arrListAudio ),
                arrSortListValues: getArrValues( getSortList( nextProps.arrListWords, nextProps.arrListAudio ) ),
            }
        };
        return null;
    }

    setFiles( e ){
        let files = e.currentTarget.files;
        this.setState({
            files: files
        });
    }

    sendFiles( event ){
        let files = this.state.files;

        
        let formData = new FormData( loadFiles ); 
        send_one_by_one = send_one_by_one.bind(this);
        send_one_by_one( files );

        function send_one_by_one( files ){

            let index = 0;
            send_one = send_one.bind(this);
            send_one();

            function send_one(){

                if( index < files.length ){
                    
                    formData.delete('audio[]');
                    formData.delete('audio');
                    formData.append('action', 'upload' );
                    formData.append( 'audio[]', files[ index ] );
                    index++;
                    
                    $.ajax({ 
                        url         : this.props.href_for_audio_files, // "http://en-v6/admin/workspace/audio/1"
                        type        : 'POST', 
                        data        : formData,
                        cache       : false,
                        //dataType    : 'json',
                        processData : false,
                        contentType : false, 
                        success     : ( data ) => {
                            if( data.ok ){
                                if( index < files.length ){
                                    if( files[ index ].size < 40000 ){
                                        send_one();
                                        setScaleUpload( index, files.length );
                                    };
                                }else{
                                    this.props.setArrListWords( data );
                                    setScaleUpload( index, files.length );
                                };
                            }else{
                                //console.dir( data );
                                console.dir( '' );
                            };  
                        },
                        error: ( jqXHR, status, errorThrown ) => {
                            console.log( 'Ошибка при отправке аудио файлов на сервер' );
                        }
                    });
                }
            };
        };
    }
    audioPlay( e, index ){
        let enW = this.state.arrSortList[index].name;
        let puth = this.props.href_for_audio_file;
        AudioPlay( enW, puth );
    }

    createTableAudio( arr ){
        if( arr.length === 0 ){
            return (
                <div style = {{
                    textAlign: 'center',
                    padding: '30px 0',
                    color: '#00000050'
                }}>
                    Список пуст
                </div>
            );;
        };
        let countGood = 0;
        let countBad = 0;
        let rows = arr.map( (item, index ) => {
            if( item.isGood ){
                countGood++;
            }else{
                countBad++;
            };
            return (
                <tr key = { index }>
                    <th className = { item.isGood? 'num good': 'num bad' }>{ index + 1 }</th>
                    <th className = "audioName">
                        <input  type='text' 
                                className = { item.isGood? 'good': 'bad' }
                                value = { this.state.arrSortListValues[ index ].name } 
                                onChange = { ( e ) => {
                                    this.set_arrSortListValues( e, index );
                                } }
                        />
                    </th>
                    <th className = 'expansion'>.mp3</th>   
                    <th className = "audition">
                        <span   className = "icon-volume-up"
                                onClick = { (e) => {
                                    this.audioPlay( e, index );
                                }}
                        ></span>
                    </th>
                    <th     className = "deletItem"
                            onClick = { ( e ) => { 
                                this.deleteAudioFile( e, index );
                            } } 
                    ><span>Удалить</span>
                    </th>
                </tr>
            );   
        });
        
        return(<>
            <div className = 'audioItog'>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Всего:</th>
                            <th>{ arr.length }</th>
                        </tr>
                        <tr>
                            <th>Совпадает со списком:</th>
                            <th>{ countGood }</th>
                        </tr>
                        <tr>
                            <th>Не совпадает:</th>
                            <th>{ countBad }</th>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            
            <table id='tableAudio'>
                <caption>Список всех загруженных аудиофайлов</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    { rows }
                </tbody>

                <tfoot>
                    <tr>
                        <th></th>
                        <th>
                            {/*<span>Совпадает со списком: { countGood }</span><br/>
                            <span>Не совпадает: { countBad }</span>*/}
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>

            </table>
        </>);
    }

    set_arrSortListValues( e, index ){
        let arr = this.state.arrSortListValues;
        arr[index].name = e.target.value;
        this.setState({
            arrSortListValues: arr
        });
    }

    processedList( index ){
        
        let oldName = this.state.arrSortList[index].name;
        let newName = this.state.arrSortListValues[index].name;

        if( GLOBAL.IS_DEVELOPMENT ){
            this.setState({
                arrSortList: getArrValues( this.state.arrSortListValues )
            });
            
        }else{
            if( oldName === undefined ){
                return;
            };
            if( newName === undefined ){
                return;
            };
            $.ajax({
                url: this.props.href_for_audio_files,
                type: "POST",
                data: {
                    action: 'rename',
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    oldName: oldName,
                    newName: newName
                },
                success: ( data ) => {
                    if( data.ok ){
                        this.props.setArrListWords( data );
                    }else{
                        console.dir( '' );
                        //console.dir(data);
                    };
                    
                },
                error: function (msg) {
                    console.log( 'Ошибка при отправке аякса. В InsertAudio/ processedList()' );
                } 
            });
            
        };

    }

    deleteAudioFile( e, index ){

        let audioName = this.state.arrSortListValues[ index ].name;

        if( GLOBAL.IS_DEVELOPMENT ){
            console.log( audioName, 'Удаление');
        }else{
            if( this.permitionDeleteAudio ){
                this.permitionDeleteAudio = false;
                $.ajax({
                    url: this.props.href_for_audio_files,
                    type: "POST",
                    data: {
                        action: 'delete',
                        _token: $('meta[name="csrf-token"]').attr('content'),
                        delete_files: [
                            audioName
                        ]
                    },
                    success: ( data ) => {
                        if( data.ok ){
                            this.permitionDeleteAudio = true;
                            this.props.setArrListWords( data );
                        }else{
                            console.dir( '' );
                            //console.dir(data);
                        };
                    },
                    error: function (msg) {
                        this.permitionDeleteAudio = true;
                        console.log( 'Ошибка при удалении аудиофайла. Что-то или на сервере, или с аяксом');
                    } 
                });
            };
        };
    }


    keyDown( e ){
        if( e.which === 13){	    // Enter

            if( $('#project textarea.descriptionProject').is(":focus") ){ // фокус на заметках
                // пока ничего не делать (не придумал зачем)
            }else if( $('#tableAudio tbody input').is(":focus") ){ //фокус на инпуте
                let index = undefined;
                let inputs = $('#tableAudio tbody input');
                for( let i = 0; i < inputs.length; i++ ){
                    let indexfor = $('#tableAudio tbody input').eq(i).is(":focus");
                    $('#tableAudio tbody input').eq(i).blur();
                    if( indexfor ){
                        index = i;
                    }; 
                };
                this.processedList( index );
            };
        };
    }

    eventsOn(){
        this.eventsOff();

        $(document).on("keydown", this.keyDown );
    }

    eventsOff(){
        $(document).off("keydown");
    }
    
    
    getToken(){
        return $('meta[name="csrf-token"]').attr('content');
    }

    componentDidUpdate(){
        this.eventsOn();
    }

    
    componentWillUnmount(){
        this.eventsOff();
    }

    render(){
        return (
            <div id = 'insertAudio'>
                <form id = "loadFiles" encType="multipart/form-data">
                    <input name="_token" type="hidden" value={ this.getToken() } />
                        
                    <div>
                        <input  id = 'audio_id' 
                                type="file"
                                multiple 
                                name="audio[]" 
                                onChange = { this.setFiles }
                        />
                    </div>

                    <div    id = "loadFiles_submit"
                            onClick = { this.sendFiles }
                    >Загрузить</div>
                </form>
                <div className = "audioScale">
                    <div></div>
                    <div></div>
                </div>

                <div>
                    { this.createTableAudio( this.state.arrSortList ) }
                </div>

            </div>
        );
    }
};

export default InsertAudio;






function getSortList( arrListWords, arrListAudio ){ // this.props.arrListWords, this.props.arrListAudio

    let arr = [];

    if( arrListAudio.length !== 0 ){

        for( let i = 0; i < arrListAudio.length; i++ ){
            let nameAudio = arrListAudio[ i ];
            let isGood = false;
            for( let y = 0; y < arrListWords.length; y++ ){
                if( arrListWords[ y ].enW === nameAudio ){
                    isGood = true;
                };
            };

            arr.push( {
                name: nameAudio,
                isGood: isGood
            } );
            
        };
    };

    // Сортировка по алфавиту
    let flag = true;
    let newarr = arr;
    if( newarr.length !== 0 ){
        while( flag ){
            let flag2 = false;
            for( let i = 0; i < newarr.length; i++){
                if( newarr[i+1] !== undefined ){
                    if( newarr[i].name.toLowerCase() > newarr[i+1].name.toLowerCase() ){
                        let a = newarr[i+1];
                        let b = newarr[i];
                        newarr[i] = a;
                        newarr[i+1] = b;
                        flag2 = true;
                    };
                };  
                flag = flag2;
            };
        };
    };
    
    return newarr;
};



function  getArrValues( arr ) {
    if( arr.length === 0 ){
        return [];
    };

    let newarr = [];

    for( let i = 0; i < arr.length; i++){
        let obj = {
            name: arr[i].name,
            isGood: arr[i].isGood
        };
        newarr.push( obj );
    };
    return newarr;
}



function setScaleUpload( index, length ){
    let elem = $("#insertAudio .audioScale div:last-child");

    let procent = Math.floor( (index*100)/(length-1) );

    if( procent > 100 ){
        procent = 100;
    };
    procent = procent + '%';

    $( elem ).css( 'width', procent );

    if( index === (length-1) || index > (length-1) ){
        $( elem ).animate(
            { opacity: "0" }, 
            {
                duration: 800,
                easing: 'swing',
                complete: () =>{
                    $( elem ).css( {
                        width: '0%',
                        opacity: '1'
                    });
                }
            }
        );
    };
};





















