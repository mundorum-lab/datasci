import { Validate } from "../validate.js"

export class ValidateFilter extends Validate{

    constructor(){
        super()
        //this.validOperations = [["<=",">",">=","<"],[],["==","!="]]
        this.validOperations = [["le","gt","ge","lt"],[],["eq","ne"]]
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
            return {result, isValid: false}
        }
        
        if(!this.isOperationValid(operation, this.validOperations[0]) && !this.isOperationValid(operation,this.validOperations[1]) && !this.isOperationValid(operation,this.validOperations[2])){
            let result = {
                transformationType: "filter",
                errorType: "Invalid operation",
                message: `Operation ${operation} is not valid for filter transformation.`,
            }
            return {result, isValid: false}
        }

        if(!this.isOperationAndTypeValid(operation,columns,targetColumn,this.validOperations)){
            let result = {
                transformationType: "filter",
                errorType: "Incompatible Types",
                message: `Can not perform "${operation}" operation in elements from "${targetColumn}" of type "${columns[targetColumn]}".`,
            }
            return {result, isValid: false}
        }
        
        let result = {}

        return {result,isValid: true}
    }
}