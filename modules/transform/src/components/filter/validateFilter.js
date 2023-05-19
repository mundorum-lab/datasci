import { Validate } from "../validate"

export class ValidateFilter extends Validate{
    validatee(columns, targetColumn, comparedValue, operation) {
        console.log("AQUI")
        if(!this.columnExist(columns, targetColumn)){
            let result = {
                transformationType: "filter",
                errorType: "Column not found",
                message: `Column ${targetColumn} does not exist in data base."`,
            }
            return {result, isValid: false}
        }
        
        if(!this.isTypeMatch(columns, typeof(comparedValue), targetColumn)){
            let result = {
                transformationType: "filter",
                errorType: "Incompatible types",
                message: `Column ${targetColumn} is type of ${columns[targetColumn]}, but type of "${comparedValue} is ${typeof(comparedValue)}. Expected equal types."`,
            }
            return {result,isValid: false}
        }
        
        if(!this.isOperationValid(operation)){
            let result = {
                transformationType: "filter",
                errorType: "Invalid operation",
                message: `Operation ${operation} is not valit for filter transformation.`,
            }
            return {result,isValid: false}
        }
        
        let result = {}

        return {result,isValid: true}
    }
}