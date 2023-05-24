import { Validate } from "../validate.js"

export class ValidateFilter extends Validate{

    constructor(){
        super()
        this.validOperations = ["=="]
    }

    validate(columns, targetColumn, comparedValue, operation) {
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
                message: `Column ${targetColumn} is type of ${columns[targetColumn]}, but type of "${comparedValue}" is ${typeof(comparedValue)}. Expected equal types.`,
            }
            return {result,isValid: false}
        }
        
        if(!this.isOperationValid(this.validOperations, operation)){
            let result = {
                transformationType: "filter",
                errorType: "Invalid operation",
                message: `Operation ${operation} is not valid for filter transformation.`,
            }
            return {result,isValid: false}
        }
        
        let result = {}

        return {result,isValid: true}
    }
}