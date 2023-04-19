# Where to place your specification

Each module will create a subfolder below the folder `[/modules]` in the `datasci` repository. In this folder, there are all the files of the specification (including images). Subfolder by module:

* Data Extraction and Access - `[data]`
* Relational Transformations - `[transform]`
* Statistical Transformations - `[model]`
* Charts - `[visualize]`
* Presentation Space - `[presentation]`
* Workflow - `[workflow]`
* Chat - `[chat]`

A `README.md` has to be in the root of this module folder, following the template presented in *Template for Components Specification*.

# About the Specification Template

Below is the model to document the specification. Anything between `<...>` indicates something that should be replaced by the indicated one.
> In addition, everything appearing in this citation mode also refers to something that must be replaced by the indicated one (without citation).

There are illustrative examples in the template, which will be replaced by those in your specification.

# Folder and Files Structure

> Each subproject must present its folder/file organization. It is unnecessary to document every folder and file; just the most significant to understand the project structure. See the following example:

~~~
├── README.md <- module specification
│
├── images    <- image files used in the specification
│
└── assets    <- other resources (if any)
~~~

# Template for Module Specification

# Module `<Title>`

# Description
> Brief description of this module's role in the main project.

# Team
* `<complete member name>`
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

# Example Specification

# Message Types

**`SingleValue`**
~~~json
{
  value: string
}
~~~

# Components

## Component `button-oid`

Show a button on the page that publishes a message for each interaction (e.g., click).

### Properties

property  | role
----------| --------
`label`   | label presented inside the button
`value`   | value of the button -- published inside messages
`tooltip` | extra information presented when the user moves the mouse over the button

### Output Notices

notice       | source  | message type
-------------| --------| ------------
`click`      | the user clicks the mouse over the button | `SingleValue`
`mouseenter` | the user enters the mouse pointer into the button area | `SingleValue`
`mouseleave` | the user leaves the mouse pointer from the button area | `SingleValue`

## Component `console-oid`

Show a console-like display on the page and present messages in it.

### Properties

property | role
---------| --------
`prompt` | customize the prompt preceding each message; default is `>`

### Input Notices

notice    | action  | message type
----------| --------| ------------
`display` | displays a message in the console | `SingleValue`
`clear`   | clear all console messages | `empty`

# Components Narratives

## Setup

~~~html
<button-oid label="Start"
            value="The dinosaur jumped into the mud."
            publish="click:show/message">
</button-oid>

<console-oid prompt="*"
             subscribe="show/message:display">
</console-oid>
~~~

## Narrative

* Two components: a button labeled "`Start`" (`button-oid`) and a console (`console-oid`).
* The console subscribes to the topic "`show/message`".
* The user clicks on the button that:
  * produces the notice "`click`";
  * maps it and publishes a message with the topic "`show/message`" whose value is the sentence "`The dinosaur jumped into the mud.`".
* The console receives the message with the topic "`show/message`" and:
  * maps it to the "`display`" notice;
  * displays the sentence "`The dinosaur jumped into the mud`".

