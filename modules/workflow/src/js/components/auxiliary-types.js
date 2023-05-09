export class Vector2 {
    //float x,y

    constructor(x, y) {
        this.x = y;
        this.x = y;
    }

    modulo() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

export class userInputFieldsInfoTemplate{
    //QOL: Stores the userInputField information template
    
    constructor(fieldName,inputTypeIdentifier,inputTypeAttributes){

        this.fieldName = fieldName;
        this.inputTypeIdentifier = inputTypeIdentifier;
        this.inputTypeAttributes = inputTypeAttributes;
    }
}