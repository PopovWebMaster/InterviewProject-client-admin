
export const controller =  {

    setInput_focus_style( input_elem ){

        input_elem.style.cssText = `
            background-color: #00000000;
        `;
        let hr =  input_elem.nextElementSibling;
        hr.style.cssText = `
            width: 100%;
        `;
    },

    setInput_blure_style( input_elem ){

        input_elem.style.cssText = `
            background-color: #00000008;
        `;

        let hr =  input_elem.nextElementSibling;

        hr.style.cssText = `
            width: 0%;
        `;
    },





};