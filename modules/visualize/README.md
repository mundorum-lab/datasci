# Module `Visualize`

# Description
The objective of the module is to allow the data, storaged in tables, to be shown in a graphically way to user. 

# Team
* Iago Caran Aquino - RA: 198921
* André Silva Telles - RA 165263
* Juliana Bronqueti da Silva - RA 238389
* Marcos Cunha Rosa - RA 240815

<br />

# Folder and Files Structure

```
├── availableNodes.json          -> module descriptions that can be placed in workflow
│
|
├── mocks                        -> folder with mock data and components for testing components
│     │
|     ├── data_mock.js           -> mock tables for testing
│     │
|     ├── options_mock.js        -> mock options maps for testing
│     │
|     ├── data_sender_oid.js     -> button that simulates sending data to the graph component
│     │
|     └── options_sender_oid.js  -> button that simulates sending options to the graph component
│
|
├── test                         -> files for unit and integration testing between components
│     │
|     ├── graphs_tests.html      -> graphics unit tests page
│     │
|     └── integration_data       -> exemple of integration with Data module page
│     │
|     └── integration_model      -> exemple of integration with Model module page
│     │
|     └── integration_transform  -> exemple of integration with Transform module page
│
|
├── export_button.js             -> component tha implements the export button
│
|
├── graph-oid.js                 -> component that creates the chart
│
|
├── exceptions                   -> folder that focus in error treatments
│     │
|     ├── visualize_exceptions.js             -> file that has all the funcions that create a specific type of exception
|
|
├── graph_states                 -> folder with UI states of the graph
│     │
|     ├── graph_state_template.js             -> file that has all functions that create a UI state for the graph
|
|
├── graph_data_builders          -> folder with graph configurations (type, data and options) builders
│     │
|     ├── create_data_configuration.js             -> function that is called by graph-oid component to build data configuration based in the graph type. Calls the specific builder for each type of chart.
│     │
|     ├── area_chart_data_builder.js               -> area chart configuration builder
│     │
|     ├── bar_chart_data_builder.js                -> bar chart configuration builder
│     │
|     ├── bubble_chart_data_builder.js             -> bubble chart configuration builder
│     │
|     ├── cluster_chart_data_builder.js            -> cluster chart configuration builder
│     │
|     ├── column_chart_data_builder.js             -> column chart configuration builder
│     │
|     ├── line_chart_data_builder.js               -> line chart configuration builder
│     │
|     ├── linear_regression_chart_data_builder.js  -> linear regression chart configuration builder
│     │
|     ├── pie_chart_data_builder.js                -> pie chart configuration builder
│     │
|     ├── polar_chart_data_builder.js              -> polar chart configuration builder
│     │
|     ├── radar_chart_data_builder.js              -> radar chart configuration builder
│     │
|     └── scatter_chart_data_builder.js            -> scatter chart configuration builder
│
|
├── icons                        -> folder with icons of graph nodes in workflow
|
|
├── assets                       -> folder with images that are used in the graph component
|
|
└── README.md                    -> module specification
```

<br />

# Message Types

**`Data`**

~~~json
{
  "columns": [
    {
      "name": "<string>",
      "type": "<string>"
    },
    {
      "name": "<string>",
      "type": "<string>"
    }
  ],
  "data": [
    ["column1","column2","column_n"],
    ["column1","column2","column_n"],
  ]
}
~~~
This was the format of the table agreed between the groups. The `GraphOid` component will be able to receive this table as input to generate the graph.

<br />

**`Options`**

~~~json
{
	"fields": [{
		"x": "<int>",
		"y": "<int>",
		"title": "<String>",
		?"z": "<int>",
	},
	? {
		"x": "<int>",
		"y": "<int>",
		"title": "<String>",
		?"z": "<int>"
	}],
	"title": "<String>",
	"scales": {
		"x-title": "<String>",
		"y-title": "<String>",
		"type": "<String(linear/category)>",
		?"min": "<int>",
		?"max": "<int>",
		?"log-scale": "<boolean>"
	}
}
~~~
This is the JSON format that is received by the `GraphOid` component that defines the graph options (better explained in the section "Information required for each type of graph").

The "?" in description is for optional fields.

The caracteristics expected for each field based on the graphic type are described in *"Required informations for each graph type"* section in this file.

<br />

**`ExportGraph`**

~~~json
{
  "type": "png" OR "jpeg,
}
~~~
This is the JSON format that is sent by the `export_button` component and received by the `GraphOid` component, to export the graph as a image, of type `type`.
<br />
<br />

# Components

## Component GraphOid

Visual component of the chart to be displayed.
Each chart type will be a method within this component.
The types of graphs we will make are: bar, column, line, area, pie, donut, bubble, radar and scatter.

### Properties

