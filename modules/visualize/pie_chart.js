import { html, Oid, OidUI, Bus} from '/lib/oidlib-dev.js'
class Graph extends OidUI{}

export class PieChart extends Graph{
    handleRender(topic, message){
        
    }
}

Oid.component({
    id: '--', //TODO
    element: 'pie_chart',
    properties:{
        title,
        data, 
    },
    receive: ['render'],
    implementation: PieChart
})