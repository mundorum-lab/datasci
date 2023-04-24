# Module Transform

# Description
Esse módulo pretende fazer transformações relacionais nos dados, como por exemplo: filtro, join, dropar colunas, etc

# Team
Cícero Pizzol Libardi RA:168810 <br>
Jéssica da Silva Oliveira RA:173931 <br>
Isabella Garcia Fagioli RA:173174 <br>
Fábio de Andrade Barboza RA:168817 <br>

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

> A tabela é um JSON no qual os campos são as colunas, e esses representam um array com os valores de cada linhha. A tipagem dos dados depende da tabela inserida pelo usuário

# Components

> Cada transformação possível terá um componente próprio, vamos especificar alguns

## Component `Operação com colunas`

> Quando queremos uma nova coluna construída a partir de dados de colunas presentes no dataset

### Properties

property | role
---------| --------
`Coluna 1` | `Uma das colunas envolvidas na operação`
`Coluna 2` | `Uma das colunas envolvidas na operação, pode ser nula para operações com uma coluna só`
`Operação` | `Indica a operação a ser realizada com a(s) coluna(s)`
`Coluna Saída` | `O nome da nova coluna`

### Input Notices

notice | action | message type
-------| ------ | ------------
`Operação` | `Fará a operação solicitada e devolverá a tabela resultante` | `Tabela`

### Output Notices

notice    | source | message type
----------| -------| ------------
`Pronto` | `A operação é finalizada` | `Tabela`

# Components Narratives

## Setup

> Specify here the components involved in the narrative and their publish/subscribe attributes in HTML.

~~~html
<entrada publish="Operação:Análise/relacional/operacao_coluna/op/coluna_destino/coluna1/coluna2">
</entrada>

<Operacao-colunas subscribe="Análise/relacional/operacao_coluna/op/coluna_destino/coluna1/coluna2:Pronto">
</Operacao-colunas>
~~~

## Narrative

O componente de entrada deve receber uma mensagem do componente de workflow com a operação solicitada pelo usuário e a tabela de dados;
Esse componente deve validar a mensagem (checar qual a operação e se tem todos os parâmetros necessários para ela) e chamar a operação solicitada;
Realiza tal operação;
Devolve a tabela resultante;

