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
        inputTypeParameters : List

        //Stores the input provided by the user
        inputValue : String
    
    */

    constructor(fieldName, inputTypeIdentifier , inputTypeParameter){

        this.fieldName = fieldName;
        this.inputTypeIdentifier =  inputTypeIdentifier;
        this.inputTypeParameter = inputTypeParameter;

        this.inputValue = null

    }


}
