import { Validate } from "../validate"

export class ValidateMedian extends Validate{
   
    validate(columns, targetColumn) {
        
        if(!this.columnExist(columns, targetColumn)){
            let result = {
                transformationType: "median",
                errorType: "Column not found",
                message: `Column ${targetColumn} does not exist in data base."`,
            }
            return {result, isValid: false}
        }
        
        if(!this.isTypeMatch(columns, "number", targetColumn)){
            let result = {
                transformationType: "median",
                errorType: "Incompatible types",
                message: `Column ${targetColumn} is type of ${columns[targetColumn]}.`,
            }
            return {result,isValid: false}
        }
        
        let result = {}
        return {result,isValid: true}
    }
}