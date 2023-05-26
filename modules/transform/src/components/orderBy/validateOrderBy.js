import { Validate } from "../validate.js"

export class ValidateOrderBy extends Validate{
   
    validate(columns, column) {
        
        //checks if column exists
        if(!this.columnExist(columns, column)){
            let result = {
                transformationType: "orderBy",
                errorType: "Column not found",
                message: `Column ${column} does not exist in data base."`,
            }
            return {result, isValid: false}
        }
      
        let result = {}

        return {result,isValid: true}
    }
}