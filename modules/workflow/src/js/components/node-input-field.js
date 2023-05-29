export class NodeInputField{

    /*
    Representa os campos de entrada dos nós.
    Possui:
        name: Nome do componente que poderá aparecer na tela
        view: Identificador de tipo de entrada (Ex : Textbox , Radio, Button, Dropdown ...)
        parameters: Parâmetros equivalentes ao tipo de entrada escolhida , similar a um *void em c
        inputValue: armazena o input do usuário


    Informações necessárias para renderização
        name: string
        view: string
        parameters: {par1 : value01 , par2 : value02, ...}
        inputValue: Any

    Example:
        {
        name: Senha,
        view: TextBox,
        parameters: {
            maxLength: 10,
            minLength: 5,
            password: true,
            forbiden: ["abcde", "senha", "12345"],
            placeholder: "Digite sua senha aqui"
            }
        }
    */

    constructor(name, view, parameters){
        this.name = name;
        this.view =  view;
        this.parameters = parameters;
        this.inputValue = null
    }


    /*Any*/ handleGetParameterValue(/*string*/ parameter){
        return this.parameters[parameter];
    } 

    /*bool*/ handleSetParameterValue(/*string*/ parameter, /* any*/ value){
        //Set the parameter value. If the parameter doesn't have a value, return false, else true.
        let exists = true;
        
        if (parameters[parameter] == undefined)
            exists = false
        this.parameters[parameter] = value;
        return exists
    }

    handleGetInputValue(){
        return this.inputValue;
    }

    handleSetInputValue(inputValue){
        this.inputValue = inputValue;
    }
    
}
