# Module `Visualize`

# Description
O modulo tem como objetivo permitir que os dados, armazenados em tabelas, sejam exibidos de forma gráfica para o usuário.

# Team
* Iago Caran Aquino - RA: 198921
* André Silva Telles - RA 165263
* Juliana Bronqueti da Silva - RA 238389
* Marcos Cunha Rosa - RA 240815

# Message Types

**`CreateGraph`**

~~~json
{
  graph_id: number,
  data: object,
}
~~~

**`GraphData`**

~~~json
{
  graph_id: number,
  data: object,
  graph_type: string,
}
~~~

**`RenderGraph`**

~~~json
{
  graph_id: number,
  data: object,
  graph_type: string,
  size: {
    width: number,
    height: number,
  },
}
~~~

**`ExportGraph`**

~~~json
{
  image: Base64,
}
~~~

# Components

## Component GraphCreator

### Properties

| property     | role                                 |
| ------------ | :----------------------------------- |
| `graph_id`   | Identificador do gráfico             |
| `graph_type` | Identificador do tipo de gráfico     |
| `data`       | Objeto com os dados a serem plotados |

### Input Notices

| notice   | action                                                                                    | message type  |
| -------- | :---------------------------------------------------------------------------------------- | ------------- |
| `create` | O usuário abre o criador de gráficos para criar um novo gráfico (selecionar tipo e eixos) | `CreateGraph` |
| `update` | O usuário abre o criador de gráficos para atualizar configurações do gráfico em questão   | `GraphData`   |

### Output Notices

| notice            | source                                            | message type |
| ----------------- | ------------------------------------------------- | ------------ |
| `send-graph-node` | O componente retorna ao workflow o gráfico criado | `GraphData`  |

## Component Graph

Componente visual do gráfico a ser apresentado.
Cada gráfico herdará de uma classe mãe Graph().

### Properties

| property     | role                                                      |
| ------------ | :-------------------------------------------------------- |
| `graph-data` | Objeto com os dados do gráfico (id, tipo, dados, tamanho) |

### Input Notices

| notice   | action                                | message type  |
| -------- | :------------------------------------ | ------------- |
| `render` | Recebe dados do gráfico e o renderiza | `RenderGraph` |

### Output Notices

| notice   | source                          | message type  |
| -------- | ------------------------------- | ------------- |
| `export` | Possibilidade de salvar gráfico | `ExportGraph` |

# Components Narratives

## Setup

~~~html
<create-graph graph_id = 73
              data = {}
              graph_type = "pie-chart"
              subscribe = "create/graph:create"
              subscribe = "update/graph:update"
              publish = "send-graph-node:update/node/graph"
              publish = "send-graph-node:add/node/graph">
</create-graph>

<graph  graph-data = {}
        subscribe = "render/graph/<id>:render"
        publish = "export:export/graph">
</graph>
~~~

## Narrative

* Dois componentes: o `create-graph` (GraphCreator) e o `graph` (Graph).
	* `GraphCreator`: Uma tela/pop-up que se abre toda vez que o usuário deseja criar um novo gráfico ou atualizar um gráfico que já existe. Nela o usuário é capaz de escolher o tipo do gráfico (Pizza, em barras, etc).
		* Se inscreve nos tópicos "`create/graph`" e `update/graph`.
	* `Graph`: Componente que renderiza o gráfico na tela do usuário.
		* Se inscreve no tópico "`render/graph`"

* O usuário inicia a criação de um **novo gráfico** (pelo workflow):
	* Uma mensagem com o tópico `create/graph` é publicada.
	* Uma tela é mostrada e o usuário coloca o tipo de gráfico que deseja.
	* Ao confirmar suas escolhas, o component `create-graph` produz o notice `send-graph-node` e publica uma mensagem com tópico `add/node/graph` e valor tipo `GraphData`.

* O workflow recebe a mensagem com o tópico "`add/node/graph`" e:
	* Adiciona os dados do novo gráfico na sua lista de nós.

* O workflow decide exibir o novo gráfico em um tamanho `width` x `height` em sua interface:
	* Cria um componente `<graph></graph>` com os dados do tipo da mensagem `RenderGraph`, contendo informações de `graph_id`, `data`, `graph_type` e `size`.

* O usuário deseja alterar o tipo deste gráfico (que já existe):
	* Uma mensagem com tópico `update/graph` é publicada.
	* A mesma tela de criação é mostrada com informações já preenchidas
	*  O usuário troca o tipo de gráfico e confirma sua alteração.
	* Como o nó já existe, o componente `create-graph` produz o notice `send-graph-node` e publica uma mensagem com o tópico `update/node/graph`

* O workflow recebe a mensagem com o tópico "`update/node/graph`":
	* Produz a notice "`render`"
	* Uma mensagem com o tópico `render/graph/<id>` e com o valor de `graph_id`, `data`, `graph_type` e `size` é publicada.

* O gráfico recebe a mensagem com o tópico `render/graph`e:
	* Mapeia isso com o notice `render`
	* Renderiza o novo gráfico de acordo com o tipo mudado.

* O workflow faz alterações do tamanho ou dados do gráfico:
	 * Produz a notice "`render`"
	* Uma mensagem com o tópico `render/graph/<id>` e com o valor de `graph_id`, `data`, `graph_type` e `size` é publicada.

* O gráfico recebe a mensagem com o tópico `render/graph`e:
	* Mapeia isso com o notice `render`
	* Renderiza o novo gráfico de acordo com as novas alterações.

* O usuário deseja exportar a imagem do gráfico:
	* Produz a notice "`export`"
	* Uma mensagem com o tópico `export/graph` e com o valor da imagem é publicado.
