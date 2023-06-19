

//Givien an array of thetas and an matrix of data, return the sum of all lines of the matrix multiplied by theta (Ex: array1[0] + theta[1]*array2[:0])
export function calculateHipothesisArray(indexArray = [], multiplierMatrix = [[]], size){
  const result = new Array(size).fill(0);
  for (let i = 0; i<size; i++){
    indexArray.forEach((el, index) => {
      result[i] = index ? (result[i] + (el*multiplierMatrix[index-1][i])) : el;
    });
  }
  return result;
}

//Given 2 arrays of same size, return array1 * array2
export function multiplyArrays(array1, array2){
  const result = []
  array1.forEach((el, index) => {
    result[index] = (el * array2[index]);
  });
  return result;
}

// Remove a column from an array
export function removeColumn(array, columnIndex){
  return array.map((arr) => arr.filter((el, index) => index !== columnIndex));
}

// Given 2 arrays with n lines and 1 column, return an array1 - array2
export function subtractArrays(array1, array2){  
  const result =  array1.map((elem, index) => parseFloat((elem - array2[index]).toFixed(3)));
  return result;
}

// Given 1 array with n lines and 1 column, return the sum of all the array elements
export function sumArray(array){
  return array.reduce((acc, cur) => acc + cur, 0);
}

export function splitColumns(data){
  const columns = data.reduce((newColumns, row) => {
    for(let i=0;i<row.length;i++){
      if(newColumns.length-1 < i){ //first column;
        newColumns.push([]);
      }
      newColumns[i].push(row[i]);
    }
    return newColumns;
  }, []);
  return columns;
}

export function normalizeColumn(column){
  const min_x = Math.min(...column);
  const max_x = Math.max(...column);
  const normalized_column = [];
  column.forEach((el, idx) => {
    normalized_column[idx] = (el - min_x)/(max_x-min_x);
  });
  return normalized_column;
}