| property     | role     | data type | receive by    |
| ------------ | -------- | --------- | ------------- |
| `uid` | Unique Graph ID | *TBD* | HTML
| `type` | Chart type  | String | HTML
| `options` | Object with chart options | `Options` | Bus
| `data`    | Object with the data that will be displayed by the chart | `Data`  | Bus

The properties `title` and `fields` are embedded in the options message received by the bus.
<br />

### Input Notices

| notice   | action                                                  | message type | subscribed topic |
| -------- | ------------------------------------------------------- | ------------ | ---------------- |
| `data` | Receives the data and draws the graph in the designated space | `Data` | `data/{id}`
| `options` | Receives the options of the graph | `Options` | `graph/options/{id}`
| `export` | Receives the export type and exports the chart to a file | `ExportGraph` | `graph/export/{id}`

<br />

## Component ExportButtonOid

Component that exports the graph to a file.

### Output Notices

| notice   | source                                                  | message type | published topic |
| -------- | ------------------------------------------------------- | ------------ | --------------- |
| `export` | When clicked sends the export type and exports the chart to a file | `ExportGraph` | `graph/export/{id}`

<br />

# Required informations for each graph type

## Obrigatory for all types: 
- `Data`: 
	- `labels`: x axis labels
	- `datasets`:  list of datasets
		- `label` (title of dataset)
		- `data`
- `Options`: 
	- `title` 
	- `scales`: 
		- axes titles 

## Optional for all types:
- `Options`:
	- `scales`: 
		- min/max
		- log scale 

<br />

