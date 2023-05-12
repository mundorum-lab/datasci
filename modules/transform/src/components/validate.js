import { Oid, OidBase } from '/lib/oidlib-dev.js'
import {Series, DataFrame} from 'pandas-js'

export class Validate extends OidBase{

    columnExist(availableColumns, targetColumn){
        if(availableColumns[targetColumn]){
            return true
        }
        return false
    }

    /* TODO Change the name of this methods to something more intuitive */

    //compare type of column to one value
    isTypeMatch(availableColumns, type, targetColumn){
        if(availableColumns[targetColumn]==type){
            return true
        }
        return false
    }

    //check if types of column are adequate for the operation over them
    isTypesValid(availableColumns, targetColumn1, targetColumn2, operation){

    }

    //check if operation exists
    isOperationValid(operation, validOperations){
        if(validOperations.includes(operation)){
            return true
        }
        return false
    }

    //check if type of column is adequate for the operation performed on the column
    isOperationAndTypeValid(operation,availableColumns,targetColumn){
        if(!this.isOperationValid(operation)){
            return false
        }
        if(operation=="avg" && (availableColumns[targetColumn]!="int" || availableColumns[targetColumn]!="float")){
            return false
        }
        return true
    }
    
}

Oid.component(
    {
      id: 'ts:validate',
      element: 'transform',
      properties: {
        validOperations: {default: ["=",">=",">","<=","<","+","-","*"]} //add valid operations here
      },
      implementation: Validate
    })