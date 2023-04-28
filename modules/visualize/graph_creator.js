import { html, Oid, OidUI, Bus} from '/lib/oidlib-dev.js'

function getGraphOptions(){
    return ['piechart'];
}

function optionsToHtml(list){
    let options_html = ''
    for(const element of list){
        options_html+= `<option value="${element}"> ${element} </option>`
    }   
    return options_html
}

function createGraphData(id, type, data){
    return {graph_id: id, graph_type: type, data: data}
}

export class GraphCreator extends OidUI {
    _send_graph_node(){
        Bus.i.publish(`add/node/graph`, createGraphData(this.graph_id, this.graph_type, this.data));
        this.visible = 'hidden'
    }

    handleCreate(topic, message){
        this.graph_id = message.graph_id
        this.data = message.data
        this.visible = 'visible'
    }

    handleUpdate(topic, message){
        this.graph_id = message.graph_id
        this.graph_type = message.graph_type
        this.data = message.data
        this.visible = 'visible'
    }
}
  
Oid.component(
  {
    id: '--', //TODO
    element: 'create-graph',
    properties:{
        graph_id: {default: null},
        graph_type: {default: null},
        data: {default: null},
        visible: {default: 'hidden'}
    },
    receive: ['create', 'update'],
    template: html`<div style='visibility: {{this.visible}}'>
                    <h1>Editing graph {{this.graph_id}}</h1>
                    <select>${optionsToHtml(getGraphOptions())}</select>
                    <button @click = {{this._send_graph_node}}>save</button>
                    </div>`,
    implementation: GraphCreator
  })