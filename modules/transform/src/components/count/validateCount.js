import { Validate } from "../validate.js"

export class ValidateCount extends Validate{
   
    validate(columns, column) {
        
        if(!this.columnExist(columns, column)){
            let result = {
                transformationType: "uniqueValues",
                errorType: "Column not found",
                message: `Column ${column} does not exist in data base.`,
            }
            return {result, isValid: false}
        }
        
        let result = {}

        return {result,isValid: true}
    }
}