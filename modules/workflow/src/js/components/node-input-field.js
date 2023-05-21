export class NodeInputField{

    /*
        Representa os campos de entrada dos nós,
        Possui:
            Nome do componente que poderá aparecer na tela
            inputTypeIdentifier: Identificador de tipo de entrada (Ex : Textbox , Radiobtn, Button, Dropdown ...)
            inputTypeParameters: Parâmetros equivalentes ao tipo de entrada escolhida , similar a um *void em c


        //Information necessary to display 
        fieldName : String
        inputTypeIdentifier : String
        inputTypeParameters : {par1 : value01 , par2 : value02, ...}

        //Stores the input provided by the user
        inputValue : Any

    
    */

        /*
        EXEMPLO
        {
        fieldName : Senha,
        inputTypeIdentifier : TextBox,
        inputTypeParameters : {

            isPassword : True,
            maxLength : 10,
            forbidenChars : "abcde",
            
            }

        }
        
        */

    constructor(fieldName, inputTypeIdentifier, inputTypeParameters){

        this.fieldName = fieldName;
        this.inputTypeIdentifier =  inputTypeIdentifier;
        this.inputTypeParameters = inputTypeParameters;

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
