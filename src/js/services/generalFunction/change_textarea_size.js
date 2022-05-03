
/*
    меняет textarea указанные в селекторе по габаритам текста в нём
    применяется при срабатывании события изменения содержимого textarea
*/

export const change_textarea_size = ( selector ) => {

    let textarea_elem =     document.querySelector( selector );
    textarea_elem.setAttribute( 'style', 'height: 1em;');

    let scrollHeight =      textarea_elem.scrollHeight;

    let style_elem =        window.getComputedStyle( textarea_elem );

    let fontSize =          parseFloat( style_elem.fontSize );
    let paddingTop =        parseFloat( style_elem.paddingTop )/fontSize;
    let paddingBottom =     parseFloat( style_elem.paddingBottom )/fontSize;
    let lineHeight =        parseFloat( style_elem.lineHeight )/fontSize;

    let sum_of_lines = Math.round(((scrollHeight / fontSize ) - ( paddingTop + paddingBottom ))/lineHeight);

    let new_height = ( sum_of_lines * lineHeight );

    textarea_elem.style.cssText = `
        height: ${new_height}em;
    `;


};