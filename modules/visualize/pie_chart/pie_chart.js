import {graph_component} from '../graph.js'
function drawPieChart(canvas){
    let obj_data = JSON.parse(this.data);
    let obj_options = JSON.parse(this.options);
    obj_options['animation']['animateScale'] = JSON.parse( obj_options['animation']['animateScale']);
    obj_options['animation']['animateRotate'] = JSON.parse( obj_options['animation']['animateRotate']);  
    obj_options['plugins']['title']['display'] = JSON.parse( obj_options['plugins']['title']['display'])
    new Chart(canvas, {
        type: "pie",
        data: obj_data,
        options: obj_options
    });
}

graph_component('pie-chart',drawPieChart,'pie_chart/pie_chart_icon.svg');