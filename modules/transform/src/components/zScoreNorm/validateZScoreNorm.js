import { Validate } from "../validate.js"

export class ValidateZscoreNorm extends Validate{
   
    validate(columns, column) {
        
        //checks if column exists
        if(!this.columnExist(columns, column)){
            let result = {
                transformationType: "Normalization",
                errorType: "Column not found",
                message: `Column ${column} does not exist in data base."`,
            }
            return {result, isValid: false}
        }

        //checks if column is a  numerical value
        
        if(!this.isTypeMatch(columns, 'number', column)){
            let result = {
                transformationType: "Normalization",
                errorType: "Incompatible types",
                message: `Column ${column} is type of ${columns[column]}, but type of "number" is expected`,
            }
            return {result,isValid: false}
        }
        
        let result = {}

        return {result,isValid: true}
    }
}