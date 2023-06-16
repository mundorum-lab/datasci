import { Validate } from "../validate.js"

export class ValidateJoin extends Validate{
   
    validate(columns, columns_2, column, table_1, table_2) {
        
        //checks if column exists
        if(!this.columnExist(columns, column)){
            let result = {
                transformationType: "join",
                errorType: "Column not found",
                message: `Column ${column} does not exist in the left table."`,
            }
            return {result, isValid: false}
        }

        if(!this.columnExist(columns_2, column)){
            let result = {
                transformationType: "join",
                errorType: "Column not found",
                message: `Column ${column} does not exist in the right table."`,
            }
            return {result, isValid: false}
        }

        if(table_1 == null || table_2 == null){
            let result = {
                transformationType: "join",
                errorType: "Table missing",
                message: `This operation needs two datasets`,
            }
            return {result, isValid: false}
        }
        
        let result = {}

        return {result,isValid: true}
    }
}