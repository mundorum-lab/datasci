import { Validate } from "../validate"

export class ValidateFilter extends Validate{
   
    validate(columns, column) {
        
        if(!this.columnExist(columns, column)){
            let result = {
                transformationType: "maximum",
                errorType: "Column not found",
                message: `Column ${column} does not exist in data base.`,
            }
            return {result, isValid: false}
        }

        if(!this.isTypeMatch(columns, 'Number', column) || !this.isTypeMatch(columns, 'String', column)) {
            let result = {
                transformationType: "maximum",
                errorType: "Invalid type",
                message: `Cannot perform maximum operation with the type of column ${column}.`,
            }
            return {result, isValid: false}
        }
        
        let result = {}

        return {result,isValid: true}
    }
}