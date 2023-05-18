import { Oid } from '/lib/oidlib-dev.js'
import { ValidateFilter } from './validateFilter.js'
import { TransformWeb } from '../transform.js'

export class FilterWeb extends TransformWeb {

    chooseOpAndFilter(){
        if(operation=="<"){
            return this.dataFrame.filter(this.dataFrame.get(this.targetColumn).lt(this.comparedValue));
        }
        if(operation=="<="){
            return this.dataFrame.filter(this.dataFrame.get(this.targetColumn).lte(this.comparedValue));
        }
        if(operation==">"){
            return this.dataFrame.filter(this.dataFrame.get(this.targetColumn).gt(this.comparedValue));
        }
        if(operation==">="){
            return this.dataFrame.filter(this.dataFrame.get(this.targetColumn).gte(this.comparedValue));
        }
        if(operation=="="){
            return this.dataFrame.filter(this.dataFrame.get(this.targetColumn).eq(this.comparedValue));
        }
    }

    filter(){
        this.newDataFrame = chooseOpAndFilter()
        let json = this.toJson(this.newDataFrame, this.file_id)
        this.status = true
        this._notify('filterResult', json)
    }

    handleFilter (topic, message) {  //handle with notice
        console.log("chamou")
        //topic: filter
        //message: filterInput
 
        this.toDataFrame(message)        //TODO add this as non-oid attributes
        this.file_id = message.file_id
        this.operation = message.operation
        this.targetColumn = message.targetColumn
        this.compared = message.comparedValue

        result = ValidateFilter.validate(this.dataFrame, this.columns)
        if(result.isValid){
            this.filter()
        } else {
            //return error message
            this.status = false
            this._notify('filterError', result.result)
        }

    }

}

Oid.component(
{
  id: 'ts:transFilter',
  element: 'filter',
  properties: {
    status: {default: false},
    name: {default: "Filtro"},
    type: {default: "Transformação"},
  },
  receive: {filter: 'handleFilter'},
  /*template: html``,*/
  implementation: FilterWeb
})