//druidjs contains a lot of dimensionality reduction functions

//we use d3 to download the penguins dataset to use in our PCA
//
//dataframe module
//import DataFrame from 'dataframe-js'

//import druidjs and d3  
//import * as druid from "https://unpkg.com/@saehrimnir/druidjs" 
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import {PCA} from "./pca-lib.js"

export async function getPCA(){
    console.log('entrooouhehe')
    //load penguins dataset
    //let penguins = await d3.csv("./penguins.csv")
    
    let data = [[40,50,60],[50,70,60],[80,70,90],[50,60,80]]
    let vectors = PCA.getEigenVectors(data);
    console.log(vectors)
    let adData = PCA.computeAdjustedData(data,vectors[0])
    let compressed =  adData.formattedAdjustedData
    console.log(compressed)
    return compressed
}



