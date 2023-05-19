import { Validate } from "../validate.js"

export class ValidateMaximum extends Validate{

    constructor() {
        super()
    }

    validate(columns, column) {
        
        if(!this.columnExist(columns, column)){
            let result = {
                transformationType: "maximum",
                errorType: "Column not found",
                message: `Column ${column} does not exist in data base.`,
            }
            return {result, isValid: false}
        }

        if(!this.isTypeMatch(columns, 'number', column) && !this.isTypeMatch(columns, 'string', column)) {
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