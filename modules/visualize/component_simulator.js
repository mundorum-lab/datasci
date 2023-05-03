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

//Bus.i.subscribe('add/node/graph', workflow_add_graph)
//Bus.i.publish('workflow/create/graph',{graph_id: '1', data: null})
window.onload = (event)=>{

    Bus.i.publish('presentation/display/graph',{});
    console.log('message sent');
}