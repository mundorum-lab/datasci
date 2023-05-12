//druidjs contains a lot of dimensionality reduction functions
//import * as druid from "@saehrimnir/druidjs"
//we use d3 to download the penguins dataset to use in our PCA
//import * as d3 from "d3"
//dataframe module
//import DataFrame from 'dataframe-js'

const DataFrame = require("dataframe-js").DataFrame
const PCA = require('pca-js')

async function getPCA(){
    //load penguins dataset
    let df = await DataFrame.fromCSV('/home/fernando/workspace/mundorum-lab/modules/model/implementation/penguins.csv', true)
    //get only the data
    let data = df.toArray()
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

}
//load penguins dataset
//let df = DataFrame.fromCSV('/home/fernando/workspace/mundorum-lab/modules/model/implementation/penguins.csv', true).then(
//    df => df.toArray()
//).then(
//    df => PCA.getEigenVectors(df)
//).then(
    //vectors => console.log(vectors) check eigenvalue vectors

//)

module.exports = getPCA;


