import { Oid, OidWeb } from '/lib/oidlib-dev.js'

export class TransformWeb extends OidWeb {

    /* Get values from json and convert to a more appropriate way to perform transformation */

    toDataFrame(jsonTable){
        const dfd = window.dfd
        let number_of_columns = jsonTable.columns.length
        let columns = {}
        let columns_arr = []
        for(let i = 0; i<number_of_columns; i++){
            columns[jsonTable.columns[i].name] = jsonTable.columns[i].type
            columns_arr.push(jsonTable.columns[i].name)
        }
        let df = new dfd.DataFrame(jsonTable.data, {columns: columns_arr})
        return {columns, df}
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