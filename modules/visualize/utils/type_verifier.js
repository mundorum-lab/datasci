export function isCategorical(value) {
    return typeof value === 'string';
}

export function isNumeric(value) {
    return typeof value === 'number';
}

export function isNumericOrCategorical(value) {
    return isCategorical(value) || isNumeric(value);
}

export const numericOfCategoricalType = "numeric or categorical";

export const numericType = "numeric"
export const categoricalType = "categorical"