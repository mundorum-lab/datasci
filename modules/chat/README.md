# Module ChatGPT

# Description
> This module has the function to explain some of the generated data to the final user using the ChatGPT API.

# Team
* `João Vitor Baptista Moreira`
* `Felipe Pacheco Manoel`

# Message Types


**ValidTable**
~~~json
{
  "columns" : [{"name":string,"type":string}],
  "data" : [[any]]
}
~~~

**SingleValue**
~~~json~~~
{
  "value": any
}
~~~

**WorkflowState**
~~~json
{
  "nodes": [{
    "nodeId": int,
    "nodeType": string,
    "attributes": {...}
  }],

  "edges" : [[int, int],[int, int], ...]
}
~~~

**Explanation**
~~~json
{
  "explanation": string
}
~~~

# Components


## Component ChatGPT

> Given some input data, provides a brief text explanation to the user about its content. The input data can be a graph, statistics, connections

### Properties

property | role
---------| --------
`id` | `unique identifier of the component,relative to the workflow, it let the component find itself in the workflow`
`openAiApiKey` | `api key to access the openAI api`
`relevantComponents` | `relevant components to generate the prompt`

### Input Notices

notice | action | message type
-------| ------ | ------------
`receiveData` | stores the data received | ValidTable
`receiveType` | stores the type received | SingleValue
`receiveWorkflow` | stores workflow and starts to find relevant nodes | WorkflowState
`receiveValue` | stores single value received | SingleValue
### Output Notices

notice    | source | message type
----------| -------| ------------
`showExplanation` | received result from ChatGPT API | Explanation
`getData` | after finding the node conected to this component 
`getType` | after finding the node conected to this component, only if component found have this parameter 
`getValue`| after finding the node conected to this component, only if component found have this parameter 

# Components Narratives


## Setup

~~~html
<chat-component openAiAPIkey="<insert API key here>",id="<insert id here>"
                publish="showExplanation:show/explanation;getData:get/<targetComponentID>/data;getType:get/<targetComponentID>/type;get/<targetComponentID>/value"
                subscribe="workflowMap:dataPublish;receive/<targetComponentID>/data:receiveData;receive/<targetComponentID>/type:receiveType;receive/<targetComponentID>/value:receiveValue">
</chat-component>

~~~

## Narrative

* The chat component subscribes to the topic "workflowState", which has a map of all the connections made.
* Then, the component searches for the components which the chatGPT node is connected.
* Then, it will send getters to the component to retrive their data.
* After receiving all of them by the proper receive/<targetComponentID> bus,it will generate the prompt and will call the openAI Api with the customized prompt and its attribute openAiApiKey
* Finally, the response is published with the topic show/explanation
