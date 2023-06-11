export class NodeInputField{
    /**
     * Represents the input fields for nodes.
     * 
     * Properties:
     * name: Name of the component which can appear on the screen
     * view: Identifier of the type of input (Ex: Textbox, Radio, Button, Dropdown, ...)
     * parameters: Parameters equivalent to the type of input chosen, similar to *void in C
     * inputValue: Stores the input given by the user
     * 
     * @property {string} name
     * @property {string} view
     * @property {object} parameters - {par1 : value01, par2 : value02, ...}
     * @property {any} inputValue
     * 
     * @example
     * name: Senha,
     * view: TextBox,
     * parameters: {
     *     maxLength: 10,
     *     minLength: 5,
     *     password: true,
     *     forbidden: ["abcde", "senha", "12345"],
     *     placeholder: "Digite sua senha aqui"
     * }
    */

    constructor(name, view, parameters){
        /** @type {string} */
        this.name = name;
        /** @type {string} */
        this.view =  view;
        /** @type {object} */
        this.parameters = parameters;
        /** @type {any} */
        this.inputValue = null
    }

    /**
     * Retrieves the value of a specific parameter.
     * @param {string} parameter - The parameter name.
     * @returns {any} - The value of the parameter.
     */
    handleGetParameterValue(parameter){
        return this.parameters[parameter];
    } 

    /**
     * Sets the value of a specific parameter.
     * @param {string} parameter - The parameter name.
     * @param {any} value - The value of the parameter.
     * @returns {boolean} - True if the parameter exists and was set.
     */
    handleSetParameterValue(parameter, value){
        let exists = true;
        
        if (parameters[parameter] == undefined)
            exists = false
        this.parameters[parameter] = value;
        return exists
    }

    /**
     * Retrieves the input value.
     * @returns {any} - The input value.
     */
    handleGetInputValue(){
        return this.inputValue;
    }

    /**
     * Sets the input value.
     * @param {any} inputValue - The input value to set.
     */
    handleSetInputValue(inputValue){
        this.inputValue = inputValue;
    }

    /**
     * Retrives the name of the input field.
     * @returns {string} - The name of the input field.
     */
    getName(){
        return this.name
    }
    
}
