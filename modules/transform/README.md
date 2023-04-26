# Module Transform

# Description
Esse módulo pretende fazer transformações relacionais nos dados, como por exemplo: filtro, join, dropar colunas etc.

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

> A tabela é um JSON no qual os campos são as colunas, e esses representam um array com os valores de cada linha. A tipagem dos dados depende da tabela inserida pelo usuário

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
`transformar` | `Fará a operação solicitada e devolverá a tabela resultante` | `Tabela`

### Output Notices

notice    | source | message type
----------| -------| ------------
`pronto` | `A operação é finalizada` | `Tabela`

# Components Narratives

## Setup

~~~html
<entrada publish="operação:análise/relacional/operacao_coluna/op/coluna_destino/coluna1/coluna2">
subscribe="análise/relacional/pronto"
</entrada>

<operacao-colunas subscribe="análise/relacional/operacao_coluna/op/coluna_destino/coluna1/coluna2:transformar">
</Operacao-colunas>
~~~

## Narrative

* Dois componentes: módulo que recebe os dados (`entrada`) e o módulo de operações (`operacao-colunas`).
* O módulo de operações assina o tópico "`análise/relacional`".
* O módulo de entrada recebe uma mensagem do componente de workflow com a operação solicitada pelo usuário e a tabela de dados.
* O módulo de entrada valida a mensagem recebida:
  * Checa a operação;
  * Verifica se tem todos os parâmetros necessários para ela;
  * Publica uma mensagem com o tópico `análise/relacional`.
* O módulo de entrada assina o tópico `análise/relacional/pronto`.
* O módulo de operações recebe a mensagem com o tópico `Análise/relacional` e:
  * Mapeia para o aviso `transformar`;
  * Realiza a operação;
  * Publica uma mensagem com o tópico `análise/relacional/pronto`.
 
