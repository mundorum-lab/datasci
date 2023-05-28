import { Validate } from "../validate"

export class ValidateColumnOp extends Validate{
   
    validate(operation, columns, column1, column2, constant) {
        
        //checks if column 1 and 2 exist
        if(!this.columnExist(columns, column1)){
            let result = {
                transformationType: "columnOp",
                errorType: "Column not found",
                message: `Column ${column1} does not exist in data base."`,
            }
            return {result, isValid: false}
        }

        if(operation == "+" || operation == "-" || operation == "*" || operation == "/" || operation == "^"){
            //if there's no column 2 and no constant
            if((column2 == null || !this.columnExist(columns, column2)) && constant == null ){
                let result = {
                    transformationType: "columnOp",
                    errorType: "Missing value",
                    message: `The operation requires two values, but only one was provided.`,
                }
                return {result, isValid: false}
            }
        }


        if(column2 && !this.columnExist(columns, column2)){
            let result = {
                transformationType: "columnOp",
                errorType: "Column not found",
                message: `Column ${column2} does not exist in data base."`,
            }
            return {result, isValid: false}
        }

        //checks if both columns are numerical values
        
        if(!this.isTypeMatch(columns, 'number', column1)){
            let result = {
                transformationType: "columnOp",
                errorType: "Incompatible types",
                message: `Column ${column1} is type of ${columns[column1]}, but type of "number" is expected`,
            }
            return {result,isValid: false}
        }

        if(column2 && !this.isTypeMatch(columns, 'number', column2)){
            let result = {
                transformationType: "columnOp",
                errorType: "Incompatible types",
                message: `Column ${column2} is type of ${columns[column2]}, but type of "number" is expected`,
            }
            return {result,isValid: false}
        }

        //checks if the operation is valid for the type of transformation
        let validOperations = ["+", "-", "*", "/", "^", "log"]
        
        if(!this.isOperationValid(operation, validOperations)){
            let result = {
                transformationType: "columnOp",
                errorType: "Invalid operation",
                message: `Operation ${operation} is not valit for column operation transformation.`,
            }
            return {result,isValid: false}
        }
        
        let result = {}

        return {result,isValid: true}
    }
}