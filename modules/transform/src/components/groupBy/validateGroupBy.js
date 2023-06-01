import { Validate } from "../validate.js"


export class ValidateGroupBy extends Validate {

    constructor(){
        super()
        this.validOperations = [["cumProd","cumSum","mean","std","sum","var","cumMax","cumMin","max","min"],[],["count"]]
        //numbers, strings and both
    }

    validate(columns, groupByTargetColumn, operationTargetColumn, operation) {
        let groupByTargetColumnExists = this.columnExist(columns, groupByTargetColumn)
        let operationTargetColumnExists = this.columnExist(columns, operationTargetColumn)

        if(!groupByTargetColumnExists && !operationTargetColumnExists){
            let result = {
                transformationType: "groupBy",
                errorType: "Columns not found",
                message: `Columns ${groupByTargetColumn} and ${operationTargetColumn} do not exist in data base."`,
            }
            return {result,isValid: false}
        }
        if(!groupByTargetColumnExists){
            let result = {
                transformationType: "groupBy",
                errorType: "Column not found",
                message: `Column ${groupByTargetColumn} does not exist in data base."`,
            }
            return {result,isValid: false}
        }
        if(!operationTargetColumnExists){
            let result = {
                transformationType: "groupBy",
                errorType: "Column not found",
                message: `Column ${operationTargetColumn} does not exist in data base."`,
            }
            return {result,isValid: false}
        }
        if(!this.isOperationAndTypeValid(operation,columns,operationTargetColumn, this.validOperations)){ 
            let result = {
                transformationType: "groupBy",
                errorType: "Incompatible types",
                message: `Can not perform "${operation}" operation in elements from "${operationTargetColumn}" of type "${columns[operationTargetColumn]}".`,
            }
            return {result,isValid: false}
        }
        let result = {
            
        }
        return {result,isValid: true}
    }
}