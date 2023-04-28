# Module `ChatGPT`

# Description
> This module has the function to explain some of the generated data to the final user.

# Team
* `João Vitor Baptista Moreira`
* `Felipe Pacheco Manoel`

# Message Types


**`Component Data`**
~~~json
{
  componentData: {
    componentName: string
    columns: [string]
    rows:    [[number]]
  }
}
~~~

**`Workflow Connections`**
~~~json
{
  workflowConnections: {
    component1: {
      connections : [componentData]
    }
    component2: {
      connections : [componentData]
    }
    ...
  }
}
~~~

**`Explanation`**
~~~json
{
  explanation: string
}
~~~

# Components


## Component `CHAT`

> Given some input data, provides a brief text explanation to the user about its content. The input data can be a graph, statistics, connections

### Properties

property | role
---------| --------
`openAiApiKey` | `api key to access the openAI api`
`relevantComponents` | `relevant components to generate the prompt`
`prompt` | `customized prompt based on the input data`
`explanation` | `text explanation to be published`

### Input Notices

notice | action | message type
-------| ------ | ------------
`Explain` | `generate the explanation of the components connected to the chat component` | `workflowConnections`

### Output Notices

notice    | source | message type
----------| -------| ------------
`showExplanation` | `publish the explanation of the components to be shown to the user` | `explanation`

# Components Narratives


## Setup

~~~html
<chat-component attribute="openAiApiKey"
                publish="showExplanation:show/explanation"
                subscribe="workflowMap:explain">
</chat-component>

~~~

## Narrative

* The chat component subscribes to the topic "`workflowMap", which has a map of all the connections made.
* Then, the component searches for the most relevant components that impact on the prompt generation.
* After that, it generates a prompt based on the relevant components attributes, such as name, columns, rows.
* It then calls the openAI Api with the customized prompt and its attribute openAiApiKey
* Finally, the response is published with the topic show/explanation
