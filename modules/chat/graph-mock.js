import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class GraphMockOid extends OidUI {
    // connectedCallback(){
    //     super.connectedCallback()
    //     this.GraphInfo()
    // }
    _graphInfo () {
        this._notify( 'infos', {
                                        type: this.type, 
                                        columns: this.columns,
                                        data: this.data
                                    }
                                    )
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
    columns:{},
    data:{},
    type:{},
    status:{default : ""}
  },
  receive: {connect: 'handleConnect'},
  template: html`<h1>{{this.status}}</h1>
                <h1 @click={{this._graphInfo}}>Click to Explain</h1>`,
  implementation: GraphMockOid
})