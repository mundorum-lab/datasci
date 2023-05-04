export class ValidateFilter {
    //is operation valid? > >= = <= (por dropdown)
    //1 is type of comparation the same as column?
    //2 is table not empty? -> don't think this is necessary, the filter will return empty
    //3 Does the column exist?
    validate(message) {
        let columns = message.validTable.columns //array com jsons of names and types of columns
        let typeTargetColumn
        let typeComparedValue = typeof(message.comparedValue)
        let columnExists = false
        for (let i = 0; i<columns.length; i++){
            if(columns[i].name==message.column){
                typeTargetColumn = columns[i].type 
                columnExists = true
                break
            }
        }
        if(!columnExists){
            let result = {
                transformationType: "filter",
                errorType: "Column not found",
                message: `Column ${message.column} does not exist in data base."`,
            }
            return {result,isValid: false}
        }
        if(typeTargetColumn!=typeComparedValue){
            let result = {
                transformationType: "filter",
                errorType: "Incompatible types",
                message: `Column ${message.column} is type of ${typeTargetColumn}, but type of "${message.comparedValue} is ${typeComparedValue}. Expected equal types."`,
            }
            return {result,isValid: false}
        }
        let result = {
            
        }
        return {result,isValid: true}
    }
}