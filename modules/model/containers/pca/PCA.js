
import {PCA} from "./pca-lib.js"

export async function getPCA(data){    
    let vectors = PCA.getEigenVectors(data);
    console.log(vectors)
    let adData = PCA.computeAdjustedData(data,vectors[0])
    let compressed =  adData.formattedAdjustedData
    console.log(compressed)
    return compressed
}



