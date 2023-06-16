import {DataTypeMissmatchError} from '../exceptions/visualize_exceptions';

export class GraphFieldsVerifier {
    constructor(typeOfGraph){
        this.typeOfGraph = typeOfGraph;
    }

    isCategorical(value, axis) {
        if(typeof value === 'string'){
            return true;
        } else {
            throw new DataTypeMissmatchError(this.typeOfGraph, axis, categoricalType, typeof value);
        }
    }
    
    isNumeric(value, axis) {
        if(checkIfIsNumeric(value)){
            return true;
        } else {
            console.log("entrei no false")
            throw new DataTypeMissmatchError(this.typeOfGraph, axis, numericType, typeof value);
        }
    }
    
    isNumericOrCategorical(value, axis) {
        if(checkIfIsNumeric(value) || typeof value == 'string'){
            return true;
        } else {
            throw new DataTypeMissmatchError(this.typeOfGraph, axis, numericOfCategoricalType, typeof value);
        }
    }
    
}

function checkIfIsNumeric(value) {
    let num = Number(value)
    return !Number.isNaN(num);
}
const numericOfCategoricalType = "numeric or categorical";
const numericType = "numeric"
const categoricalType = "categorical"