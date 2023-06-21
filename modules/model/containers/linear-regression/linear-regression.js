import {calculateHipothesisArray, splitColumns, subtractArrays, sumArray, multiplyArrays} from '../../support/helpers.js';

const DEFAULT_NB_EPOCHS = 1000;
const DEFAULT_LEARNING_RATE = 0.5;
const DEFAULT_ERROR = 0.0001;


const calculateError = (target, data, theta_vector, m) => {
  //Get the array without the target
  //Calculate the hipothesis array (theta_0 + theta_1*x0 + theta_2*x1 + ... theta_n*xn-1)
  let hipothesis_array = calculateHipothesisArray(theta_vector, data, m)
  hipothesis_array = subtractArrays(hipothesis_array, target);
  const valueSum = Math.pow(sumArray(hipothesis_array),2);
  return ((1.0/(2.0 * m))*valueSum); //Error
}

const gradient = (theta_vector, data, target, m) => {
  const new_theta = [];
  const hipothesis = calculateHipothesisArray(theta_vector, data, m);
  // h - y
  let aux = hipothesis.map((el, index) => parseFloat((el - target[index]).toFixed(3)));
  theta_vector.forEach((el, index) => {
    let result = index ? multiplyArrays(aux, data[index-1]) : multiplyArrays(aux, new Array(m).fill(1));
    let theta = (1.0/m) * sumArray(result);
    new_theta.push(theta);
  });
  return new_theta;
  
}


const linearRegression = (target, data, nb_epochs, m, learning_rate, error) => {
  let theta_vector = data.map(() => 1);
  theta_vector.unshift(0);
  let mse = calculateError(target, data, theta_vector, m);
  for (let i = 0; i < nb_epochs; i++){
    let temp_thetas = gradient(theta_vector, data, target, m);
    theta_vector = theta_vector.map((el, index) => (el - learning_rate*temp_thetas[index]));
    let e = calculateError(target, data, theta_vector, m);
    if(Math.abs(mse - e) <= error){
      break;
    }  // Convergiu
    mse = e
  }
  return theta_vector.map(el => parseFloat(el.toFixed(3)));
}

export function generateTargetDataArrays(data, target_index){
  const no_target_array = splitColumns([...data]);
  const target_array = no_target_array.splice(target_index,target_index);
  return {no_target_array, target_array};
}

export function executeLinearRegression(data, target, nb_epochs = false, learning_rate = false, error = false){
  nb_epochs = nb_epochs ? nb_epochs : DEFAULT_NB_EPOCHS;
  learning_rate = learning_rate ? learning_rate : DEFAULT_LEARNING_RATE;
  error = error ? error : DEFAULT_ERROR;
  const thetas = linearRegression(target[0], data, nb_epochs, target[0].length, learning_rate, error);
  return thetas;
}

export function calculateResultColumn(thetas, data){
  const result = calculateHipothesisArray(thetas, data, data[0].length);
  return result.map(el => parseFloat(el.toFixed(3)))
}


