import {calculateHipothesisArray, splitColumns, subtractArrays, sumArray, multiplyArrays} from '../../support/helpers.js';

const my_data = [[-0.21,2.048,0.145],
[-0.305,1.999,0.103],
[-0.368,1.968,0.149],
[-0.37,1.902,0.11],
[-0.48,1.841,0.135],
[-0.532,1.807,0.111],
[-0.575,1.733,0.12],
[-0.583,1.69,0.111],
[-0.618,1.649,0.108],
[-0.702,1.611,0.117],
[-0.783,1.568,0.107],
[-0.842,1.523,0.104],
[-0.882,1.438,0.139],
[-0.93,1.408,0.142],
[-0.969,1.34,0.111],
[-0.989,1.295,0.107],
[-1.032,1.244,0.118],
[-1.088,1.201,0.119],
[-1.104,1.159,0.126],
[-1.192,1.109,0.11]]

const data = splitColumns(my_data);

const calculate_error = (target, data, theta_vector, m) => {
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


const linear_regression = (target, data, nb_epochs, m) => {
  const learning_rate = 0.5;
  const error = 0.0001;
  let theta_vector = [0,1,1];
  let mse = calculate_error(target, data, theta_vector, m);
  for (let i = 0; i < nb_epochs; i++){
    let temp_thetas = gradient(theta_vector, data, target, m);
    theta_vector = theta_vector.map((el, index) => (el - learning_rate*temp_thetas[index]));
    let e = calculate_error(target, data, theta_vector, m);
    if(Math.abs(mse - e) <= error){
      break;
    }  // Convergiu
    mse = e
  }
  return theta_vector.map(el => parseFloat(el.toFixed(3)));
}

export function testFunction(){
  const no_target_array = [...data];
  const target_array = no_target_array.splice(1,1);
  const lr = linear_regression(target_array[0], no_target_array, 100, 20)
  return lr;

}


