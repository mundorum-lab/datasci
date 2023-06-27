export class Validate {

    columnExist(availableColumns, targetColumn){
        if(availableColumns[targetColumn]){
            return true
        }
        return false
    }

    //compare type of column to one value
    isTypeMatch(availableColumns, type, targetColumn){
        if(type=="number" && (availableColumns[targetColumn]=="int" || availableColumns[targetColumn]=="float" || availableColumns[targetColumn]=="number")){
            return true
        } 
        if(type!="number" && availableColumns[targetColumn]==type){
            return true
        }
        return false
    }

    //check if operation exists
    isOperationValid(operation, validOperations){
        if(validOperations.includes(operation)){
            return true
        }
        return false
    }

    //check if type of column is adequate for the operation performed on the column
    isOperationAndTypeValid(operation,availableColumns,targetColumn,validOperations){
        if((validOperations[0].includes(operation) && availableColumns[targetColumn]!="int" && availableColumns[targetColumn]!="float" && availableColumns[targetColumn]!="number") || (validOperations[1].includes(operation) && availableColumns[targetColumn]!="string")){
            return false
        }
        return true
    }
    
}