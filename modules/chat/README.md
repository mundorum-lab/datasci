# Module ChatGPT

# Description
> This module implements calls from the ChatGPT API to describe graphics, table and other relevant data.

# Team
* Felipe Pacheco Manoel
  * `<brief description of the activities developed by this member>`
* `<complete member name>`
  * `<brief description of the activities developed by this member>`

# Message Types

> This section comes before all component specifications since there are message types shared by various components.

**ContentInput**
~~~json
{
  tipo : string
  conteudo : json   
}
~~~

>The json type inside ContentInput should be flexible enough to receive any message type from other components as multiple components should be able to send their data. 

**WorkflowFormat**
~~~json
{
  nodeList : [{
    nome: string
    Adjacencia: [string]
    canalPublicado: string
  }]

}
~~~

# Components

## Component ChatGPT

> Given some valid data which the user wants to interpret, this components returns an interpretation of the data.

### Input Notices

notice | action | message type
-------| ------ | ------------
`workflow` | After the workflow is finished, gives the component information about the workflow, the component will store this data to do the analysis later | WorkflowFormat
`componentData` | Contains the data from a specific component which will be necessary to perform the API calls, after receiving , the data processing will start | ContentInput

### Output Notices

notice    | source | message type
----------| -------| ------------
`chatResult` | The API sucessfully returned the result, the result will be posted in the bus | string

## Component GenericWorkflowNode
 
> This node represents a generic component of the workflow

### Input Notices

notice | action | message type
-------| ------ | ------------
`dataPublish` | data processing finished and is ready to publish, publish data for the children nodes | Any
 
> the message type depends on actual component of the node

### Output Notices

notice | action | message type
-------| ------ | ------------
`dataReceive` | data is received from parents | Any

# Components Narratives

> Present one or more narratives exemplifying the interaction of your components. It can be a single description comprising all components or several short descriptions. It can be only among your components or can include expected external components. External components can be less detailed.

## Setup

> Specify here the components involved in the narrative and their publish/subscribe attributes in HTML.

~~~html
<web-component1 attribute="value"
                attribute="value"
                publish="notice:topic">
</web-component1>

<web-component2 attribute="value"
                subscribe="topic:notice">
</web-component2>
~~~

## Narrative

> Describe here the narrative as a sequence of steps. The format is free, but you can follow the approach suggested in the example below.
