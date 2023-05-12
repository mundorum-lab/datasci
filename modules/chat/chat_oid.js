import { html, Oid, OidWeb } from '/lib/oidlib-dev.js'

export class ChatOid extends OidWeb {
  connectedCallback(){
    super.connectedCallback()
    this.generatePrompt()
  }
  generatePrompt(){
    this.prompt = `Explain a ${this.input_type} with the following data: ${this.input_data}`
  }
  findConnectedNodes(workflowMap){
    let edgesArray=workflowMap.edges
    let counter=0
    let id_found=edgesArray[counter][1]
    while (id_found!=chat_id){
      counter++
      id_found=edgesArray[counter][1]
    }
    let objId1=edgesArray[counter][0]
    let obj1=null
    for(i in workflowMap.nodes){
      if (i.nodeId==objId1){
        obj1=i
        break
      }
    }
    counter=0
    id_found=edgesArray[counter][1]
    while (id_found!=obj1Id){
      counter++
      id_found=edgesArray[counter][1]
    }
    let objId2=edgesArray[counter][0]
    let obj2=null
    for(i in workflowMap.nodes){
      if (i.nodeId==objId2){
        obj2=i
        break
      }
    }
    return obj1,obj2
  }
}

Oid.component(
{
  id: 'chat',
  element: 'chat-oid',
  properties: {
    chat_id: {default: ''},
    input_data:{default: ''},
    input_type:{default: ''},
    prompt: {default: ''},
  },
  // recieve: {generate: 'generatePrompt'},
  template: html`<h1>{{this.prompt}}</h1>`,
  implementation: ChatOid
})