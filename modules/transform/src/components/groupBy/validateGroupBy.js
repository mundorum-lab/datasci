export class ValidateGroupBy {
 
    validate(message) {
        let columns = message.validTable.columns //array com jsons of names and types of columns
        let typeOperationTargetColumn
        let columnGroupByTargetColumnExists = false
        let columnOperationTargetColumnExists = false
        for (let i = 0; i<columns.length; i++){
            if(columns[i].name==message.groupByTargetColumn){ //3
                columnGroupByTargetColumnExists = true
            }
            if(columns[i].name==message.operationTargetColumn){
                typeOperationTargetColumn = columns[i].type 
                columnOperationTargetColumnExists = true
            }
        }
        if(!columnGroupByTargetColumnExists && !columnOperationTargetColumnExists){
            let result = {
                transformationType: "groupBy",
                errorType: "Columns not found",
                message: `Columns ${message.groupByTargetColumn} and ${message.columnOperationTargetColumn} do not exist in data base."`,
            }
            return {result,isValid: false}
        }
        if(!columnGroupByTargetColumnExists){
            let result = {
                transformationType: "groupBy",
                errorType: "Column not found",
                message: `Column ${message.groupByTargetColumn} does not exist in data base."`,
            }
            return {result,isValid: false}
        }
        if(!columnOperationTargetColumnExists){
            let result = {
                transformationType: "groupBy",
                errorType: "Column not found",
                message: `Column ${message.columnOperationTargetColumn} does not exist in data base."`,
            }
            return {result,isValid: false}
        }
        if((typeOperationTargetColumn!=typeof(1) && typeOperationTargetColumn!=typeof(1.54)) && message.operation=="avg"){ //1
            let result = {
                transformationType: "groupBy",
                errorType: "Incompatible types",
                message: `Can not average elements from "${message.columnOperationTargetColumn}". Type is not a number.`,
            }
            return {result,isValid: false}
        }
        let result = {
            
        }
        return {result,isValid: true}
    }
}