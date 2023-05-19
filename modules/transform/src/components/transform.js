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
        console.log(df)
        return {columns, df}
    }

    toJson(dataFrame,file_id,columns){
        
        //convert df to json
        let message = {
            file_id: file_id,
            columns: [],
            data: [],
        }
        let columnsName = dataFrame.columns
        for(let i = 0; i < columnsName.length; i++){
            message.columns.push({
                name: columnsName[i],
                type: columns[columnsName[i]]
            })
        }
        message.data = dataFrame.values
        return message
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