categoryName: model //É esperado que o array de dados seja propagado do passo anterior para o próximo.

~~~json
{
  model: [{
    type: TransformedData,
    name: PCA,
    compatibleInputNodes: {
      entrada0: `Data` // Retorno do grupo de dados,
      entrada1: `Transform` // Retorno do grupo de transformação
    },
    inputFields: [
      fieldName: 'numDimension',
      fieldType: 'input',
      inputType: {
        type:'number',
        parameters: {
          min: 1
        }
      }
    ]
  },
  {
    type: TransformedData,
    name: cluster,
    compatibleInputNodes: {
      entrada0: `Data` // Retorno do grupo de dados,
      entrada1: `Transform` // Retorno do grupo de transformação
    },
    inputFields: [
      fieldName: 'numCluster',
      fieldType: 'input',
      inputType: {
        type:'number',
        parameters: {
          min: 1,
          max: 10
        }
      }
    ]
  },
  {
    type: TransformedData,
    name: linearRegression,
    compatibleInputNodes: {
      entrada0: `Data` // Retorno do grupo de dados,
      entrada1: `Transform` // Retorno do grupo de transformação
    },
    inputFields: []
  }]
}
~~~
