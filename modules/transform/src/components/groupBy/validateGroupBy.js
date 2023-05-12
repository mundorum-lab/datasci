import { Validate } from "../validate"


export class ValidateGroupBy extends Validate {

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
        if(!columnGroupByTargetColumnExists){
            let result = {
                transformationType: "groupBy",
                errorType: "Column not found",
                message: `Column ${groupByTargetColumn} does not exist in data base."`,
            }
            return {result,isValid: false}
        }
        if(!columnOperationTargetColumnExists){
            let result = {
                transformationType: "groupBy",
                errorType: "Column not found",
                message: `Column ${operationTargetColumn} does not exist in data base."`,
            }
            return {result,isValid: false}
        }
        if(this.isOperationAndTypeValid(operation,columns,operationTargetColumn)){ 
            let result = {
                transformationType: "groupBy",
                errorType: "Incompatible types",
                message: `Can not average elements from "${operationTargetColumn}". Type is NaN.`,
            }
            return {result,isValid: false}
        }
        let result = {
            
        }
        return {result,isValid: true}
    }
}