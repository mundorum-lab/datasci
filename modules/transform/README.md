# Module Transform

# Description
Esse módulo pretende receber pedidos de transformações relacionais para determinados dados, e retornar os dados já processados como foi desejado pela entrada, como por exemplo: filtrar dados, join de colunas, drop de colunas, etc.

# Team
Cícero Pizzol Libardi RA:168810 <br>
Jéssica da Silva Oliveira RA:173931 <br>
Isabella Garcia Fagioli RA:173174 <br>
Fábio de Andrade Barboza RA:168817 <br>

# Message Types

**`validTable`**
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

**`singleValue`**

~~~json
{
  "value": "<any>"
}
~~~

> Esse foi o formato da tabela acordado entre os grupos. Cada componente de `transform` estará apto a receber essa tabela como entrada para suas transformações. As saídas de alguns componentes podem ser valores inteiros simples (como média, mínimo, etc). Por isso, temos também um tipo para uma variável simples. 

**`filterInput`**
~~~json
{
  "table": "<validTable>",
  "column": "<string>",
  "operation": "<string>",
  "compared_value": "<any>"
}
~~~

**`columnOpInput`**
~~~json
{
  "table": "<validTable>",
  "column1": "<string>",
  "column2": "<string>",
  "operation": "<string>",
  "resultColumn": "<string>"
}
~~~

**`groupByInput`**
~~~json
{
  "table": "<validTable>",
  "groupByTargetColumn": "<string>",
  "operationTargetColumn": "<string>",
  "operation": "<string>",
  "resultColumn": "<string>"
}
~~~

> Os tipos acima se referem a entrada de cada uma das transformações que serão realizadas pelo módulo.

**`transformationError`**
~~~json
{
  "transformationType": "<string>",
  "errorType": "<string>",
  "message": "<string>",
}
~~~

> Caso haja erro durante as transformações, cada componente terá seus tipos de erro, com as respectivas mensagens. 


# Components

> Cada componente é responsável por uma operação relacional.
> Para cada um dos componentes, haverá um componente de validação, que será implementado internamente pelo componente principal. 
> Além disso, outros componentes intermediários serão necessários para fazer a comunicação com outros grupos.

## Component `TransformNodes`

> Componente responsável por salvar os templates de todas as operações de transformação disponíveis. O template é um conjunto de informações de tipos de dados, campos de entrada, entre outras que o grupo de workflow precisa para mostrar os componentes disponíveis ao usuário. Cada template de um componente é um nó. 

### Properties

property | role
---------| --------
`nodes` | `uma lista que salva todos o nós de cada um dos componentes de transformação disponíveis`

### Output Notices

notice    | source | message type
----------| -------| ------------
`availableNodes` | `é ativado quando a palicação se inicia`  | `availableNodes`

> A notice e o tipo da mensagem foram definidos pelo grupo de workflow e acordados entre os módulos

## Component `PresentTransformation`

> Componente responsável por receber as saídas das transformações, sejam tabelas ou números, e criar uma notificação para o grupo de `presentation` apresentar na tela.

### Properties

property | role
---------| --------
`size` | `é o tamanho que o elemento gráfico terá na tela`
`position` | `é a posição, entre as disponíveis, que a apresentação terá na tela`


### Output Notices

notice    | source | message type
----------| -------| ------------
`presenteTransformation` | `é ativado quando o componente é inicializado`  | `template`

> O tipo de mesagem template foi definido pelo grupo de apresentação. Trata-se de informações relativos a tamanho e posição da apresentação

## Component `Transform`

property | role
---------| --------
`table` | `salva a tabela resultante da filtragem`
`status` | `salva o estado da operação relacional`
`name` | `nome do componente visível para o usuário`
`type` | `tipo do componente (Transformação) visível para o usuário`

> talvez usaremos esse componente como principal para ser herdado por todos os outros componentes que realizam operações, uma vez que muitas propriedades e notices serão similares. 

## Component `Validate`

> Valida os argumentos passados para a transformação e retorna um erro caso não seja possível realizar a operação. É obrigatório que todos os componentes de transformação implementem uma validação. Esse componente será interno e não fará comunicação com o barramento.

## Component `filter`

> Filtra as linhas de uma tabela com base na coluna, operação e valor de comparação passados por mensagem.

### Properties

property | role
---------| --------
`table` | `salva a tabela resultante da filtragem`
`status` | `salva o estado da operação relacional`
`name` | `nome do componente visível para o usuário`
`type` | `tipo do componente (Transformação) visível para o usuário`

### Input Notices

notice | action | message type
-------| ------ | ------------
`filter` | `filtra uma tabela de dados, gerando outra` | `filterInput`

### Output Notices

notice    | source | message type
----------| -------| ------------
`transformationError` | `é ativado quando a operação de filtrar termina e há erros` | `transformationError`
`filterResult` | `é ativado quando a operação de filtrar termina` | `validTable`

## Component `columnOperation`

> Cria uma nova coluna a partir de dados de, no máximo duas colunas, e retorna o valor dessa coluna em uma nova coluna, com nome especificado.

### Properties

property | role
---------| --------
`table` | `salva a tabela resultante da operação`
`status` | `salva o estado da operação relacional`
`name` | `nome do componente visível para o usuário`
`type` | `tipo do componente (Transformação) visível para o usuário`

### Input Notices

notice | action | message type
-------| ------ | ------------
`columnOp` | `faz uma operação entre colunas e gera uma tabela com a atabela anterior mais a coluna resultante` | `columnOpInput`


### Output Notices

notice    | source | message type
----------| -------| ------------
`transformationError` | `é ativado quando a operação termina e há um erro` | `transformationError`
`columnOpResult` | `é ativado quando a operação termina bem sucedida` | `validTable`

# Components Narratives

## Setup

> Specify here the components involved in the narrative and their publish/subscribe attributes in HTML.

~~~html
<validateFilter 
        status=false
        table = {}
        subscribe="filterOperation:validate"
        publish="onValidationSuccess:filterOperation"
        publish="onValidationFail:operationResult"
        >
</validateFilter>

<filter
        status=false
        subscribe="filterOperation:filter"
        publish="getResult:operationResult">
</filter>
~~~

## Narrative

* O componente `validateFilter` apresenta o notice de entrada `validate` que assina o tópico `filter`. Assim, toda vez que se deseja fazer um filtro, a filtragem passa primeiro pela validação, que recebe também a mensagem do tipo `filterInput`, com os argumentos a serem usados no filtro. Após a validação ser realizada, o componente, a depender do resultado da validação, ativa os notices
  * `onValidationFail`: caso a validação falhe, no segundo caso, o resultado é publicado direto, com o tópico  `operationResult` e a mensagem `operationResult`
  * `onValidationSuccess`: se a validação é bem-sucessida, então é publicado um tópico de  `filterOperation`, com a mensagem `filterInput`
    * Esse tópico é assinado pelo componente de filtro propriamente dito, que aciona a operação de filtro. Após ser finalizada, ela ativa o notice `getResult`, que publica o resultado da filtragem com o tópico `operationResult` e a mensagem contendo o resultado, `operationResult`. 
* A mensagem do tipo `operationResult` é compartilhada por todos os componentes de transformações relacionais, já que o resultado é sempre uma tabela e o estado da transformação.
