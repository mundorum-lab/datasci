import {Bus} from '/lib/oidlib-dev.js'
            

function workflow_add_graph(topic, message){
    console.log('new workflow message')
    console.log(topic);
    console.log(message);
    if(topic != 'add/node/graph'){
        return
    }

    let workflow = document.getElementById('workflow');
    workflow.innerHTML+= `${message.graph_id};`

}

function openGraphCreator(){
    const graph_creator = document.getElementById('create_graph');
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
        data:{
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
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
    };

    const chart = document.createElement('pie-chart');
    chart.setAttribute('data',JSON.stringify(pie_chart_data));
    chart.setAttribute('subscribe', "presentation/display/graph:render");

    const body = document.getElementsByTagName('body')[0];
    body.appendChild(chart);
    
    graph_creator.style.visibility = 'hidden'
    graph_creator.style.height = '0'
}
window.createPieChart = createPieChart;

//Bus.i.subscribe('add/node/graph', workflow_add_graph)
//Bus.i.publish('workflow/create/graph',{graph_id: '1', data: null})
/*
*/
function visualizeGraph(){
    Bus.i.publish('presentation/display/graph',{});
}
window.visualizeGraph = visualizeGraph;