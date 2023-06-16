export function DataTypeMissmatchError(typeOfGraph, axis, expectedType, value) {
    const error = new Error(`Graph of type ${typeOfGraph} expected in ${axis} axis a data of type ${expectedType}, but instead received data of type ${typeof value}`);
    error.code = "DATA_TYPE_MISSMATCH_ERROR_CODE";
    return error;
}