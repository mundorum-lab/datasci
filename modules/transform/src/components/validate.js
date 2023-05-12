import { Oid, OidBase } from '/lib/oidlib-dev.js'
import {Series, DataFrame} from 'pandas-js'

export class Validate extends OidBase{

    columnExist(availableColumns, targetColumn){
        if(availableColumns[targetColumn]){
            return true
        }
        return false
    }

    isTypeMatch(availableColumns, desiredType, targetColumn){
        if(availableColumns[targetColumn]==desiredType){
            return true
        }
        return false
    }

    isTypesValid(availableColumns, targetColumn1, targetColumn2, operation, value){

    }

    isOperationValid(operation){
        if(this.validOperations.includes(operation)){
            return true
        }
        return false
    }
    
}

Oid.component(
    {
      id: 'ts:validate',
      element: 'transform',
      properties: {
        validOperations: {default: ["=",">=",">","<=","<","+","-","*"]} //add valid operation here
      },
      implementation: Validate
    })