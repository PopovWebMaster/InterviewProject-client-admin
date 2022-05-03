import { IS_DEVELOPMENT } from './../CONSTANTS.js';

export const PROJECT = function(){

    if( !IS_DEVELOPMENT ){
        return {};
    };
    
    return {
        name: "second project",

        author: "anna",
        status: 0,
        //words:'[{"enW":"words","ruW":"слова","isAudio":{"exists":false},"isRepeat":{"exists":false,"dictionary":false,"project":false}}]',
        words: [ {enW:"words", ruW:"слова", isAudio:{ exists:true }, isRepeat:{exists:true, dictionary:false, project:'Мой первый проект' }},{enW:"wordsA", ruW:"словаА", isAudio:{ exists:true }, isRepeat:{exists:true, dictionary:false, project:'Мой первый проект' }} ],
        audioList: [  "chair", "airport", "bridge", "also", "words", "animal", "apple", "armchair","butter","artist","aunt", "balcony",  "brother", "building", "businessman",  "carpet", "carrot", "NEWacenter", "cat", "ceiling", "center",  "NEWcenter"],
        created_at: {
            date: "2019-09-20 11:12:00.000000", 
            timezone_type: 3, 
            timezone: "UTC"
        },
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a nostrum magni facere. Quia, tempore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a nostrum magni facere. Quia, tempore?",
        href_for_post: "http://en-v6/admin/workspace/project/2",
        href_for_audio_files: "http://en-v6/admin/workspace/audio/1",
        href_for_audio_file: "http://en-v6/storage/audio/1",
        instruction: [
            "Одна строка - это одна пара слов 'english - русское' или 'русское - english'.",
            "В качестве разделителя можно использовать любые символы, но обязательно в этом разделителе должен присутствовать хотя-бы один пробел.",
            "В английском слове можно использовать только латинские символы. Запрещено использовать кирилицу и числа",
            "В русском слове можно использовать или только кирилические символы или только числа (для обозначения числительных)",
            "В английском слове можно использовать такие символы: ',.-!?() Все остальные символы использовать запрещено",
            "В русском слове можно использовать (если оно не числительное): !?,.-()"
        ],
        action: {
            deleteOneWord:  "deleteOneWord",
            getWords:       "getWords",
            setDescription: "setDescription",
            setNewWords:    "setNewWords",
            updateWords:    "updateWords",
        },

    };

};