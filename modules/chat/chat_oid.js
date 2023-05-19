import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ChatOid extends OidUI {
  async connectedCallback(){
    super.connectedCallback()
    let workflowMap= await fetch("./workflowMapExample.json");
    workflowMap=await workflowMap.json(0);
    
    let returnedValue=this.findConnectedNodes(workflowMap);
    console.log(returnedValue)
   
  //   // this.setGraphInfo()
  //   // this.generatePrompt()
  //   // this.requestToOpenAI()
  }

  setGraphInfo(topic, message){
    console.log('=== topic/message')
    console.log(topic)
    console.log(message)
    this.columns = message.columns
    this.inputData = message.data
    this.inputType = message.type
    this.generatePrompt()
    this.requestToOpenAI()
  }
 
  generatePrompt(){
    this.prompt = `A ${this.inputType} has the following columns : ${this.columns} and the data are: ${this.inputData} Explain it to me.`
  }

  requestToOpenAI() {
    this.explanation = 'explanation of the prompt'
  }
  //   fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.openAiApiKey}`
  //     },
  //     body: JSON.stringify({
  //       prompt: this.prompt,
  //       max_tokens: 100,
  //       n: 1,
  //       stop: ['\n']
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     const explanation = data.choices[0].text.trim();
  //     this.explanation = explanation;
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  // }
  

  findConnectedNodes(workflowMap){
    let edgesArray=workflowMap.edges
    let counter=0
    let id_found=edgesArray[counter][1]
    console.log("chatID:"+this.chatId)
    while (id_found!=parseInt(this.chatId)){
      counter+=1
      id_found=edgesArray[counter][1]
    }
    let objId1=edgesArray[counter][0]
    let obj1=null
    
    for(let i in workflowMap.nodes){
      if (workflowMap.nodes[i].nodeId==objId1){
        obj1=workflowMap.nodes[i]
        break
      }
    }
    counter=0
    id_found=edgesArray[counter][1]
    while (id_found!=objId1){
      counter++
      id_found=edgesArray[counter][1]
    }
    let objId2=edgesArray[counter][0]
    let obj2=null
    for(let i in workflowMap.nodes){
      if (workflowMap.nodes[i].nodeId==objId2){
        obj2=workflowMap.nodes[i]
        break
      }
    }
    
    return [obj1,obj2]
  }
}

Oid.component(
{
  id: 'chat',
  element: 'chat-oid',
  properties: {
    openAiApiKey: {},
    chatId: {default: '8'},
    'columns' : {default: ''},
    'input-data':{default: ''},
    'input-type':{default: ''},
    prompt: {default: ''},
    explanation: {default: ''}
  },
  receive: {graph: 'setGraphInfo'},
  template: html`<h1>Prompt : {{this.prompt}}</h1><h1>Explanantion : {{this.explanation}}</h1>`,
  implementation: ChatOid
})