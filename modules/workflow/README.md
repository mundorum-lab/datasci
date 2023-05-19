# Module `Workflow`

# Description
Esse módulo tem como função prover as funcionalidades para interação dos usuários no que diz respeito a autoria. Assim, iremos implementar tanto a parte lógica de conexão dos componentes, quanto a visualização do estado atual da aplicação.

# Team
* César Devens Grazioti
  * <brief description of the activities developed by this member>
* João Augusto Rosa Feltran
  * <brief description of the activities developed by this member>
* João Miguel de Oliveira Guimarães
  * <brief description of the activities developed by this member>
* Lucas Eduardo Ramos de Oliveira
  * <brief description of the activities developed by this member>
* Renan Luis Moraes de Sousa
  * <brief description of the activities developed by this member>

# Message Types

**`WorkflowState`**
~~~json
{
  "nodes": [{
    "nodeId": int,
    "nodeType": string,
    "attributes": {...}
  }],

  "edges": [[int, int],[int, int], ...]
}
~~~

**`LayoutSelection`**
~~~json
{
  "layouts": [
    ...
  ]
}
~~~

**`AvailableNodes`**
~~~json
{
  nome_da_categoria1: [{
    "type": string,
    "name": string,
    "iconPath": string,
    "compatibleInputNodes": [
    {"typeId": [string], "range": [int, int]},
    {"typeId": [string], "range": [int, int]},
      ...
      ],
    "inputFields": [{
      "fieldName": string,
      "inputTypeIdentifier": string, 
      "inputTypeParameters": []
    }]
  }],

  nome_da_categoria2: [{
    "type": string,
    "name": string,
    "iconPath": string,
    "compatibleInputNodes": [
    {"typeId": [string], "range": [int, int]},
    {"typeId": [string], "range": [int, int]},
      ...
      ],
    "inputFields": [{
      "fieldName": string,
      "inputTypeIdentifier": string, 
      "inputTypeParameters": [number or string]
    }]
  }],
  ...
}
~~~

Exemplo: Componente do grupo `transform` que filtra as linhas de uma tabela com base nos valor de uma coluna especificada. O valor de comparação e o tipo de comparação também serão especificados.
~~~json
{
  filter: [{        
    "type": "table/json",
    "name": "Filtrar Tabela",
    "compatibleInputNodes": {
      {"typeId": ["TABELA"], "range": [1, 1]}
    },
    "inputFields": [
      {
          "fieldName": "Operação",
          "inputTypeIdentifier": "Dropdown",
          "inputTypeParameters": [">=",">","<","<=","="],
      },
      {
          "fieldName": "Nome da Coluna filtrada",
          "inputTypeIdentifier": "Textbox", 
          "inputTypeParameters": []
      },
      {
          "fieldName": "Valor a ser comparado",
          "inputTypeIdentifier": "Textbox", 
          "inputTypeParameters": []
      }
    ]
  }],
}
~~~

**`SingleNode`**
~~~json
{
  "type": string,
  "name": string,
  "iconPath": string,
  "compatibleInputNodes": [
  {"typeId": [string], "range": [int, int]},
  {"typeId": [string], "range": [int, int]},
    ...
    ],
  "inputFields": [{
    "fieldName": string,
    "inputTypeIdentifier": string, 
    "inputTypeAttributes": [number or string]
  }]
}
~~~


> Types inspired in [TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html): `boolean`, `number`, and `string`. Specify arrays with the element type under brackets, e.g., `[number]`.

> One can use a second message type inside a given message type (illustrated as `<message type>`).

> Use camel case to identify message types, starting with uppercase (same practice for class names in JavaScript).

# Components

## Component `WorldSpaceView`

Este componente é responsável por conter todos os nodes e administrar o workflow.

### Properties

property | role
---------| --------
`id` | `Identifica o workflow`
`name` | `Nome da instância do workflow`
`nodes` | `Todos os nodes presentes dentro do workflow`
`edges` | `Todas as ligações entre nodes presentes dentro do workflow`
`initialPosition` | `Vetor de posição inicial da visualização da página`
`initialZoom` | `Posição do zoom inicial da visualização da página`

### Input Notices

