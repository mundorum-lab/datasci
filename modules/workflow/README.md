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
    "id": int,
    "type": string,
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
  "nome_da_categoria1": [{
    "output": [{"type": [string], "range": [int, int]}, ...],
    "id": string,
    "name": string,
    "presentable": boolean,
    "icon": string,
    "input": [{"type": [string], "range": [int, int]}, ...],
    "fields": [{
      "name": string,
      "view": string, 
      "parameters": {} // depende do tipo de view. Ex.: para NumberField, {"max": int, "min": int, "placeholder": string, "step": int, "value": int}
    }]
  }],

  "nome_da_categoria2": [{
    "output": [{"type": [string], "range": [int, int]}, ...],
    "id": string,
    "name": string,
    "presentable": boolean,
    "icon": string,
    "input": [{"type": [string], "range": [int, int]}, ...],
    "fields": [{
      "name": string,
      "view": string, 
      "parameters": {}
    }]
  }],
  ...
}
~~~

**`SingleNode`**
~~~json
{
    "output": [{"type": [string], "range": [int, int]}, ...],
    "id": string,
    "name": string,
    "presentable": boolean,
    "icon": string,
    "input": [{"type": [string], "range": [int, int]}, ...],
    "fields": [{
      "name": string,
      "view": string, 
      "parameters": {}
  }]
}
~~~


> Types inspired in [TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html): `boolean`, `number`, and `string`. Specify arrays with the element type under brackets, e.g., `[number]`.

> One can use a second message type inside a given message type (illustrated as `<message type>`).

> Use camel case to identify message types, starting with uppercase (same practice for class names in JavaScript).

# Parâmetros dos Campos de uma View

A seguir serão apresentados as “views” dos “fields” que podem ser utilizados durante o cadastro dos componentes. Para cada um deles, definimos os parâmetros que utilizaremos para a renderização do nó. Os parâmetros que definimos foram baseados na documentação HTML da [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types).

*Obs.: Nem todos os parâmetros são obrigatórios. Usem aqueles que vocês considerarem importantes.*

## TextInput

Parâmetros permitidos: **maxLength**, **minLength**, **list**, **pattern**, **placeholder**.

Descrição dos parâmetros:
~~~
- maxLength: <int> 
    -> tamanho máximo permitido para o input

- minLength: <int>  
    -> tamanho mínimo permitido para o input

- list: []  
    -> lista de valores sugeridos (não restringe outras possíveis entradas)

- pattern: <string> 
    -> expressão regular para validação do input
    -> use para filtrar caracteres/palavras que são proibidas

- placeholder: <string>  
    -> texto que aparece de fundo no textInput 
~~~

## NumberField

Parâmetros permitidos: **max**, **min**, **placeholder**, **step**, **value**.

Descrição dos parâmetros:
~~~
- max: <int> 
    -> valor máximo permitido para o input

- min: <int> 
    -> valor mínimo permitido para o input

- placeholder: <string>  
    -> texto que aparece de fundo no textInput

- step: <int> 
    -> setinha do lado do campo que aumenta ou diminui o valor informado quando o usuário clica. 

- value: <int> 
    -> valor default escolhido para o campo
~~~

## RadioButton

Parâmetro permitido: **values**.

Descrição do parâmetro:
~~~
- values: [{"name": <string>, "value": <string>, "checked": <boolean>}]
    -> lista de objetos com propriedades name, value, checked.
    -> "name" refere-se ao label que será renderizado junto com a caixa de marcação
    -> "value" refere-se ao valor que o item possui (não é exibido, apenas transmitido)
    -> "checked" serve para a opção ja ir marcada por padrão na visualização
~~~

*Obs: Já que o RadioButton só permite a seleção de 1 dos itens listados, **apenas 1 objeto** da lista pode conter **checked = true**.*

## CheckBox

Parâmetro permitido: **values**.

Descrição do parâmetro:
~~~
- values: [{“name”:<string> ; “value”:<string>; “checked”: <boolean>}]  
    -> lista de objetos com propriedades name, value, checked.
    -> "name" refere-se ao label que será renderizado junto com a caixa de marcação
    -> "value" refere-se ao valor que o item possui (não é exibido, apenas transmitido)
    -> "checked" serve para a opção ja ir marcada por padrão na visualização
~~~

