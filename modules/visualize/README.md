# Module `Visualize`

# Description
The objective of the module is to allow the data, storaged in tables, to be shown in a graphically way to user. 

# Team
* Iago Caran Aquino - RA: 198921
* André Silva Telles - RA 165263
* Juliana Bronqueti da Silva - RA 238389
* Marcos Cunha Rosa - RA 240815

<br />

**<ATUALIZADO EM 20/06>**

# Components Narratives: Como utilizar nossos componentes

## Setup

~~~html
<graph-oid 	uid="5",
			type="bar-chart",
        	subscribe="data/<data-id>:data, graph/options/<graph-id>:options, graph/export/<graph-id>~export">
</graph-oid>

<export-button-oid publish="export~graph/export/<graph-id>"></export-button-oid>
~~~

Os `id` são os identificadores dos nós. O `id` é um valor atribuido a todo nó pelo workflow.

## Narrative

* `Graph-oid`: Componente que renderiza o gráfico na tela do usuário.

* Presentation decide exibir o novo gráfico em sua interface:
	* Instancia um componente `graph-oid` contendo o id do componente (`uid`) informações de `type` (tipo do gráfico)
	* Envia por barramento (tópico: `graph/options/id`) os dados de `options` e `fields`.
		* Este `id` é o identificador do gráfico em si.
	* O componente `graph-oid` exibe a mensage "Waiting for data." 
	* Algum componente posta uma mensagem de tipo `data` no tópico `data/{id}` e,consequentemente, o componente `graph-oid` recebe o notice `render`.
		* Este `id` será o identificador de quem gera o dado para o gráfico.
	* O componente `graph-oid` apresenta o gráfico

* O usuário deseja exportar a imagem do gráfico:
	* O componente `export-button-oid` é um botão que produz a notice `export`. 
		* Uma mensagem no tópico `graph/export/{id}` e com o tipo da imagem é publicado.
	* O componente `graph-oid` que tem esse `id`, então recebe essa mensagem e exporta o gráfico em questão com a extensão dada pelo tipo da imagem, salvando-o na pasta que o usuário desejar.

<br />

**</ ATUALIZADO EM 20/06>**

<br />
<br />

# Folder and Files Structure

```
├── availableNodes.json         -> module descriptions that can be placed in workflow
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
|     ├── options_sender_oid.js  -> button that simulates sending options to the graph component
│
|
├── test                         -> files for unit and integration testing between components
│     │
|     ├── graphs_tests.html      -> graphics unit tests page
│     │
|     ├── integration_tests.html -> graphics integration tests page
│
|
├── graph_oid.js                 -> component that creates the chart
|
|
└── README.md                    -> module specification
```

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

~~~js
{
	fields: [{
		x: <int>,
		y: <int>,
		title: <String>,
		z?: <int>,
	},
	? {
		x: <int>,
		y: <int>,
		title: <String>,
		z?: <int>
	}],
	title: <String>,
	scales: {
		x-title: <String>,
		y-title: <String>,
		type: <String(linear/category)>
		?min: <int>,
		?max: <int>,
		?log-scale: <boolean>
	}
}
~~~
This is the JSON format that is received by the `GraphOid` component that defines the graph options (better explained in the section "Information required for each type of graph").
The "?" in description is for optional fields.

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

## Component Graph-oid

Visual component of the chart to be displayed.
Each chart type will be a method within this component.
The types of graphs we will make are: bar, column, line, area, pie, donut, bubble, radar and scatter.

### Properties

| property     | role     | data type | receive by    |
| ------------ | :--------|-----------|-------------- |
| `uid` | Unique Graph ID | *TBD* | HTML
| `type` | Chart type  | String | HTML
| `options` | Object with chart options | `Options` | Bus
| `data`    | Object with the data that will be displayed by the chart | `Data`  | Bus

The properties `title` and `fields` are embedded in the options message received by the bus.
<br />

### Input Notices

| notice   | source                                                  | message type |
| -------- | ------------------------------------------------------- | ------------ |
| `data` | Receives the data and draws the graph in the designated space | `Data` |
| `options` | Receives the options of the graph | `Options` |
| `export` | Receives the export type and exports the chart to a file | `ExportGraph` |

<br />

## Component Export-oid

Component that exports the graph to a file.

### Output Notices

| notice   | source                                                  | message type |
| -------- | ------------------------------------------------------- | ------------ |
| `export` | Sends the export type and exports the chart to a file | `ExportGraph` |

<br />

# Mocked components

## Component DataSenderOid

Component (button) that simulates sending data to the GraphOid component. 

### Properties

| property     | role     | data type | send by    |
| ------------ | :--------|-----------|-------------- |
| `data`    | Object with the data that will be displayed by the chart | `Data`  | Bus

<br />

### Output Notices

| notice   | source                                                  | message type |
| -------- | ------------------------------------------------------- | ------------ |
| `data` | Receives the data and draws the graph in the designated space | `Data` |
| `options` | Receives the options of the graph | `Options` |
| `export` | Receives the export type and exports the chart to a file | `ExportGraph` |

<br />

## Component OptionsSenderOid

Visual component of the chart to be displayed.
Each chart type will be a method within this component.
The types of graphs we will make are: bar, column, line, area, pie, donut, bubble, radar and scatter.

### Properties

| property     | role     | data type | receive by    |
| ------------ | :--------|-----------|-------------- |
| `uid` | Unique Graph ID | *TBD* | HTML
| `type` | Chart type  | String | HTML
| `options` | Object with chart options | `Options` | Bus
| `data`    | Object with the data that will be displayed by the chart | `Data`  | Bus

The properties `title` and `fields` are embedded in the options message received by the bus.
<br />

### Input Notices

| notice   | source                                                  | message type |
| -------- | ------------------------------------------------------- | ------------ |
| `data` | Receives the data and draws the graph in the designated space | `Data` |
| `options` | Receives the options of the graph | `Options` |
| `export` | Receives the export type and exports the chart to a file | `ExportGraph` |

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

Graph type | Data | Options
--- | --- | ---
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

# Comments

- With the change of receiving options and parameter fields in html to messages on the bus, we need to change the functions that configure the graphics. This is not finalized for now, and the only chart type that is working correctly is the line chart.
- In order to simulate this behavior (sending data over the bus), the OptionsSender component was created, which is a button that sends mocked options and fields.