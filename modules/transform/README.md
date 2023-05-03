# Module Transform

# Description
Esse módulo pretende receber pedidos de transformações relacionais para determinados dados, e retornar os dados já processados como foi desejado pela entrada, como por exemplo: filtrar dados, join de colunas, drop de colunas, etc.

# Team
Cícero Pizzol Libardi - RA:168810 <br>
Jéssica da Silva Oliveira - RA:173931 <br>
Isabella Garcia Fagioli - RA:173174 <br>
Fábio de Andrade Barboza - RA:168817 <br>

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
  "comparedValue": "<any>"
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

**`minimumInput`**
~~~json
{
  "table": "<validTable>",
  "column": "<string>",
  "operation": "<string>"
}
~~~

**`maximumInput`**
~~~json
{
  "table": "<validTable>",
  "column": "<string>",
  "operation": "<string>"
}
~~~

**`countInput`**
~~~json
{
  "table": "<validTable>",
  "column": "<string>",
  "operation": "<string>",
  "countValue": "<any>"
}
~~~

> Os tipos acima se referem a entrada de cada uma das transformações que serão realizadas pelo módulo.

**`transformationError`**
~~~json
{
  "transformationType": "<string>",
  "errorType": "<string>",
  "message": "<string>"
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
`publishNodes` | `é ativado quando a aplicação se inicia`  | `availableNodes`

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
`presentTransformation` | `é ativado quando o componente é inicializado`  | `template`

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

## Component `minimum`

> Encontra e retorna o valor mínimo da coluna.

### Properties

property | role
---------| --------
`value` | `salva o valor resultante da operação`
`status` | `salva o estado da operação relacional`
`name` | `nome do componente visível para o usuário`
`type` | `tipo do componente (Transformação) visível para o usuário`

### Input Notices

notice | action | message type
-------| ------ | ------------
`minimum` | `percorre a coluna indicada e encontra o valor mínimo` | `minimumInput`

### Output Notices

notice    | source | message type
----------| -------| ------------
`transformationError` | `é ativado quando a operação termina e há um erro` | `transformationError`
`minimumResult` | `é ativado quando a operação de encontrar o mínimo termina` | `singleValue`

## Component `maximum`

> Encontra e retorna o valor máximo da coluna.

### Properties

property | role
---------| --------
`value` | `salva o valor resultante da operação`
`status` | `salva o estado da operação relacional`
`name` | `nome do componente visível para o usuário`
`type` | `tipo do componente (Transformação) visível para o usuário`

### Input Notices

notice | action | message type
-------| ------ | ------------
`maximum` | `percorre a coluna indicada e encontra o valor máximo` | `maximumInput`

### Output Notices

notice    | source | message type
----------| -------| ------------
`transformationError` | `é ativado quando a operação termina e há um erro` | `transformationError`
`maximumResult` | `é ativado quando a operação de encontrar o máximo termina` | `singleValue`

## Component `count`

> Conta quantas vezes o elemento aparece na coluna.

### Properties

property | role
---------| --------
`value` | `salva o valor resultante da operação`
`status` | `salva o estado da operação relacional`
`name` | `nome do componente visível para o usuário`
`type` | `tipo do componente (Transformação) visível para o usuário`

### Input Notices

notice | action | message type
-------| ------ | ------------
`count` | `percorre a coluna indicada e conta quantas vezes o elemento aparece na mesma` | `countInput`

### Output Notices

notice    | source | message type
----------| -------| ------------
`transformationError` | `é ativado quando a operação termina e há um erro` | `transformationError`
`countResult` | `é ativado quando a operação de contar as aparições do elemento termina` | `singleValue`

# Components Narratives

## Setup

~~~html

<TransformNodes
        publish="publishNodes:availableNodes/availableNodes">
</TransformNodes>

<Filter
        subscribe="filter/filterInput:filter"
        publish="filterError:transformationError/transformationError;filterResult:filterResult/validTable">
</Filter>

<PresentTransformation
        publish="presentTransformation:presentTransformation/template">
</PresentTransformation>
~~~

## Narrative

* O componente `TransformNodes` é instanciado no início da aplicação e fornece os templates os nodes disponíveis no módulo para o usuário montar o workflow e inserir os dados desejados. 
* Quando os componentes forem instanciados pelo grupo de presentation, o componente `filter` vai recber o tópico `filter` junto com o respectivo input e vai mapear para o notice `filter`, que irá fazer o filtro. Internamente, irá usar um componente de validação para verificar a entrada e possíveis erros. Os tópicos publicados são dois possíveis:
  * `transformationError`: caso ocorra algum erro na validação ou na própria execução da operação e a mensagem especifica o erro.
  * `filterResult`: caso a operação seja bem sucedida. A mensagem publicada é a tabela resultante
* Se o usuário conectar o resultado do filtro com o componente de saida `PresentTransformation`, esse componente é instanciado por outro grupo. No momento em que é instanciado com os devidos valores dados pelo usuário, ele publica uma mensagem com o tópico `presentTransformation` para que o grupo de presentation posso renderizar. 