*Obs: A ChechBox permite que **mais de 1 objeto** da lista contenha **checked = true**, isso serve para marcar múltiplos values.*


## Toggle

Não permite nenhum parâmetro, uma vez que apenas devolve o estado "true" (caso o switch for acionado) ou "false" (caso o switch não for acionado). 

## RangeInput

Parâmetros permitidos: **max**, **min**, **value**, **step**.

Descrição dos parâmetros:
~~~
- max: <int> 
    -> valor máximo do intervalo

- min: <int> 
    -> valor mínimo do intervalo

- value: <int> 
    -> valor default definido entre max e min

- step: <int> 
    -> passo de atualização do value a medida que o usuário arrasta o botão
~~~

## FileInput

Parâmetros permitidos: **accept**, **multiple**.

Descrição dos parâmetros:
~~~
- accept: [<string>]
    -> lista de formatos aceitos pelo input

- multiple: <boolean> 
    -> define se aceita mais de um arquivo
~~~

## Dropdown

Parâmetro permitido: **options**.

Descrição do parâmetro:

~~~
- options: [{"name": <string>, "value": <string>}]	
    -> lista de opções do menu DropDown
    -> cada opção é um objeto contendo nome e valor
~~~

## Extras

Abaixo seguem alguns exemplos de views que **não serão implementadas**, mas se os grupos precisarem, podem implementar.

- **PasswordInput** (semelhante ao TextInput mas com os caracteres substituidos por *)
- **TextBox** (semelhante ao TextInput com tamanho da caixa de texto maior)
- **TextList**


# JSONs

Este é o formato padrão para a declaração dos Nodes possíveis.

**`nodeNome.json`**

```json
[
  {
   "output": [{"type": [string], "name": string, "range": [int, int]}, ...],
    "id": string,
    "name": string,
    "presentable": boolean,
    "icon": string,
    "input": [{"type": [string], "name": string, "range": [int, int]}, ...],
    "fields": [{
      "name": string,
      "view": string,
      "parameters": {} // depende do tipo de view. Ex.: para NumberField, {"max": int, "min": int, "placeholder": string, "step": int, "value": int}
    }]
  }
  ...
]
```

* Exemplos:

**`nodeGraphScatter.json`**

```json
{
  "output": [{"type": ["graph/scatter"], "name": "Saída do gráfico", "range": [1, 1]}],
  "id": "visualize:scatter-plot",
  "name": "Scatter Plot",
  "presentable": true,
  "icon": "/assets/icon.ico",
  "input": [{"type": ["input"], "name": "Dados", "range": [1, 1]}],
  "fields": [{
      "name": "Título do Gráfico",
      "view": "TextBox",
      "parameters": {
          "maxLength": 20,
          "minLength": 5,
          "placeholder": "Insira o título aqui:"
          }
      }]
}
```
 
**`nodeGraphLine.json`**

```json
{
  "output": [{"type": "graph/line", "name": "Saída do gráfico", "range": [1, 1]}],
  "id": "visualize:line-plot",
  "name": "Line Plot",
  "presentable": true,
  "icon": "/assets/icon.ico",
  "input": [{"type": ["input"], "name": "Dados", "range": [1, 1]}],
  "fields": [{
      "name": "Título do Gráfico",
      "view": "TextBox",
      "parameters": {
          "maxLength": 20,
          "minLength": 5,
          "placeholder": "Insira o título aqui:"
          }
      }]
}
```

**`nodeInputCsv.json`**

```json
{
  "output": [{"type": "input/csv", "name": "Saída dos dados", "range": [1, 5]}],
  "id": "data:csv-file",
  "name": "Csv File",
  "presentable": false,
  "icon": "/assets/icon.ico",
  "input": [],
  "fields": [{
      "name": "Nome do Eixo Y",
      "view": "TextBox",
      "parameters": {
          "maxLength": 10,
          "minLength": 1,
          "placeholder": "Insira o nome aqui:"
          }
      }]
}
```
 
**`nodeInputDatabase.json`**

```json
{
  "output": [{"type": "input/database", "name": "Saída dos dados", "range": [1, 5]}],
  "id": "data:database",
  "name": "Database",
  "presentable": false,
  "icon": "/assets/icon.ico",
  "input": [],
  "fields": [{
      "name": "URL da Database",
      "view": "TextBox",
      "parameters": {
          "maxLength": 10
          }
      }]
}
```

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
