import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class ChatOid extends OidUI {
  async connectedCallback(){
    super.connectedCallback()
    let workflowMap= await fetch("./workflowMapExample.json");
    workflowMap=await workflowMap.json(0);
    
    let myComponent=this.findComponent(workflowMap,4);
    console.log([4,myComponent])
    let previousComponents=this.findPreviousComponents(workflowMap,4)
    console.log(previousComponents)
   
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
  
  

  findComponent(workflowMap,Id){
    let component=null
    
    for(let i in workflowMap.nodes){
      if (workflowMap.nodes[i].nodeId==Id){
        component=workflowMap.nodes[i]
        break
      }
    }
    return component
  }


  findPreviousComponents(workflowMap,Id){
    let edgesArray=workflowMap.edges
    let baseComponentId=Id
    let componentsFound=[]
    for(let i of edgesArray){
      if (i[1]==baseComponentId)
        componentsFound.push([i[0],null])
    }
    for (let i of componentsFound){
      for(let j in workflowMap.nodes){
        if (workflowMap.nodes[j].nodeId==i[0]){
          i[1]=workflowMap.nodes[j]
          break
        }
      }
    }
    
    
    return componentsFound
  }
}


Oid.component(
{
  id: 'chat',
  element: 'chat-oid',
  properties: {
    openAiApiKey: "",
    chatId: {default:''},

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