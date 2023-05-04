import { html, Oid, OidUI, Bus} from '/lib/oidlib-dev.js'
class Graph extends OidUI{
    handleGetData(topic, message){
        return this.getData
    }

    handleRender(topic, message){
        const canvas = document.createElement('canvas');
        canvas.style ="max-height:400px;max-width:400px";
        this.draw(canvas.getContext("2d"), this.getParsedData());
        
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(canvas);
    }
    
    getParsedData(){
        return this.data
    }
}

export function graph_component(element, draw, icon_path){
    Oid.component({
        id: '--', //TODO
        element: element,
        properties:{
            data: {default: null},
            draw: {default: draw}, 
        },
        receive: ['render','getData'],
        template: html`<div style='width:20px;height:20px;'><img src='${icon_path}'/></div>`,
        implementation: Graph
    })
}