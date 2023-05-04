import {graph_component} from '../graph.js'
function drawPieChart(canvas, data){
    let obj_data = JSON.parse(data);
    obj_data['options']['animation']['animateScale'] = JSON.parse(obj_data['options']['animation']['animateScale']);
    obj_data['options']['animation']['animateRotate'] = JSON.parse(obj_data['options']['animation']['animateRotate']);  
    obj_data['options']['plugins']['title']['display'] = JSON.parse(obj_data['options']['plugins']['title']['display'])
    console.log(obj_data);
    new Chart(canvas, {
        type: "pie",
        data: obj_data['data'],
        options: obj_data['options']
    });
}

graph_component('pie-chart',drawPieChart,'pie_chart/pie_chart_icon.svg');