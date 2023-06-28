import { html, Oid, OidWeb } from '/lib/oidlib-dev.js'

export class ChatOid extends OidWeb {
  #hasWorkflow=false
  #connectedList=[]
  #descriptions=null
  async connectedCallback(){
    super.connectedCallback()
    // // console.log("connected callback")
    let descriptions= await fetch("\\modules/chat/descriptions.json");
    this.#descriptions=await descriptions.json(0);
    
    // let myComponent=this.findComponent(workflowMap,4);
    // // console.log([4,myComponent])
    // let previousComponents=this.findPreviousComponents(workflowMap,4)
    // // console.log(previousComponents)
   
  //   // this.setGraphInfo()
  //   // this.generatePrompt()
  //   // this.requestToOpenAI()
    
  }
  // connectionReady(cInterface,id,component){
  //   super.connectionReady(cInterface,id,component)
  //   // console.log(`itf = ${cInterface} id = ${id} component = ${component.id}`)

  //   if(cInterface.includes('itf:oid')){
  //     // console.log(`connected with ${id}`)
  //   }
  // }
  setGraphInfo(topic, message){
    // console.log('=== topic/message') //
    // console.log(topic)
    // console.log(message)
    // this.columns = message.columns
    // this.inputData = message.data
    // this.inputType = message.type
    // this.generatePrompt()
    // this.requestToOpenAI()
    this.workflowMap=message
    if(this.#hasWorkflow==false){
      console.log("reached hasWorkflow")
      this.#hasWorkflow=true
      console.log(this.#connectedList)
      for (let i of this.#connectedList){
        let myComponent=this.findComponent(this.workflowMap,i)
        console.log(myComponent)
        if (myComponent.nodeType == 'table-view-oid'){
          let trueComponent=this.findPreviousComponents(this.workflowMap,i)[0][0]
          this._connect("itf:oid",trueComponent,this)
          console.log(`connected to ${trueComponent}`)
        }

      }
    }
    else{
      this.#connectedList=[]
    }
    
  }
 
  async generatePrompt(workflowMap, componentId){
    const tableList=["transform","ts:filter","groupBy","columnOperation","deleteColumn"]
    const valueList=["minimum","maximum","count","orderBy","uniqueValues","mean","median","mode","standarddeviation", "zScoreNorm", "alias"]
    let finalComponent = this.findComponent(this.workflowMap, componentId)
    let finalComponentId = componentId
    // esse if depende do tipo do visualizador das apresentaçoes
    if (finalComponent.nodeType === 'table-view-oid'){ 
      let previousComponents = this.findPreviousComponents(this.workflowMap, componentId)
      finalComponent = previousComponents[0][1]
      finalComponentId= previousComponents[0][0]
    }
    console.log(finalComponent)
    let path = this.findFullPathToComponent(workflowMap, componentId)
    let prompt = `You are a high specialized data science program called DataGPT.
                  I want to understand the following experiment:`
    let index = 0
    for (let component of path){
      index += 1
      let descriptions=this.#descriptions.content
      let componentDescription=null
      let componentName=null
      for (let i of descriptions){
        if (i.type===component.nodeType){
          
          componentDescription=i.description
          componentName=i.name
        }
      }
      if (component == finalComponent){
        if (this.arrayCheck(tableList,component.nodeType) || this.arrayCheck(valueList,component.nodeType)){
          let table=await this.getData(finalComponentId,'table')
          let result=await this.getData(finalComponentId,'result')
          // console.log("interface oid received")
          console.log(table)
          console.log(result)
          if (componentName!=null && componentDescription!=null){
            console.log("null test")
            prompt+=`The last component which I want to analyse is a ${componentName},${componentDescription}, it receives the input ${JSON.stringify(table)} and the output is ${JSON.stringify(result)}
        Explain it to me.Please explain the data provided as well.`
          }
          else{
            prompt+=`The last component which I want to analyse is a ${component.nodeType}, it receives the input ${JSON.stringify(table)} and the output is ${JSON.stringify(result)}
        Explain it to me.Please explain the data provided as well.`
          }
          
        }
        else if (component.nodeType==="graph-oid"){
          let data=await this.getData(finalComponentId,'data')
          let type=await this.getData(finalComponentId,'type')
          if (componentName!=null && componentDescription!=null){
            prompt +=`The last component which I want to analyse is a ${componentName},${componentDescription},its type is a ${type} , and it is based on ${JSON.stringify(data)}.
            Explain it to me. Please explain the data provided as well.`
          }
          else{
            prompt+=`The last component which I want to analyse is a ${type} graph, based on ${JSON.stringify(data)}.
        Explain it to me. Please explain the data provided as well.`
          }
          
        }
        break
        
      }
      else{
        if (index==1){
          if (componentName!=null && componentDescription!=null){
            prompt += `Firstly,${componentName} was added,${componentDescription}. `
          }
          else{
            prompt += `Firstly,${component.nodeType} was added. `
          }
        } 
        else{
          console.log("else index")
          if (componentName!=null && componentDescription!=null){
            prompt += `Then,${componentName} was added,${componentDescription}. `
          }
          else{
            prompt += `Then,${component.nodeType} was added. `
          }
        }
      }
      
    }
    // // console.log(path)
    // // console.log(`prompt:${prompt}`)
    return prompt
    
    
  }
  async getData(componentId,attributeName){
    // await this._connect(`itf:oid`,componentId,this)
    // // console.log(`type = ${typeof(componentId)}`)
    
    // console.log(`attributeName: ${attributeName}`)
    console.log("getData")
    console.log(componentId)
    console.log(attributeName)
    let componentData=await this._bus.invoke (`itf:oid`, componentId, 'get', {property:attributeName})
    // this._invoke(`itf:oid`,componentId,"get",{property:attributeName})
    
    // console.log(`data:${componentData}`)
    return componentData
  }
  
  arrayCheck(array,obj){
    // console.log(array)
    // console.log(obj)
    let value=false
    for(let element of array){
      if (element==obj)
        value=true
    }
    return value
  }
  // requestToOpenAI() {
  
  //   component.explanation = `The scatterplot you described has three columns: "eixo x," "eixo y," and "eixo z." Each row of the data represents a point in three-dimensional space.

  //   Let's break down the data:
    
  //       The first row [0, 1, 2] represents a point in the scatterplot with coordinates (0, 1, 2). The value 0 corresponds to the x-axis, 1 corresponds to the y-axis, and 2 corresponds to the z-axis.
    
  //       The second row [1, 2, 4] represents a point with coordinates (1, 2, 4). Here, 1 is the value along the x-axis, 2 is the value along the y-axis, and 4 is the value along the z-axis.
    
  //       The third row [9, 5, 8] represents a point with coordinates (9, 5, 8). The value 9 represents the x-coordinate, 5 represents the y-coordinate, and 8 represents the z-coordinate.
    
  //   In a scatterplot, each point is plotted as a single marker based on its coordinates in the three-dimensional space. The x-axis, y-axis, and z-axis represent different variables or dimensions that you are examining. The scatterplot allows you to visualize the relationships or patterns between these variables in a three-dimensional space.`
  // }
  
  

  findComponent(workflowMap,Id){
    let component=null
    
    for(let i in workflowMap.nodes){
      // // console.log("workflow node = ",workflowMap.nodes[i].nodeId, "///",Id)
      if (workflowMap.nodes[i].nodeId===Id){
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

  findFullPathToComponent(workflowMap, Id){
    let edgesArray=workflowMap.edges
    let componentsFound=[]
    let currentComponentId = Id
    componentsFound.push(this.findComponent(workflowMap,Id))
    let end_statement = 'False'
    // // console.log(edgesArray.length)
    while (end_statement === 'False'){
      let index = 0
      for (let component of edgesArray){
        index += 1
        // // console.log("component = ",component, "currentId = ", currentComponentId, "componentsFound = ", componentsFound)
        if (component[1] === currentComponentId){
          componentsFound.push(this.findComponent(workflowMap,component[0]))
          // // console.log("component was Found = ", componentsFound)
          currentComponentId = component[0]
          break
        }
        // // console.log("aa", component.index, edgesArray.length)
        if (index === edgesArray.length)
          end_statement = "True"
      }
    }
    return componentsFound.reverse()

  }

  async handlePrompt(op,message){
    let componentId=message.value
    // console.log(`id:${componentId}`)
    let myPrompt=await this.generatePrompt(this.workflowMap,componentId)
    // console.log(`prompt:${myPrompt}`)
    // let mainComponent=this.findComponent(this.workflowMap,componentId)
    // let previousComponents=this.findPreviousComponents(this.workflowMap,componentId)
    return {value:myPrompt}

  }

  handleConnect(op,message){
    // console.log(`entered on connect`)
    let componentId=message.value
    this._connect(`itf:oid`,componentId, this)
    this.#connectedList.push(componentId)
    if(this.#hasWorkflow==true){
      for (let i of this.#connectedList){
        let myComponent=this.findComponent(this.workflowMap,i)
        if (myComponent.nodeType === 'table-view-oid'){
          let trueComponent=this.findPreviousComponents(this.workflowMap,i)[0][0]
          this._connect("itf:oid",trueComponent,this)
        }

      }
      this.#connectedList=[]
    }
   
  }

}

Oid.cInterface ({
  id: 'itf:chat',
  operations: {
    'prompt': {
      response: true
    
    },
    'connect':{
      response: false
    }
  },
  cardinality: '1:n'
})

Oid.component(
{
  id: 'chat',
  element: 'chat-oid',
  properties: {
    workflowMap: {default: {
      "nodes":
      [
      {
          "nodeId":1,
          "nodeType":"file-input",
          "attributes":{}
      },
      {
          "nodeId":2,
          "nodeType":"file-typing",
          "attributes":{}
      },
      {
          "nodeId":3,
          "nodeType":"filter",
          "attributes":{   
              "table" : {},
              "status" : true,
              "name" : "",
              "type" : ""
          }
  
      },
      {
          "nodeId":4,
          "nodeType":"minimum",
          "attributes":{   
              "value" : 0,
              "status" : true,
              "name" : "",
              "type" : ""
          }
      },
      {
          "nodeId":5,
          "nodeType":"cluster",
          "attributes":{}
      },
      {
          "nodeId":6,
          "nodeType":"graph",
          "attributes":{   
              "size" : {},
              "id" : 0,
              "options" : "",
              "type" : ""
          }
      },
      {
          "nodeId":7,
          "nodeType":"graph",
          "attributes":{   
              "size" : {},
              "id" : 0,
              "options" : "",
              "type" : ""
          }
      },
      {
          "nodeId":8,
          "nodeType":"chatGPT",
          "attributes":{
              "chat-id":0,
              "prompt":""
          }
      },
      {
          "nodeId":9,
          "nodeType":"chatGPT",
          "attributes":{
              "chat-id":0,
              "prompt":""
          }
      },
      {
          "nodeId":10,
          "nodeType":"chatGPT",
          "attributes":{
              "chat-id":0,
              "prompt":""
          }
      }
  
  
      ],
      "edges":[[1,2],[2,3],[3,4],[3,5],[4,8],[5,6],[5,7],[6,9],[7,10]]
  },


  },
    // 'columns' : {default: 'undefined'},
    // 'input-data':{default: 'undefined'},
    // 'input-type':{default: 'undefined'},
    // prompt: {default: ''},
  },
  
  
  

  receive: {graph: 'setGraphInfo'},
  provide: ['itf:chat'],
  // template: html`<h1>Prompt : {{this.prompt}}</h1><h1>Explanantion : {{this.explanation}}</h1>`,
  implementation: ChatOid
})