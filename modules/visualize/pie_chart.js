import {graph_component} from './graph.js'
function drawPieChart(canvas, data){
    let obj_data = JSON.parse(data);
    new Chart(canvas, {
        type: "pie",
        data: obj_data['data'],
        options: obj_data['options']
    });
    console.log(obj_data);
}

graph_component('pie-chart',drawPieChart);