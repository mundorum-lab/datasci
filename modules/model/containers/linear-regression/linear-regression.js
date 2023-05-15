import {sumArrays, subtractArrays, sumArray, removeColumn, splitColumns} from '../../support/helpers'


const default_learningRate = 0.003;

const getMse = (theta_vectors, data) => {
  const correctedData = removeColumn([...data], 1); //Always removes the "y" role
  let functionArray = sumArrays(theta_vectors, correctedData);
  functionArray = subtractArrays(functionArray, )

}

const batchGradientDescent = (data, num_epochs, learning_rate) => {
  const m = data.length;
  const theta_vectors = data[0].map((el, index) => index ? 1 : 0);
  //let mse = (1.0/(2.0*m)) * Math.pow(sumArray()
}

const hypothesis = (x, theta_vectors) => theta_vectors[0] + theta_vectors[1]*x

//this only works for 2 dimension arrays (n,2)
const find_thetas = (xses, yses, learning_rate) => {
  const theta_sums = [0,0];
  const theta_vectors = [0, 1];

  for (let i=0; i < xses.length; i++){
    theta_sums[0] += hypothesis(xses[i], theta_vectors) - yses[i];
    theta_sums[1] += (hypothesis(xses[i], theta_vectors) - yses[i]) & xses[i];
  }

  theta_vectors[0] = theta_vectors[0] - (learning_rate/xses.length) * theta_sums[0];
  theta_vectors[1] = theta_vectors[1] - (learning_rate/xses.length) * theta_sums[0];

  return theta_vectors;
}

//y = theta0 + theta1*x
const two_dimensional_regression(data, learning_rate) => {
  const columns = splitColumns(data);
  const thetas =  (columns[0],columns[1] , learning_rate);
  const result = [];
  for (let i=0; i < columns[0].length; i++){
    x = columns[0][i];
    result[i] = [x, hypothesis(x)];
  }
  return result;
}


export const linearRegression = (data, num_epochs ,learning_rate = default_learningRate) => { 

  //TODO: Implement other methods of gradient descent 
  //TODO: Implement multidimension batch gradient descent
  if(data.length <= 1000){
    if(data[0].length == 2){
      return two_dimensional_regression(data, learning_rate);
    }
  } else {
    return ('Error! Dataset is too big!');
  }
}
