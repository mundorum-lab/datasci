import { Validate } from "../validate.js"

export class ValidateAlias extends Validate{
   
    validate(columns, old) {
        
        //checks if column exists
        if(!this.columnExist(columns, old)){
            let result = {
                transformationType: "alias",
                errorType: "Column not found",
                message: `Column ${column} does not exist in data base."`,
            }
            return {result, isValid: false}
        }
        
        let result = {}

        return {result,isValid: true}
    }
}