# Module Transform

# Description
Esse módulo pretende receber pedidos de transformações relacionais para determinados dados, e retornar os dados já processados como foi desejado pela entrada, como por exemplo: filtrar dados, join de colunas, drop de colunas, etc.

# Team
Cícero Pizzol Libardi - RA 168810 <br>
Fábio de Andrade Barboza - RA 168817 <br>
Isabella Garcia Fagioli - RA 173174 <br>
Jéssica da Silva Oliveira - RA 173931 <br>

# Message Types

**`Tabela`**
~~~json
{
  Tabela: {
    coluna1: {linha1, linha2, ... , linhan}
    coluna2: {linha1, linha2, ... , linhan}
    ...
    colunan: {linha1, linha2, ... , linhan}
  }
}
~~~

> A tabela é um JSON no qual os campos são as colunas, e esses representam um array com os valores de cada linha. A tipagem dos dados depende da tabela inserida pelo usuário

**`filterInput`**
~~~json
{
  table: table
  column: string
  operation: string
  compared_value: any
}
~~~

**`columnInput`**
~~~json
{
  table: table
  column1: string
  column2: string
  operation: string
  outputColumn: string
}
~~~

**`operationResult`**
~~~json
{
  table: table
  status: boolean
}
~~~


# Components

> Cada componente é responsável por uma operação relacional.
> Além disso há um componente de validação, para verificar se os parâmetros de cada operação são válidos

## Component `validateFilter`

> Valida os argumentos passados para a operação de filtro correspondente. Por exemplo, verifica se o valor de comparação utilizado no filtro é válido e é do mesmo tipo dos valores da coluna com base na qual se deseja filtrar.

### Properties

property | role
---------| --------
`status` | `salva o estado da validação realizada`

### Input Notices

notice | action | message type
-------| ------ | ------------
`filter` | `valida os arguntos de uma filtragem que é requisitada por algum outro componente` | `filterInput`

### Output Notices

notice    | source | message type
----------| -------| ------------
`validationSucceed` | `é ativado pelo próprio componente quando termina uma validação bem sucedida` | `filterInput`
`validationFailed` | `é ativado pelo próprio componente quando termina uma validação que falhou` | `operationResult`

## Component `filter`

> Filtra as linhas de uma tabela com base na coluna, operação e valor de comparação passados por mensagem.

### Properties

property | role
---------| --------
`table` | `salva a tabela resultante da filtragem`
`status` | `salva o estado da operação relacional`

### Input Notices

notice | action | message type
-------| ------ | ------------
`filterOperation` | `filtra uma tabela de dados, gerando outra` | `filterInput`

### Output Notices

notice    | source | message type
----------| -------| ------------
`filtered` | `é ativado quando a operação de filtrar termina` | `operationResult`

## Component `columnOperation`

> Cria uma nova coluna a partir de dados de, no máximo duas colunas, e retorna o valor dessa coluna em uma nova coluna, com nome especificado.

### Properties

property | role
---------| --------
`table` | `salva a tabela resultante da operação`
`status` | `salva o estado da operação relacional`

### Input Notices

notice | action | message type
-------| ------ | ------------
`transform` | `faz uma operação entre colunas e gera uma tabela com a atabela anterior mais a coluna resultante` | `transformInput`

### Output Notices

notice    | source | message type
----------| -------| ------------
`getTable` | `a entrada de um componente no worflow é adicionada a saída de um componente de transformação` | `table`

# Components Narratives

## Setup

~~~html
<validateFilter 
        status=false
        table = {}
        subscribe="filter/filterInput:validate"
        publish="validationSucceed:filterOperation/filterInput"
        publish="validationFailed:filterResult/operationResult"
        >
</validateFilter>

<filter
        status=false
        subscribe="filterOperation/filterInput:filter"
        publish="filtered:filterResult/operationResult">
</filter>
~~~

## Narrative

* O componente `validateFilter` apresenta o notice de entrada `validate` que assina o tópico `filter`. Assim, toda vez que se deseja fazer um filtro, a filtragem passa primeiro pela validação, que recebe também a mensagem do tipo `filterInput`, com os argumentos a serem usados no filtro. Após a validação ser realizada, o componente, a depender do resultado da validação, ativa os notices
  * `onValidationFail`: caso a validação falhe, no segundo caso, o resultado é publicado direto, com o tópico  `operationResult` e a mensagem `operationResult`
  * `onValidationSuccess`: se a validação é bem-sucessida, então é publicado um tópico de  `filterOperation`, com a mensagem `filterInput`
    * Esse tópico é assinado pelo componente de filtro propriamente dito, que aciona a operação de filtro. Após ser finalizada, ela ativa o notice `getResult`, que publica o resultado da filtragem com o tópico `operationResult` e a mensagem contendo o resultado, `operationResult`. 
* A mensagem do tipo `operationResult` é compartilhada por todos os componentes de transformações relacionais, já que o resultado é sempre uma tabela e o estado da transformação.
