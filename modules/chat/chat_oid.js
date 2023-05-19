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
  
    this.explanation = `The scatterplot you described has three columns: "eixo x," "eixo y," and "eixo z." Each row of the data represents a point in three-dimensional space.

    Let's break down the data:
    
        The first row [0, 1, 2] represents a point in the scatterplot with coordinates (0, 1, 2). The value 0 corresponds to the x-axis, 1 corresponds to the y-axis, and 2 corresponds to the z-axis.
    
        The second row [1, 2, 4] represents a point with coordinates (1, 2, 4). Here, 1 is the value along the x-axis, 2 is the value along the y-axis, and 4 is the value along the z-axis.
    
        The third row [9, 5, 8] represents a point with coordinates (9, 5, 8). The value 9 represents the x-coordinate, 5 represents the y-coordinate, and 8 represents the z-coordinate.
    
    In a scatterplot, each point is plotted as a single marker based on its coordinates in the three-dimensional space. The x-axis, y-axis, and z-axis represent different variables or dimensions that you are examining. The scatterplot allows you to visualize the relationships or patterns between these variables in a three-dimensional space.`
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
  //   console.log(response)
  //   .then(data => {
  //     const explanation = data.choices[0].text.trim();
  //     this.explanation = explanation;
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  // }

//   requestToOpenAI() {
//     console.log("Calling GPT3")
//     var url = "https://api.openai.com/v1/engines/davinci/completions";
//     var bearer = 'Bearer ' + this.openAiApiKey
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Authorization': bearer,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "prompt": "Once upon a time",
//             "max_tokens": 5,
//             "temperature": 1,
//             "top_p": 1,
//             "n": 1,
//             "stream": false,
//             "logprobs": null,
//             "stop": "\n"
//         })


//     }).then(response => {
        
//         return response.json()
       
//     }).then(data=>{
//         console.log(data)
//         console.log(typeof data)
//         console.log(Object.keys(data))
//         console.log(data['choices'][0].text)
        
//     })
//         .catch(error => {
//             console.log('Something bad happened ' + error)
//         });

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
    openAiApiKey: "",
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