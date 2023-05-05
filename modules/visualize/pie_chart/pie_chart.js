import {graphComponent} from '../graph.js'
function drawPieChart(canvas){
    let objData = JSON.parse(this.data);
    let objOptions = JSON.parse(this.options);
    objOptions['animation']['animateScale'] = JSON.parse( objOptions['animation']['animateScale']);
    objOptions['animation']['animateRotate'] = JSON.parse( objOptions['animation']['animateRotate']);  
    objOptions['plugins']['title']['display'] = JSON.parse( objOptions['plugins']['title']['display'])
    new Chart(canvas, {
        type: "pie",
        data: objData,
        options: objOptions
    });
}

graphComponent('pie-chart',drawPieChart,'pie_chart/pie_chart_icon.svg');