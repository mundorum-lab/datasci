import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ChatOid extends OidUI {
  // connectedCallback(){
  //   super.connectedCallback()
  //   // this.setGraphInfo()
  //   // this.generatePrompt()
  //   // this.requestToOpenAI()
  // }

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
    openAiApiKey: {},
    chat_id: {default: ''},
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