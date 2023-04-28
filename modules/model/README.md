# Module Model

# Description
> Realiza transformações estatísticas em conjuntos de dados usando técnicas de aprendizado de máquina.

# Team
* Otávio Silveira Munhoz - 204280
* Régis Gabetta De Souza - 223965
* Felipe Hideki Matoba - 196767
* Fernando de Sáes Madeira Vallar - 171509
* João Pedro Vianini de Paula - 176241

# Message Types

**`ModelObject`**
~~~json
{
  columns: [{name, type}, ...]
  data: [
    [coluna0, coluna1, ...]
    [coluna0, coluna1, ...]
    ...
  ]
  params: {
    paramName: objectValue
    ...
  }
}
~~~

> O objeto contém o objeto columns, que representa o nome e o tipo de cada coluna da tabela, o data, com uma tabela serializada, cujo tipo depende dos dados inseridos, e o objeto params, que possui os parâmetros necessários para cada transformação.

**`TransformedData`**
~~~json
{
  data: {
    coluna1: {linha1, linha2, ... , linhan}
    coluna2: {linha1, linha2, ... , linhan}
    ...
    colunam: {linha1, linha2, ... , linhan}
  }
  types: [string]
}
~~~

> O objeto contém uma tabela serializada com os dados transformados.

# Components

## Component `StatisticsTransformation`

> Recebe o ModelObject, desserializa os dados e aplica a transformação requisitada. Por fim, devolve os dados transformados para o barramento.

### Input Notices

notice | action | message type
-------| ------ | ------------
`statistics/input` | `O usuário envia um pedido de transformação dos dados` | `ModelObject`

### Output Notices

notice    | source | message type
----------| -------| ------------
`statistics/output` | `O componente envia os dados transformados para o barramento` | `TransformedData`

# Components Narratives

## Setup

~~~html
<solicita-transformacao attribute="value"
                publish="notice:statistics/input">
</solicita-transformacao>

<StatisticsTransformation
                subscribe="statistics/input:transformation"
                publish="transformation:statistics/output">
</StatisticsTransformation>

<exibe-grafico
                subscribe="statistics/output:display">
</exibe-grafico>
~~~

## Narrative

* O componente StatisticsTransformation irá subscrever no barramento assinando o tópico statistics/input
* O componente fictício solicita-transformacao publica um pedido de transformação nesse tópico
* O StatisticsTransformation recebe o pedido e:
  * Desserializa os dados;
  * Verifica o tipo da transformação;
  * Realiza a transformação;
  * Serializa a resposta;
  * Publica no barramento em statistics/output.
* O componente fictício exibe-grafico, subscrito no statistics/output, recebe os dados transformados e exibe o gráfico correspondente.
