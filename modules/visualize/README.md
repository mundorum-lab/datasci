# Module `Visualize`

# Description
O módulo tem como objetivo permitir que os dados, armazenados em tabelas, sejam exibidos de forma gráfica para o usuário.

# Team
* Iago Caran Aquino - RA: 198921
* André Silva Telles - RA 165263
* Juliana Bronqueti da Silva - RA 238389
* Marcos Cunha Rosa - RA 240815

# Folder and Files Structure

```
├── availableNodes.json <- descrição dos modulos que podem ser inseridos no workflow 
│
├── graph.js            <- template do componente
│
├── libs                <- bibliotecas utilizadas
│
├── prototype           <- arquivos utilizados para teste/desenvolvimento do modulo
|
└── README.md           <- especificação do modulo
```

# Message Types

**`Data`**

~~~json
{
  columns: [
	{name, type},
	...
  ],
  data: [
	[column0, column1, ...],
	... other rows ...
  ]
}
~~~

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

**`ExportGraph`**

~~~json
{
  image: Base64,
}
~~~

# Components


## Component Graph-oid

Componente visual do gráfico a ser apresentado.
Cada tipo de gráfico será um método dentro deste componente.
Os tipos de gráficos que faremos são: de barras, de colunas, de linha, de área, de "pizza", de "donut", de "bolha", de radar e de dispersão.

### Properties

| property     | role                                                      |
| ------------ | :-------------------------------------------------------- |
| `type` | String com o tipo do gráfico |
| `size`    | Mapa com os tamanhos do gráfico (width e height)        |
| `options` | Objeto com os opções adicionais do gráfico (eixos, etc) |
| `data`    | Objeto com os dados que serão exibidos pelo gráfico     |
| `fields`  | Objeto que mapeia o indice das colunas da tabela para os eixos do grafico     |

### Input Notices

| notice   | source                                                  | message type |
| -------- | ------------------------------------------------------- | ------------ |
| `render` | Recebe os dados e desenha o grafico no espaço designado | `Data`       |

### Output Notices

| notice   | source                          | message type  |
| -------- | ------------------------------- | ------------- |
| `export` | Possibilidade de salvar gráfico | `ExportGraph` |


# Components Narratives

## Setup

~~~html
<graph-oid 	type = "bar-chart",
        	subscribe = "data/<id>:render, graph/options:options",
			publish = "export:export/graph">
</graph-oid>

<export-button-oid publish="export~graph/export"></export-button-oid>
~~~

O `id` referenciado no subscribe é o id do nó (valor atribuido a todo nó no workflow) que irá providenciar os dados que o gráfico utilizará.

## Narrative

* `Graph-oid`: Componente que renderiza o gráfico na tela do usuário.


* Presentation decide exibir o novo gráfico em um tamanho `width` x `height` em sua interface:
	* Instancia um componente `graph-oid` contendo informações de `type`, `size`, `options` e `fields`.
	* O compenente `graph-oid` exibe a mensage "Waiting for data." 
	* Algum componente posta uma mensagem de tipo `data`  no tópico `data/#id` e,consequentemente, o componente `graph-oid` recebe o notice `render`
	* O compenente `graph-oid` apresenta o gráfico

* O usuário deseja exportar a imagem do gráfico:
	* Produz a notice "`export`"
	* Uma mensagem com o tópico `export/graph` e com o valor da imagem é publicado.


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
		- type (`linear` or `category` or `time`)

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
`Bubble` | 3 axes: `x`, `y`, `r`*, all numeric | 
`Bar` | 2 axes: <br /> <ul> - `x` (numeric) </ul> <ul> - `y` (numerical or categorical) </ul> | 
`Column` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> |
`Pie` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> | 
`Doughnut` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> | 
`Polar Area` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> | 
`Radar Area` | 2 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y` (numeric) </ul> | 
`Scatter: Linear Regression` | 3 axes: <br /> <ul> - `x` (numerical or categorical) </ul> <ul> - `y1` (numeric) </ul> <ul> - `y2` (numeric) </ul> | 


*Bubble radius in pixels (not scaled).