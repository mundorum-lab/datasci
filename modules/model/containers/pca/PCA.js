//druidjs contains a lot of dimensionality reduction functions

//we use d3 to download the penguins dataset to use in our PCA
//
//dataframe module
//import DataFrame from 'dataframe-js'

//import druidjs and d3  
import * as druid from "https://unpkg.com/@saehrimnir/druidjs" 
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export async function getPCA(){
    console.log('entrooouhehe')
    //load penguins dataset
    let penguins = await d3.csv("./penguins.csv")
    
    let data = [[1,2,3,4,5], [2,3,4,5,6],[3,4,5,6,7],[4,5,6,7,8],[5,6,7,8,9]]
    console.log(druid.Matrix.from(data))
    let matrix = druid.Matrix.from(data);


    //d3.selectAll("datapoints").data(matrix.to2dArray)

    //get the PCA dimensionality reduction class
    let result =  new druid.PCA(matrix).transform()
    return result
    /*
    //get only the data
    let matrix = df.toArray()
    console.log(data)
    console.log('\n\n -------------------------------------------\n\n')
    //get eigen vectors
    vectors = PCA.getEigenVectors(data)
    console.log(vectors)

    //compute adjusted data
    let adData = PCA.computeAdjustedData(data,vectors[0])
    console.log('\n\n -------------------------------------------\n\n')
    console.log(adData)
    return adData
    */
}



