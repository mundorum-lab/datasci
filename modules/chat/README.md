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

**`<type identification>`**
~~~json
{
  <field>: <type>
  <field>: {
    <field>: <type>
    ...
  }
  <field>: [<type>]
  <field>: <message type>
}
~~~

> Types inspired in [TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html): `boolean`, `number`, and `string`. Specify arrays with the element type under brackets, e.g., `[number]`.

> One can use a second message type inside a given message type (illustrated as `<message type>`).

> Use camel case to identify message types, starting with uppercase (same practice for class names in JavaScript).

# Components

> Present a subsection for each component, following the model below:

## Component `<Name>`

> Summary of the component's role and services it provides.

### Properties

property | role
---------| --------
`<property name>` | `<role of this property in the component>`

### Input Notices

notice | action | message type
-------| ------ | ------------
`<notice label>` | `<description of the action triggered by the notice>` | `<the type of message body attached to the notice --  empty if there is no message>`

### Output Notices

notice    | source | message type
----------| -------| ------------
`<notice label>` | `<description of the event that produced the notice>` | `<the type of message body attached to the notice --  empty if there is no message>`

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
