import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class GraphMockOid extends OidUI {
    async connectedCallback(){
        super.connectedCallback()
        // this.GraphInfo()
        let workflowMap= await fetch("./workflowMapExample.json");
        this.workflowMap=await workflowMap.json(0);
    }
    _graphInfo () {
        // this._notify( 'infos', {
        //                                 type: this.type, 
        //                                 columns: this.columns,
        //                                 data: this.data
        //                             }
        //                             )

        this._notify('infos',this.workflowMap)
        console.log("notified")
    }
    handleConnect(){
      this.status = `I am a ${this.type} with columns ${this.columns} and data ${this.data}`
    }
}

Oid.component(
{
  id: 'graph-mock',
  element: 'graph-mock-oid',
  properties: {
    workflowMap:{default:null},
    // columns:{},
    // data:{},
    // type:{},
    status:{default : ""}
  },
  receive: {connect: 'handleConnect'},
  template: html`<h1>{{this.status}}</h1>
                <h1 @click={{this._graphInfo}}>Click to Explain</h1>`,
  implementation: GraphMockOid
})