Graph type | Data
--- | ---
`Line` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> `datasets`: unset `fill` | 
`Area` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> `datasets`: set `fill` | 
`Scatter` | 2 axes: <br /> <ul> - `x` (numeric) </ul> <ul> - `y` (numeric) </ul> |
`Bubble` | 3 axes: `x`, `y`, `z`*, all numeric | 
`Bar` | 2 axes: <br /> <ul> - `x` (numeric) </ul> <ul> - `y` (numerical or categorical) </ul> | 
`Column` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> |
`Pie` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> | 
`Doughnut` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> | 
`Polar Area` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> | 
`Radar Area` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> | 
`Scatter: Linear Regression` | 3 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y1` (numeric) </ul> <ul> - `y2` (numeric) </ul> | 


*Bubble radius in pixels (not scaled). <br /><br />

# Components Narratives: how to use our components

## Setup

`graph-oid`: Component that renders the graph on the user's screen.

`export-button-oid`: Component that exports the graph to a file.

~~~html
<graph-oid 	uid="5",
			type="bar-chart",
        	subscribe="data/<data-id>:data, graph/options/<graph-id>:options, graph/export/<graph-id>~export">
</graph-oid>

<export-button-oid publish="export~graph/export/<graph-id>"></export-button-oid>
~~~

The `$-id` are the identifiers of the nodes. The `id` is a value assigned to every node by the workflow.

The `<graph-id>` identifies the graph node id, and the `<data-id>` identifies the data node id.

## Narrative 

### 1. Show a graph 
* Presentation decides to display the new graph in its interface.
* Instantiate a `graph-oid` component containing the component's id (`uid`) and `type` information.
* Send by bus (topic: `graph/options/{graph-id}`) the data of `options` and `fields`.
* The `graph-oid` component displays the message "Waiting for data."
* Some component posts a `data` message to the `data/{data-id}` topic, and consequently the `graph-oid` component receives the `render` notice.
* The `graph-oid` component displays the graph.

### 2. The user wants to export the chart as an image:
* The `export-button-oid` component is a button that produces the `export` notice.
	* A message in the topic `graph/export/{graph-id}` and with the image type is published.
* The `graph-oid` component that has this `graph-id`, then receives this message and exports the graph in question with the extension given by the image type, saving it in the folder the user wants.

<br />

# Mocks
To be able to test our components, we needed data to make the graphs, as well as simulate sending data and options over the bus. So we created data tables and some supporting components for that.

## Mocked data
We mock two types of data: data tables and options maps.

### 1. Mocked data tables
We create 3 data tables, saved in the [data_mock.js](./mocks/data_mock.js) file:
- mockedData: ideal for testing all types of charts, especially those that accept having axes with categorical values.
- scatter_mockData: ideal for testing scatter plots
- cluster_mockData: ideal for testing cluster plot.

### 2. Mocked options
We created an example of an options map of the chart present in the [options_mock.js](./mocks/options_mock.js) file.

<br />

## Mocked components

### Component DataSenderOid

* Component (button) that simulates sending data to the GraphOid component. 

#### Properties

| property     | role     | data type | send by |
| ------------ | -------- | --------- | ------- |
| `data`  | Object with the data that will be displayed by the chart | `Data`  | Bus

#### Output Notices

| notice   | source                                                  | message type | published topic |
| -------- | ------------------------------------------------------- | ------------ | --------------- |
| `click` |  When the button is clicked, it sends the data message over the bus | `Data` | `data/{id}`

<br />

### Component OptionsSenderOid

* Component (button) that simulates sending the options to the GraphOid component. 

#### Properties

| property     | role     | data type | send by |
| ------------ | -------- | --------- | ------- |
| `options`  | Object with the options that will be applied to the chart | `Options`  | Bus

<br />

#### Output Notices

| notice   | source                                                  | message type | published topic |
| -------- | ------------------------------------------------------- | ------------ | --------------- |
| `click` |  When the button is clicked, it sends the options message over the bus | `Options` | `graph/options/{id}`

<br />

## How to use our MOCKED components with normal components

### Setup
`options-sender-oid`: Mocked component (button) that simulates sending the options to the GraphOid component.

`data-sender-oid`: Mocked component (button) that simulates sending data to the GraphOid component. 

~~~html
<options-sender-oid publish="click~graph/options/<graph-id>"></options-sender-oid>

<data-sender-oid publish="click~data/<data-id>"></data-sender-oid>

<graph-oid 	uid="5",
			type="bar-chart",
        	subscribe="data/<data-id>:data, graph/options/<graph-id>:options, graph/export/<graph-id>~export">
</graph-oid>

<export-button-oid publish="export~graph/export/<graph-id>"></export-button-oid>
~~~

The `$-id` are the identifiers of the nodes. The `id` is a value assigned to every node by the workflow.

The `<graph-id>` identifies the graph node id, and the `<data-id>` identifies the data node id.

### Narrative: *show a graph* 
* Exemplified in [this file](./test/graph_test.html).
* Instantiate a `options-sender-oid` component, which sends on click the options by bus (topic: `graph/options/{graph-id}`).
* Instantiate a `data-sender-oid` component, which sends on click the data by bus (topic: `data/{data-id}`).
* Instantiate a `graph-oid` component containing the component's id (`uid`) and `type` information.
* The `graph-oid` component displays the message "Waiting for data."
* Clicking on `options-sender-oid` button, it will be sended by bus (topic: `graph/options/{graph-id}`) the data of `options` and `fields`.
* Clicking on `data-sender-oid` button, it will be sended by bus (topic: `data/{data-id}`) the `data` message. 
* Consequently the `graph-oid` component receives the `render` notice.
* The `graph-oid` component displays the graph.

<br />

# Implementation exemples
## Graph_test: 
This page can simulate **unit tests** for all types of charts that can be made by our module, using chart type choices, fields and mock data tables.

In this exemple, the [graph_test.html file](./test/graph_test.html) is run.
1. Run `npm run dev` on terminal.
2. Open [this web page](http://localhost:5173/modules/visualize/test/graph_test.html).
3. The `graph-oid` component displays the message "Waiting for data."
4. Select the type of graph in "type" dropdown.
5. Select the fields (which columns of the data table is for each axes) of the graph in "fields" field.
6. Click on "Send Options" to send by bus (topic: `graph/options/{graph-id}`) the data of `options` and `fields`.
	* For this exemple the `graph-id` is equal to 5.
7. Select the data table mock that you want to plot in "Mock" dropdown.
	* The available tables are described on !!!!!
8. Click on "Render graph" to send by bus (topic: `data/{data-id}`) the `data` message.
	* For this exemple the `data-id` is equal to 1.
9. Consequently the `graph-oid` component receives the `render` notice.
10. The `graph-oid` component displays the graph.

<br />

## Integration Tests:

* ### integration_data:
	In this exemple, the [integration_data.html file](./test/integration_data.html) is run.

	The objective is to show that the file upload from filereader-oid component, passing to fileinput-oid and type-input components, can generate correctly any type of graph.

	1. Run `npm run dev` on terminal.
	3. Click on "Send Options".
	4. Upload a csv file on component.
		* A [exemple of csv](./mocks/mockedData_in_csv.csv) is available in mocks folder.
	5. A table will be shown with the data of the file.
	6. The `graph-oid` component displays the graph.	
	
<br />

* ### integration_model:
	In this exemple, the [integration_model.html file](./test/integration_model.html) is run.

	The objective is to show the clustering of the input data in a cluster graph.

	1. Run `npm run dev` on terminal.
	2. Change the "type" selection box to "Cluster" in "Graph" section.
	3. Click on "Send Options".
	4. Click on "Apply Cluster with 2 clusters" at the top of the page.
	5. A table will be shown with the data returned by the clustering component, with a new column called "category".
	5. The `graph-oid` component displays the graph.

<br />

* ### integration_transform:
	In this exemple, the [integration_transform.html file](./test/integration_transform.html) is run.

	The objective is to show that the operation of subtracting 50 from all values of column "Quantidade em Estoque" is working correctly, creating a new column called "Sobra de estoque".

	1. Run `npm run dev` on terminal.
	2. Click on "Send Options".
	3. Click on "Render Graph".
	4. Two tables with the data before and after the transformation will be shown.
	5. The `graph-oid` component displays the graph with the originals datas and the changed ones.	