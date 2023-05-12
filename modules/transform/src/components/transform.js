import { Oid, OidWeb } from '/lib/oidlib-dev.js'
import { Series, DataFrame } from 'pandas-js';

export class TransformWeb extends OidWeb {

    /* Get values from json and convert to a more appropriate way to perform transformation */

    toDataFrame(jsonTable){
        let columnsObject = {}
        number_of_columns = len(jsonTable.columns)
        number_of_rows = len(jsonTable.data)
        for(let i = 0; i<number_of_columns; i++){
            columnsObject[jsonTable[columns][i].name] = new Series()
            this.columns[jsonTable[columns][i].name] = jsonTable[columns][i].type
        }
        for(let i = 0; i<number_of_rows; i++){
            for(let j = 0; i<number_of_columns; j++){
                columnsObject[jsonTable[columns][j].name].add(jsonTable.data[i][j])
            }
        }
        /*
        example of column object
        {x: new Series([1, 2]), y: new Series([2, 3])}
        */
        this.dataFrame = new DataFrame(Immutable.Map(columnsObject))
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
      element: 'transform',
      properties: {
        dataFrame: {default: {}},
        columns: {default: {}},
      },
      implementation: TransformWeb
    })