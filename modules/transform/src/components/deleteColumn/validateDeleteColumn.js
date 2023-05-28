import { Validate } from "../validate"

export class ValidateColumnDelete extends Validate{
   
    validate(columns, column) {
        
        //checks if column exists
        if(!this.columnExist(columns, column)){
            let result = {
                transformationType: "columnDelete",
                errorType: "Column not found",
                message: `Column ${column} does not exist in data base."`,
            }
            return {result, isValid: false}
        }
      
        let result = {}

        return {result,isValid: true}
    }
}