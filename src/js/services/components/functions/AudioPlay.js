//AudioPlay

let permission = true;

let duration;


export default function( enW, PUTH ){
  
    if( permission ){
        permission = false;

        // чтоб не было дурных кликов на аудио
        // разрешает следующий клик только полсе того как отыграет аудио файл
        let timerId = setTimeout( () => {
            permission = true;
            clearTimeout( timerId );
        }, duration );
        //конец
        
        let path = PUTH + '/' + enW + '.mp3';
        
        /*
        let audio = new Audio();
        audio.src = path;
        audio.src = "http://en-v6/storage/audio/12/woman.mp3";
        audio.type="audio/mp3";
        audio.autoplay = true;
        */    

        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        play( path );

        function play( snd ) {
            //var audioCtx = new AudioContext(); // исходник
            let audioCtx;

            try {
                audioCtx =
                    new (window.AudioContext || window.webkitAudioContext)();
                } catch (error) {
                window.alert(
                    `Извините, но ваш браузер не поддерживает Web Audio API!`
                );
            };

            var request = new XMLHttpRequest();
            request.open( "GET", snd, true );
            request.responseType = "arraybuffer";
            request.onload = () => {
                var audioData = request.response;
         
                audioCtx.decodeAudioData(
                    audioData,
                    ( buffer ) => {
                        var smp = audioCtx.createBufferSource();
                        smp.buffer = buffer;
                        smp.connect( audioCtx.destination );
                        duration = Math.floor( smp.buffer.duration * 1000 ); // smp.buffer.duration * 1000;
                        smp.start( 0 );
                    },
                    ( e ) => {
                        alert( "Error with decoding audio data" + e.err );
                    }
                );
            };
            request.send();
        };
         

    };

            

        
    






    
};	


