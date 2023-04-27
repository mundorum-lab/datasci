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
  size: number,
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

| property | role                                                      | 
| ------ | :---------------------------------------------------------- |
| `graph_id` | Identificador do gráfico |
| `graph_type` | Identificador do tipo de gráfico |
| `data` | Objeto com os dados a serem plotados |

### Input Notices

| notice | action                                                      | message type |
| ------ | :---------------------------------------------------------- | ------------ |
| `create` | O usuário abre o criador de gráficos para criar um novo gráfico (selecionar tipo e eixos) | `CreateGraph` |
| `update` | O usuário abre o criador de gráficos para atualizar configurações do gráfico em questão | `GraphData` |

### Output Notices

| notice       | source                                                       | message type |
| ------------ | ------------------------------------------------------------ | ------------ |
| `send-graph` | O usuário fechará o criador de gráficos ou salvará as mudanças feitas as configurações do gráfico | `GraphData` |
| `send-graph-node` | O componente retorna ao workflow o gráfico criado | `GraphData` | 

## Component Graph

Componente visual do gráfico a ser apresentado.
Cada gráfico herdará de uma classe mãe Graph().

### Properties

| property | role                                                      | 
| ------ | :---------------------------------------------------------- |
| `graph-data` | Objeto com os dados do gráfico (id, tipo, dados, tamanho) |

### Input Notices

| notice | action                                                      | message type |
| ------ | :---------------------------------------------------------- | ------------ |
| `render` | Recebe dados do gráfico e o renderiza | `RenderGraph` |

### Output Notices

| notice       | source                                                       | message type |
| ------------ | ------------------------------------------------------------ | ------------ |
| `export` | Possibilidade de salvar gráfico | `ExportGraph` |

# Components Narratives

## Setup

~~~html
<create-graph graph_id = 73
              data = {}
              graph_type = "pie-chart"
              subscribe = "create/graph:create"
              subscribe = "update/graph:update"
              publish = "send-graph:update/rendered-graph"
              publish = "send-graph-node:add/node/graph">
</create-graph>

<graph  graph-data = {}
        subscribe = "render/graph:render"
        publish = "export:export/graph">
</graph>
~~~

## Narrative

> Describe here the narrative as a sequence of steps. The format is free, but you can follow the approach suggested in the example below.
