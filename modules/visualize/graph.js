import { html, Oid, OidUI, Bus} from '/lib/oidlib-dev.js'
class Graph extends OidUI{
    handleGetId(topic, message){
        return this.id
    }
    handleGetTitle(topic, message){
        return this.graphTitle
    }
    handleGetData(topic, message){
        return this.getData
    }

    handleRender(topic, message){
        const canvas = document.createElement('canvas');
        canvas.id = this.getCavasId();
        this.draw(canvas, this.getParsedData());
    }

    getCavasId(){
        return this.id+'/canvas'
    }
    
    getParsedData(){
        return this.data
    }
}

export class Graphoid{
    component(element, draw){
        Oid.component({
            id: '--', //TODO
            element: element,
            properties:{
                title,
                data,
                draw: {default: draw}, 
            },
            receive: ['render'],
            implementation: Graph
        })
    }
}