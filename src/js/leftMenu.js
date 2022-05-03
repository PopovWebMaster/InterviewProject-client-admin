import $ from "jquery";


export default class LeftMenu {

    constructor() {
        this.SPEED_ANIMATE = 300;

        this.menu = $("nav#nav_main");
        this.isGoodClick = true;

        this.value_in_session = null;
        this.itemSessionIndex = 0; // имя для ячейки в сессии здесь хранится индекс клика если клик был не на главной странице

        this.stopBadClick = this.stopBadClick.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);


        this.preparesMenuAtStart();
        this.runEvents();


    }

    // ВОЗВРАЩАЕТ ОБЪЕКТ ТЕКУЩИХ ПАРАМЕТРОВ МЕНЮ
    
    getParam(){
        /* 
            {
                menuWidth: '',
                positionLeft: '',
                isOpen: false
            };
        
        */
        let res = {
            menuWidth: '',
            positionLeft: '',
            isOpen: false
        };
    
        res.menuWidth = $( this.menu ).innerWidth();
        res.positionLeft = $( this.menu ).position().left;
    
        if( res.positionLeft !== 0 ){
            res.isOpen = false;
        }else{
            res.isOpen = true;
        };
        return res;
    
    };

    // ОТКРЫВАЕТ МЕНЮ
    open(){
        if( this.getParam().isOpen ){ // защита от ошибки
            return;
        };

        $( this.menu ).css("opacity", "1");

        $( this.menu ).animate(
            { 
                left: 0
            }, 
            this.SPEED_ANIMATE, 
            "swing"
        );
    }

    // ЗАКРЫВАЕТ МЕНЮ
    close( func = undefined ){
        if( !this.getParam().isOpen ){ // защита от ошибки
            return;
        };

        $( this.menu ).animate(
            { 
                left:  -this.getParam().menuWidth
            }, 
            this.SPEED_ANIMATE, 
            "swing",
            function(){

                if( func !== undefined ){
                    func();
                };

                $( this.menu ).css("opacity", "0");
            }
        );
    }

    // НАСТРАИВАЕТ МЕНЮ ПЕРЕД НАЧАЛОМ РАБОТЫ КЛАССА
    preparesMenuAtStart(){
        // изначально предполагается что в файле css 
        /*
            nav#nav_main {
                ...
                left: -400px; <- случайное число
                opacity: 0;
            }
        */
        // при загрузке устанавливает меню в нужное положение
        // т ставит прозрачность в 0 (навсякий случай)
        $( this.menu ).css({"left": -this.getParam().menuWidth , "opacity": "0"});  

    }

    // ПОДКЛЮЧАЕТ СЛУШАТЕЛЕЙ СОБЫТИЙ
    runEvents(){

        // иконка меню
        $("#menu_logo").on("click", () => {
            this.stopBadClick( () => {
                if( this.getParam().isOpen ){
                    this.close();
                }else if( !this.getParam().isOpen ){
                    this.open();
                };

            });
        });

        // предназначена только для выхода из админки
        $('#ul_li_ent_exit a').on("click", ( event ) => {
            event.preventDefault();
            this.stopBadClick( () => {
                if( this.getParam().isOpen ){
                    this.close( () => {
                        document.location.href = event.currentTarget.href;
                    });
                };
            });
        });
        
        // Закрывает меню при клике вне меню (если оно открыто)
        $("main").on("click", () => {
            this.stopBadClick( () => {
                if( this.getParam().isOpen ){
                    this.close();
                };
            });
        });

        // стрелка закрыть
        $("#nav_close_wrp").on("click", () => {
            this.stopBadClick( () => {
                this.close();
            });
        });

        // пункт меню
        $(".itemMenu").on("click", ( event ) => {
            event.preventDefault();
            this.stopBadClick( () => {
                this.close( () => {
                    let elem = event.currentTarget.parentNode;
                    let reshas = $( elem ).hasClass('goToMySite');
                    if( !reshas ){ // нажат обычный пункт меню, не пункт открытия сайта в новой вкладке
                        document.location.href = event.currentTarget.href
                    }else{ // здесь нужно открыть новую вкладку с публичной частью сайта, без перезагрузки старой
                        window.open( event.currentTarget.href, '_blank', '');
                    };
                });
            });
        });

        
    }

    // БЛОКИРУЕТ ДУРНЫЕ КЛИКИ
    stopBadClick( func ){
        if( !this.isGoodClick ){
            return;
        };
        this.isGoodClick = false;
        func()
        setTimeout( ()=>{  
            this.isGoodClick = true;
        }, 500 );
    }
};


let leftMenu = new LeftMenu();


