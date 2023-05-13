# Module `Visualize`

# Description
O módulo tem como objetivo permitir que os dados, armazenados em tabelas, sejam exibidos de forma gráfica para o usuário.

# Team
* Iago Caran Aquino - RA: 198921
* André Silva Telles - RA 165263
* Juliana Bronqueti da Silva - RA 238389
* Marcos Cunha Rosa - RA 240815

# Message Types

**`AvailableNodes`**

~~~json
{
  category1: [{
    type<string>,
    name<string>,
    compatibleInputNodes: {
      entrada0: {typeIds<[string]>, listRange<(int, int)>},
      entrada1: {typeIds<[string]>, listRange<(int, int)>},
      ...
      },
    inputFields: [{
      fieldName<string>,
      fieldType<string>, 
      inputType: {
        type<string>,
        parameters<Object>,
      }
    }]
  }],
  category2: [{
    type<string>,
    name<string>,
    compatibleInputNodes: {
      entrada0: {typeIds<[string]>, listRange<(int, int)>},
      entrada1: {typeIds<[string]>, listRange<(int, int)>},
      ...
      },
    inputFields: [{
      fieldName<string>,
      fieldType<string>, 
      inputType: {
        type<string>,
        parameters<Object>,
      }
    }]
  }],
  ...
}
~~~

**`ExportGraph`**

~~~json
{
  image: Base64,
}
~~~

# Components

## Component GraphNodesRepository

### Output Notices

| notice            | source                                            | message type |
| ----------------- | ------------------------------------------------- | ------------ |
| `nodes` | O componente retorna ao workflow os tipos de nós e suas configurações | `availableNodes`  |


## Component Graph

Componente visual do gráfico a ser apresentado.
Cada tipo de gráfico será um método dentro deste componente.
Os tipos de gráficos que faremos são: de barras, de colunas, de linha, de área, de "pizza", de "donut", de "bolha", de radar e de dispersão.

### Properties

| property     | role                                                      |
| ------------ | :-------------------------------------------------------- |
| `type` | String com o tipo do gráfico |
| `id` | Int com o id do gráfico |
| `size` | Mapa com os tamanhos do gráfico (width e height) |
| `options` | Objeto com os opções adicionais do gráfico (eixos, etc) |


### Output Notices

| notice   | source                          | message type  |
| -------- | ------------------------------- | ------------- |
| `export` | Possibilidade de salvar gráfico | `ExportGraph` |


# Components Narratives

## Setup

~~~ javascript
export class GraphNodeCreate extends OidUI {
	_onClick() {
		this._notify('nodes', {value: this.availableNodes})
	}
}

Oid.component({
	element: GraphNodesRepository,
	properties: {
		availableNodes: {
			category1: [{
				"bar-chart",
				"Gráfico de barras",
				compatibleInputNodes: {
					entrada0: {typeIds<[string]>, listRange<(int, int)>},
					entrada1: {typeIds<[string]>, listRange<(int, int)>},
					...
				},
				inputFields: [{
					fieldName<string>,
					fieldType<string>, 
					inputType: {
						type<string>,
						parameters<Object>,
					}
				}]
			}],
			...
		}
	}
	implementation: GraphNodeCreate
})
~~~

~~~html
<graph  id = 1203,
		type = "bar-chart",
		data = {
				columns: [{idade, int}],
				data: [[29],[23]]
			},
		size = {width: 100, height: 200},
		options = {},
		publish = "export:export/graph">
</graph>
~~~

## Narrative

* Dois componentes: o `GraphNodesRepository` e o `graph` (Graph).
	* `GraphNodesRepository`: Componente que possui os dados referentes aos tipos de nós dos gráficos que podem ser apresentados ao usuário no workflow, assim como quais os outros nós que podem ser conectados a este.
	* `Graph`: Componente que renderiza o gráfico na tela do usuário.


* No momento em que o componente `GraphNodesRepository` é instanciado, publica no barramento uma mensagem do tipo `availableNodes`, a qual será recebida pelo time de workflow.
	* A partir desta mensagem, o workflow será capaz de mostrar para o usuário as possibilidades de gráficos, assim como a lógica para verificação de conectividade entre tipos de nós (dado que os gráficos só poderão ser ligados a tabelas).


* Presentation decide exibir o novo gráfico em um tamanho `width` x `height` em sua interface:
	* Instancia um componente `<graph></graph>` contendo informações de `id`, `type`, `size` e `options`.
	* Iremos esperar os dados no tópico `data/#id`, sendo que estes vão ser postados da forma `Objeto data` a seguir e o id é o `id` do nó de dados.

#### Objeto data
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

* O usuário deseja exportar a imagem do gráfico:
	* Produz a notice "`export`"
	* Uma mensagem com o tópico `export/graph` e com o valor da imagem é publicado.