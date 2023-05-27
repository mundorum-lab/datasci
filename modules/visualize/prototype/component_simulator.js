import {Bus} from '/lib/oidlib-dev.js'
            


function openGraphCreator(){
    const graph_creator = document.getElementById('create_graph')
    graph_creator.style.visibility = 'visible'
    graph_creator.style.height = 'auto'
}
window.openGraphCreator = openGraphCreator;

function createPieChart(){
    const graph_creator = document.getElementById('create_graph');
    const prefix = 'graph_creator_'
    const title = document.getElementById(prefix+'graph_title').value
    const display_title = document.getElementById(prefix+'display_graph_title').value
    const animations = document.getElementById(prefix+'animations').value
    const cutout = (document.getElementById(prefix+'cut_out').value).toString()+'%'
    const radius = (document.getElementById(prefix+'radius').value).toString()+'%'

    let xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    let yValues = [55, 49, 44, 24, 15];
    let barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145"
    ];
    
    const pie_chart_data = {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        };

    const pie_chart_options = {
            plugins:{
                title:{
                    display: display_title,
                    text: title
                }
            },
            cutout: cutout,
            radius: radius,
            animation:{
                animateScale: animations,
                animateRotate: animations
            }
        }

    const chart = document.createElement('pie-chart')
    chart.setAttribute('data',JSON.stringify(pie_chart_data))
    chart.setAttribute('options',JSON.stringify(pie_chart_options))
    chart.setAttribute('subscribe', "presentation/display/graph:render")
    chart.setAttribute('subscribe', "workflow/graph/update:setOptions")

    const body = document.getElementsByTagName('body')[0]
    body.appendChild(chart)
    
    graph_creator.style.visibility = 'hidden'
    graph_creator.style.height = '0'
}
window.createPieChart = createPieChart

function updatePieChart(){
    let message = {
        plugins:{
            title:{
                display: true,
                text: 'titulo atualizado'
            }
        }   
    }
    Bus.i.publish('workflow/graph/update',message);
}
window.updatePieChart = updatePieChart

function visualizeGraph(){
    Bus.i.publish('presentation/display/graph',{});
}
window.visualizeGraph = visualizeGraph

function stopVisualize(){
    const body = document.getElementsByTagName('body')[0]
    let canvas = document.getElementsByTagName('canvas')
    console.log(canvas)
    while(canvas.length != 0){
        body.removeChild(canvas[0])
    }
}
window.stopVisualize = stopVisualize