notice | action | message type
-------| ------ | ------------
`addNode` | `Renderiza o nó dentro do espaço de pipeline` | `tipo do SingleNode`
`removeNode` | `Remove o nó dentro do espaço de pipeline` | `id do node`

### Output Notices

notice    | source | message type
----------| -------| ------------
`exportWorkflow` | `Emitido quando o usuário aperta no botão "executar"` | `tipo do WorkflowState`

---

## Component `WorldSpaceBehaviour`

Este componente é herdado por outros, atribuindo funcionalidades básicas a elementos na tela, como: mobilidade no espaço, identificação etc.

### Properties

property | role
---------| --------
`IndividualId` | `Identifica o Behaviour dentro do Pipeline`
`Position` | `Vetor de posição dentro do WorldSpace`
`OnWorldSpaceBehaviours` | `Uma lista estática que armazena todos os Behaviours no WorldSpace`
`AllTimeCreateBehaviours` | `Armazena todos os WorldSpaces que já foram criados - Utilizado para gerar um Id único`


## Component `WorldSpaceNode` extends WorldSpaceBehaviour

Este componente representa os nodes. Além dos comportamentos herdados, ele possui funcionalidades mais específicas, incluindo: conexão com outros nodes, especificação de cada node etc.

### Properties

property | role
---------| --------
`type` | `Funciona como um identificador do WorldSpaceNode`
`name` | `Nome do nó`
`icon` | `Caminho para svg utilizado como ícone do nó`
`compatibleInputNodes` | `Um dicionário que representa as entradas dos nós. Para cada chave existente, ele devolve um objeto que armazena os tipo de entrada compatível, além do range de nós que podem se conectar à entrada (Obs: O range é inclusivo)`
`InputFields` | `Armazena uma lista dos tipos de entrada que o usuário vai fornecer ao nó, permitindo modularização e geração dinâmica. Cada entrada recebe um nome do campo e um tipo que o campo vai receber (int, string, etc), além disso, recebe um inputType do atributo, que armazena o tipo da entrada (textbox, range, radiobutton) e os parâmetros referentes à esta entrada(tamanho,filtro, etc)`
`userInputs` | `Armazena parâmetros editados pelo usuário`



## Component `AvailableNodes`

Este componente representa o conjunto de nodes que podem ser arrastados para o workflow.

### Input Notices

notice | action | message type
-------| ------ | ------------
`availableNodes` | `Recebe a lista de todos os nós disponíveis, com as categorias` | `Tipo availableNodes`


### Output Notices

notice    | source | message type
----------| -------| ------------
`addNode` | `Adiciona um novo nó a lista` | `Tipo singleNode`

# Components Narratives

## Sessão do workflow

Essa sessão descreve o pipeline do nosso workflow, desde a recepção dos nós do outro grupo até a exportação do workflow feito pelo usuário.

## Setup
~~~html
<other-group publish="nodes:availableNodes">
</other-group>

<available-nodes subscribe="availableNodes:nodes" publish="node:addNode">
</available-nodes>

<world-space-view subscribe="addNode:addNode" publish="exportWorkflow:exportWorkflow">
</world-space-view>

<another-group subscribe="exportWorkflow:exportWorkflow">
</another-group>
~~~

## Narrative

* Os outros grupos publicam as informações de seus nós no barramento por meio da mensagem `availableNodes`, mapeada do parâmetro `nodes`
* O componente `<available-nodes>` recebe a mensagem, mapeia para o parâmetro `nodes` e processa os dados criando os nós disponíveis e os renderizando na "gaveta" para que o usuário selecione.
* Após selecionar um nó, o usuário o arrasta para o espaço de workflow, o componente `<world-space-view>`.
  * Isso inicia o evento `addNode`, mapeia para o parâmetro `addNode` e atualiza o estado do workflow.
  * Assim, o novo nó é criado no workflow:
    * O componente do Workflow instancia cada `<world-space-node>` com a informação recebida pelo addNode sendo passada como parâmetro.
* O usuário conecta os nós criados o que atualiza novamente o estado do workflow
* Por fim, ao clicar em exportar, o componente `<world-space-view>` lança o evento `exportWorkflow`, mapeia para o parâmetro `exportWorkflow` e publica no barramento o estado atual do pipeline para que o próximo grupo o execute.
