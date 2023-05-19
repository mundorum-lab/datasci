import { Oid, OidWeb } from '/lib/oidlib-dev.js'
//import { Series } from '../../../../node_modules/danfojs/lib/bundle.js'
//import danfojs from './test.js' 
//import * as dfd from "../../../../node_modules/danfojs-node"
//import dfd from "https://cdn.jsdelivr.net/npm/danfojs@1.1.2/lib/bundle.min.js"
//import {Series} from "../../../../node_modules/danfojs/dist/danfojs-browser/src/core/series.js"

export class TransformWeb extends OidWeb {

    /* Get values from json and convert to a more appropriate way to perform transformation */

    toDataFrame(jsonTable){
        let columnsObject = {}
        let number_of_columns = jsonTable.columns.length
        let number_of_rows = jsonTable.data.length
        let columns = {}
        for(let i = 0; i<number_of_columns; i++){
            columnsObject[jsonTable.columns[i].name] = []
            columns[jsonTable.columns[i].name] = jsonTable.columns[i].type
        }
        console.log(columns)
        /*for(let i = 0; i<number_of_rows; i++){
            for(let j = 0; i<number_of_columns; j++){
                columnsObject.jsonTable.columns[j].name.append(jsonTable.data[i][j])
            }
        }*/
        /*
        example of column object
        {x: new Series([1, 2]), y: new Series([2, 3])}
        */
        //this.dataFrame = new DataFrame(Immutable.Map(columnsObject))
        return {columns, columnsObject}
    }

    columnsObject(jsonTable){
        let columns = {}
        let number_of_columns = jsonTable.columns.length
        for(let i = 0; i<number_of_columns; i++){
            columns[jsonTable.columns[i].name] = jsonTable.columns[i].type
        }
        return columns
    }

    toJson(dataFrame, file_id,columns){
        //convert df to json
        table = {
            file_id: file_id,
            columns: [],
            data: [],
        }
        columnsName = columns.keys()
        for(let i = 0; i < listColumns.length; i++){
            table.columns.append({
                name: columnsName[i],
                type: columns[i]
            })
        }
        for(const [row, idx] of dataFrame) {
            table.data.append(row.values)
        }

        return table
    }

    toSingleValue(value) {
        return {"value": value}
    }

}


Oid.component(
    {
      id: 'ts:transform',
      element: 'transform-data',
      implementation: TransformWeb
    })