export class NodeInputField{

    /*
        Representa os campos de entrada dos nós,
        Possui:
            name: Nome do componente que poderá aparecer na tela
            kind: Identificador de tipo de entrada (Ex : Textbox , Radio, Button, Dropdown ...)
            parameters: Parâmetros equivalentes ao tipo de entrada escolhida , similar a um *void em c


        //Information necessary to display 
        name : string
        kind : string
        parameters : {par1 : value01 , par2 : value02, ...}

        //Stores the input provided by the user
        inputValue : Any

        //Example:
        {
        name : Senha,
        kind : TextBox,
        parameters : {
            maxLength: 10,
            minLength: 5,
            password: true,
            forbiden: ["abcde", "senha", "12345"],
            placeholder: "Digite sua senha aqui"
            }
        }
        */

    constructor(name, kind, parameters){

        this.name = name;
        this.kind =  kind;
        this.parameters = parameters;

        this.inputValue = null

    }


    /*Any*/  handleGetInputParameterValue(/*string*/ parameter ){
        return this.inputTypeParameters[parameter];

    } 
    /*bool*/ handleSetInputParameterValue(/*string*/ parameter , /* any*/ value){
        //Set the parameter - If the parameter didn't exist , return false, else true
        let exists = true;
        
        if (inputTypeParameters[parameter] == undefined)
            exists = false
        this.inputTypeParameters[parameter] = value;
        return exists

    }


    handleGetInputValue(){
        return this.inputValue;
    }

    handleSetInputValue(inputValue){
        this.inputValue = inputValue;
    }
    

}
