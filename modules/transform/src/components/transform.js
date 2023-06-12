import { Oid, OidWeb } from '/lib/oidlib-dev.js'

export class TransformWeb extends OidWeb {

    constructor(){
        super()
        this.df = null
        this.file_id = null
        this.columns = {}
        this.status = false 
        this.dfd = window.dfd
        this.table = {}
        this.result = {}
    }

    /* Get values from json and convert to a more appropriate way to perform transformation */

    toDataFrame(){
        let number_of_columns = this.table.columns.length
        let columns = {}
        let columns_arr = []
        for(let i = 0; i<number_of_columns; i++){
            columns[this.table.columns[i].name] = this.table.columns[i].type
            columns_arr.push(this.table.columns[i].name)
        }
        this.df = new this.dfd.DataFrame(this.table.data, {columns: columns_arr})
        this.columns = columns
    }

    toJson(){

        //convert df to json
        let new_json = {
            file_id: this.file_id,
            columns: [],
            data: [],
        }
        let columnsName = this.df.columns
        for(let i = 0; i < columnsName.length; i++){
            new_json.columns.push({
                name: columnsName[i],
                type: this.columns[columnsName[i]]
            })
        }
        new_json.data = this.df.values
        this.result = new_json
    }

    toSingleValue(value, transformation, column) {
        let data = []
        if(Array.isArray(value)){
            for(let i = 0; i<value.length; i++){
                data.push([value[i]])
            }
        } else {
            data.push([value])
        }
        this.result = {data: data, file_id: this.file_id, columns: [{name: `${transformation} - ${column}`, type: this.columns[column]}]}
    }

}


Oid.component(
    {
      id: 'ts:transform',
      element: 'transform-data',
      implementation: TransformWeb
    })