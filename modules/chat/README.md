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

## Component chat-button-oid

> Button to request the explanation of a component

### Properties

property | role
---------| --------
`id` | `unique identifier of the component,relative to the workflow, it let the component find itself in the workflow`

### Input Notices

notice | action | message type
-------| ------ | ------------
`receiveId` | stores the component Id to search the workflow to find relevant nodes | SingleValue

### Output Notices

notice    | source | message type
----------| -------| ------------
copyAndOpenChatGPT | copy the generated prompt to the clipboard and opens a new window to openAI | ---

## Component chat-oid

> Generates the prompt to explain some workflow state

### Properties

property | role
---------| --------
`id` | `unique identifier of the component,relative to the workflow, it let the component find itself in the workflow`
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
`prompt` | provides the generated prompt customized by the current workflow state

# Components Narratives


## Setup

~~~html
<chat-button-oid componentId="<insert componentId here>">
</chat-button-oid>

<chat-oid subscribe="workflowMap:dataPublish;receive/<targetComponentID>/data:receiveData;receive/<targetComponentID>/type:receiveType;receive/<targetComponentID>/value:receiveValue"
          publish="itf:prompt">
</chat-oid>

~~~

## Narrative

* The chat-oid component subscribes to the topic "workflowState", which has a map of all the connections made.
* The chat-button-oid is placed in each presentation module
* When a button is clicked, the chat button calls the chat-oid and provides the component id
* Then, the component searches int he workflow for the full path until the node the user would like to explain.
* Then, it will send getters to the component to retrive their data.
* After receiving all of them by the proper receive/<targetComponentID> bus,it will generate the prompt
* Then, the response returns to the chat button with the interface prompt
* Finally, the chat button copies the prompt to the clipboard, sending an alert and opens a new tab to chatGPT
