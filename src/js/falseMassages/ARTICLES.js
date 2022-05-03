import { IS_DEVELOPMENT } from './../CONSTANTS.js';

export const ARTICLES = function(){

    if( !IS_DEVELOPMENT ){
        return {};
    };
    
    return {
        href_add_article: "http://en-v6/admin/workspace/addarticle",
        listArticles: [
            {
                id: 1,
                title: "Добро пожаловать на сайт!",
                second_title: "посвящённый самостоятельному изучению английского языка",
                alias: "welcome",
                href_article: "http://en-v6/admin/workspace/article/welcome",
                order: 1,
                status: 0,
                text: `<p> Самостоятелно изучить любой иностранный язык, в частности английский, без посторонней помощи, пожалуй, крайне сложно. Особенно если вы не живёте в среде англо-говорящих людей и над вами нет постоянно давлеющего фактора вынуждающего это делать. Безусловно самый эффективный способ изучения языка - это живое общение с преподавателем, или другим лицом, владеюшим методикой подачи материала. Но вы, как человек новый, в данном вопросе, врядли сможете без посторонней помощи науить себя тому, что сами, по-сути, не умеете.
                    </p>
                    <p>
                        Однажды, передо мной остро встал вопрос изучения английского. Это было связано с проффесиональной деятельностью - необходимостью читать иностранные статьи, разлиные документации, учебные пособия и прочее. К тому же, мечта посмотреть мир и побывать в разных странах, без знания английского, имеет крайне сомнителную возможность к осуществлению. 
                    </p>
                        <p>
                            И вот, учить язык надо, а времени регулярно посещать реппетитора нет (из-за работы), да и удовольствие это, по тем временам, для меня было не их дешёвых. А я даже читать по-английски не мог (в школе учил другой язык), то-есть язык мне предстояло осваивать с полного ноля. И как же быть? Повторюсь, язык учить надо, причём бесплатно, самостоятельно и в удобное для меня время, а это или рано утром, или поздно вечером. Скажу вам, условия задачки ещё те. Но отступать нельзя и я приступил к решению вопроса самостоятельного изучения английского языка.
                        </p>
                        <p>
                            Имея школьный опыт изучения другого языка, я решил в самом начале не браться за граматику, без посторонней помощи, по-учебникам, мне кажется, её освоить не возможно. Я решил подойти к решению вопроса с другой стороны: просто учить как можно болше английских слов, пополняя тем самым свой английский словарны запас. Ведь зная лишь один перевод слов, мне в школе не однократно удавалось переводить иностранные тексты. Я прикинул, что освоив 6000-10000 тыс английских слов, выучить правила построения предложения будет намного проще, дешевле и быстрее (что не маловажно), да и опыт, накопленный к тому моменту, чтения английских текстов будет не малым для того подспорем. Было решено, учу слова.
                        </p>
                        <p>
                            Тепреь передо мной встала другая задача, как такой огромный объём, да еще и без посторонней помощи, впихнуть к себе в голову? Ведь никакими феноменалными способностями матушка природа меня не осчастливила, да и память у меня так-себе, скажу я вам. Хорошенько поразмыслив на тему о том, как вообще иностранные слова попадают к нам в память и становятся частью нас, я и пришёл к решению создания данного сайта, и призываю вас как можно вдумчивее прочесть и осмыслить основную его идею изложенную ниже. 
                        </p>
                        <div class="accent">
                            
                            <strong>Для того что бы выучить некое среднестатистическое иностранное слово, его нужно:</strong>
                            
                            <ul>
                                <li>1 - достаточное количество раз <b>прочитать,</b></li>
                                <li>2 - достаточное количество раз <b>произнести,</b></li>
                                <li>3 - достаточное количество раз <b>услышать,</b></li>
                                <li>4 - достаточное количество раз <b>перевести,</b></li>
                                <li>5 - достаточное количество раз <b>применить,</b></li>
                            </ul>
                            
                        </div>
                        <p>
                            То-есть, помимо всего прочего, нужна не только платформа, на которой все эти слова в удобной форме для обучения были бы представлены в виде - от самых часто употребляемых к менее используемым. Но еще нужна программа, которая бы могла эти слова у вас спрашивать как на русском, так и на английском языках. С акцентом на большую проработку слов, которые вам даются с трудом, при этом уделяя меньше внимания вашим словам, которые вы легко запомнили. Программа, которая бы могла отслеживать ваши результаты, ваши ошибки, которая могла бы указывать вам на ваши слабые места и предлагала возможность для их проработки. И всё это бесплатно и эфективно. 
                        </p>
                        <p>
                            Прийдя к данному выводу, первым делом я полез искать решение на просторах великого интернета. Но ничего удовлетворяющего моим запросам, к сожалению, не нашёл. По-этому решил делать сайт самостоятельно в первую очередь для себя. По-началу он жил у меня на компьютере только для одного меня, но теперь я решил выложить его во всеобщий доступ для помощи таким же интузиастам как сам, которые идут к своей цели не смотря на, казалось бы, непреодолимые трудности не отступая и не сдаваясь.
                        </p>
                        <p>
                            Что важно! Программа будет работать лично с вами и с вашим личным результатом, а для этого обязательно необходимо пройти регистрацию. Иначе - никак.
                        </p>`

            },
            {
                id: 3,
                title: "Как учиться?",
                second_title: "идея сайта проста, но и с ней нужно ознакомиться",
                alias: "how_to_learn",
                href_article: "http://en-v6/admin/workspace/article/how_to_learn",
                order: 2,
                status: 0,
                text: `<p>
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                        </p>
                        <p>
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                        </p>
                        <p>
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                            Здесь какой-то текст с описанием того как проходит обучение.
                        </p>`
            },
            {
                id: 4,
                title: "Что важно?",
                second_title: "на что нужно обратить внимание для более эффективного обучения?",
                alias: "important",
                href_article: "http://en-v6/admin/workspace/article/important",
                order: 3,
                status: 0,
                text: `<p>
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                    </p>
                    <p>
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                    </p>
                    <p>
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                        Здесь какой-то текст с описанием того как проходит обучение.
                    </p>`
            }

        ]
    };

};