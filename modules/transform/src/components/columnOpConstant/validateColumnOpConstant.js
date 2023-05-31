import { Validate } from "../validate.js"

export class ValidateColumnOpConstant extends Validate{
   
    validate(operation, columns, column) {
        
        //checks if column 1 exists
        if(!this.columnExist(columns, column)){
            let result = {
                transformationType: "columnOpConstant",
                errorType: "Column not found",
                message: `Column ${column} does not exist in data base."`,
            }
            return {result, isValid: false}
        }

        //checks if column is a  numerical value
        
        if(!this.isTypeMatch(columns, 'number', column)){
            let result = {
                transformationType: "columnOpConstant",
                errorType: "Incompatible types",
                message: `Column ${column} is type of ${columns[column]}, but type of "number" is expected`,
            }
            return {result,isValid: false}
        }


        //checks if the operation is valid for the type of transformation
        let validOperations = ["+", "-", "*", "/", "^", "log"]
        
        if(!this.isOperationValid(operation, validOperations)){
            let result = {
                transformationType: "columnOpConstant",
                errorType: "Invalid operation",
                message: `Operation ${operation} is not valit for column operation transformation.`,
            }
            return {result,isValid: false}
        }
        
        let result = {}

        return {result,isValid: true}
    }
}