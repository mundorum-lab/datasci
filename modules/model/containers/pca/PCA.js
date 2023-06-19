
import {PCA} from "./pca-lib.js"

export async function getPCA1dReduction(data){    
    let vectors = PCA.getEigenVectors(data);
    let adData = PCA.computeAdjustedData(data,vectors[0])
    let compressed =  adData.formattedAdjustedData
    for (let i = 0; i < compressed.length; i++) {
        for (let j = 0; j < compressed[i].length; j++) {
            compressed[i][j] = [compressed[i][j]]
        }
    }
    compressed = compressed[0]
    let returnedTable = {
        'columns':[{'name' : 'PCA', 'type' : 'num'}],
        'data' : compressed} 
    return returnedTable
}

export async function getPCA2dReduction(data){
    let vectors = PCA.getEigenVectors(data);
    let adData = PCA.computeAdjustedData(data,vectors[0], vectors[1])
    let compressed =  adData.formattedAdjustedData
    //for (let i = 0; i < compressed.length; i++) {
    //    for (let j = 0; j < compressed[i].length; j++) {
    //        compressed[i][j] = [compressed[i][j]]
    //    }
    //}
    console.log('compressed antes: ', compressed)
    let returnData = []

    for(let i = 0; i < compressed[0].length; i++) {
        returnData.push([compressed[0][i], compressed[1][i]])
    }
    console.log('olha o return data:', returnData)
    console.log('compressed[0].lenght: ', compressed[0].length)
    let returnedTable = {
        'columns':[{'name' : 'PCA1', 'type' : 'num'}, {'name' : 'PCA2', 'type' : 'num'}],
        'data' : returnData} 
    return returnedTable
}

export async function getData(table){
    let columns = table['columns']
    let data = table['data']
    
    /** 
     formato dos dados que esta chegando vem diferente do esperado, deixando essa função para depois

    let index2remove = []

    //remove any columns that are not num
    for(let i = 0; i < Object.keys(columns).length; i++){
        let value = Object.values(columns[i])[0]
        if (value != 'num'){
            index2remove.push(i)
        }
    }
    
    let aux = 0
    for(index in index2remove){
        data.splice(index - aux,1)
        aux++
    }
    **/
    return data
}
