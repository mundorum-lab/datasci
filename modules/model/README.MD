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

> O objeto contém o array de objetos columns, que representa o nome e o tipo de cada coluna da tabela, o data, com um o array que contém os dados da tabela, cujo tipo depende dos dados inseridos, e o objeto params, que possui os parâmetros necessários para cada transformação.

**`TransformedData`**
~~~json
{
  columns: [{name, type}, ...]
  data: [
    [coluna0, coluna1, ...]
    [coluna0, coluna1, ...]
    ...
  ]
}
~~~

> O objeto contém um array com os dados transformados e o array de objetos columns, que representa o nome e o tipo de cada coluna da tabela.

# Components

## Component `DataOperations`

> Componente interno que será usado pelos modelos de IA. Responsável por realizar as operações comuns de processamento de dados, como por exemplo a desserialização.

## Component `Cluster`

> Recebe o ModelObject, aplica o modelo de clusterização. Por fim, devolve os dados transformados para o barramento. Para esse componente funcionar, será necessário o parâmetro `num_cluster`, que indica a quantidade de cluster que o modelo deverá gerar

### Input Notices

notice | action | message type
-------| ------ | ------------
`statistics/cluster` | `O usuário envia um pedido de transformação dos dados por clusterização` | `ModelObject`

### Output Notices

notice    | source | message type
----------| -------| ------------
`statistics/output` | `O componente envia os dados transformados para o barramento` | `TransformedData`

### Connect
source | message type
----------| -------
`DataOperation` | `TransformedData`

## Component `PCA`

> Recebe o ModelObject, reduz a dimensionalidade através da aplicação do modelo de PCA. Por fim, devolve os dados transformados para o barramento. Para esse componente funcionar, será necessário o parâmetro `num_dimension`, que indica a quantidade de dimensões que a nova tabela deverá ter

### Input Notices

notice | action | message type
-------| ------ | ------------
`statistics/PCA` | `O usuário envia um pedido de redução de dimensionalidade de uma tabela através da aplicação do modelo PCA` | `ModelObject`

### Output Notices

notice    | source | message type
----------| -------| ------------
`statistics/output` | `O componente envia os dados transformados para o barramento` | `TransformedData`

### Connect
source | message type
`DataOperation` | `TransformedData`

## Component `LinearRegression`

> Recebe o ModelObject, aplica o modelo de Regressão Linear gerando os pontos da linha que melhor representa o modelo. Por fim, devolve os dados transformados para o barramento.

### Input Notices

notice | action | message type
-------| ------ | ------------
`statistics/linearRegression` | `O usuário envia um pedido para gerar a linha que melhor representa os dados` | `ModelObject`

### Output Notices

notice    | source | message type
----------| -------| ------------
`statistics/output` | `O componente envia os dados transformados para o barramento` | `TransformedData`

### Connect
source | message type
`DataOperation` | `TransformedData`

# Components Narratives

## Setup

~~~html
<data-component attribute="value"
                publish="notice:statistics/pca">
</data-component>

<pca
                subscribe="statistics/pca:transformation"
                publish="transformation:statistics/output">
</pca>

<exibe-grafico
                subscribe="statistics/output:display">
</exibe-grafico>
~~~

## Narrative

* O componente PCA irá subscrever no barramento assinando o tópico statistics/pca
* O componente do grupo de dados ou de tranformação (chamado ficticilmente de data-component) publica um pedido de transformação nesse tópico
* O componente PCA recebe o pedido e:
  * Desserializa os dados;
  * Realiza a transformação;
  * Serializa a resposta;
  * Publica no barramento em statistics/output.
* O componente fictício exibe-grafico, subscrito no statistics/output, recebe os dados transformados e exibe o gráfico correspondente.
* No exemplo, utilizamos apenas o componente PCA, mas o setup e a narrativa são as mesmas para o componente `cluster` e `linear-regression`
