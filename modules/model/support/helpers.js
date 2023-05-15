

//Givien an array of thetas and an matrix of data, return the sum of all lines of the matrix multiplied by theta (Ex: array1[0] + theta[1]*array2[:0])
export function sumArrays(array1 = [], array2 = []){
  const result = [];
    
  array2.forEach((line, index) => {
    const lineResult = array1[0];
    for (let i = 1; i < array1.length; i++){
      lineResult += array1[i]*line[i-1];
    }
    result[index] = lineResult;
  });
  return result;
}

// Remove a column from an array
export function removeColumn(array, columnIndex){
  return array.map((arr) => arr.filter((el, index) => index !== columnIndex));
}

// Given 2 arrays with n lines and 1 column, return an array1 - array2
export function subtractArrays(array1, array2){
  const result =  array1.map((elem, index) => elem - array2[index]);
  return result;
}

// Given 1 array with n lines and 1 column, return the sum of all the array elements
export function sumArray(array1){
  let result = 0;
  array1.forEach(el => {
    result += el
  });
  return result;
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