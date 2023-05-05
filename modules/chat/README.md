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
`dataPublish` | data processing finished and is ready to publish, publish data for the children nodes | ComponentData

### Output Notices

notice    | source | message type
----------| -------| ------------
`showExplanation` | received result from ChatGPT API | Explanation

# Components Narratives


## Setup

~~~html
<chat-component attribute="openAiApiKey"
                publish="showExplanation:show/explanation"
                subscribe="workflowMap:dataPublish">
</chat-component>

~~~

## Narrative

* The chat component subscribes to the topic "`workflowMap", which has a map of all the connections made.
* Then, the component searches for the most relevant components that impact on the prompt generation.
* After that, it generates a prompt based on the relevant components attributes, such as name, columns, rows.
* It then calls the openAI Api with the customized prompt and its attribute openAiApiKey
* Finally, the response is published with the topic show/explanation
