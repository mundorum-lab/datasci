export const availableNodes = {
    filter: [{                     
        type: "table/json",
        name: "Filtrar Tabela",
        compatibleInputNodes: {
            /*entrada0: {typeIds<[string]>, listRange<(int, int)>}, //need to check with all groups the available IDs, this can change
            entrada1: {typeIds<[string]>, listRange<(int, int)>},*/  
        },
        inputFields: [
            {
                fieldName: "Operação",
                fieldType: "Dropdown", 
                inputType: 
                {
                    type: "string",
                    parameters: {values:[">=",">","<","<=","="]}, //this parameters will change
                }
            },
            {
                fieldName: "Nome da Coluna filtrada",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string",
                    parameters: {},
                }
            },
            {
                fieldName: "Valor a ser comparado",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "any",
                    parameters: {},
                }
            },
        ]
    }],

    mean: [{                     
        type: "singleValue",
        name: "Encontra o valor médio de uma certa coluna",
        compatibleInputNodes: { 
        },
        inputFields: [
            {
                fieldName: "Nome da coluna",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string",
                    parameters: {}, //this parameters will change
                }
            }
        ]
    }],

    median: [{                     
        type: "singleValue",
        name: "Encontra o valor da mediana de uma certa coluna",
        compatibleInputNodes: { 
        },
        inputFields: [
            {
                fieldName: "Nome da coluna",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string",
                    parameters: {}, //this parameters will change
                }
            }
        ]
    }],

    mode: [{                     
        type: "singleValue",
        name: "Encontra o valor da moda de uma certa coluna",
        compatibleInputNodes: { 
        },
        inputFields: [
            {
                fieldName: "Nome da coluna",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string",
                    parameters: {}, //this parameters will change
                }
            }
        ]
    }],

    stddev: [{                     
        type: "singleValue",
        name: "Encontra o valor do desvio padrão de uma certa coluna",
        compatibleInputNodes: { 
        },
        inputFields: [
            {
                fieldName: "Nome da coluna",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string",
                    parameters: {}, //this parameters will change
                }
            }
        ]
    }],

    minimum: [{                     
        type: "singleValue",
        name: "Encontrar o valor mínimo da coluna",
        compatibleInputNodes: {},
        inputFields: [
            {
                fieldName: "Nome da coluna",
                fieldType: "Textbox",
                inputType:
                {
                    type: "string",
                    parameters: {},
                }
            }
        ]
    }],

    maximum: [{                     
        type: "singleValue",
        name: "Encontrar o valor máximo da coluna",
        compatibleInputNodes: {},
        inputFields: [
            {
                fieldName: "Nome da coluna",
                fieldType: "Textbox",
                inputType:
                {
                    type: "string",
                    parameters: {},
                }
            }
        ]
    }],

    count: [{                     
        type: "singleValue",
        name: "Conta quantas vezes o elemento aparece na coluna",
        compatibleInputNodes: {},
        inputFields: [
            {
                fieldName: "Nome da coluna",
                fieldType: "Textbox",
                inputType:
                {
                    type: "string",
                    parameters: {},
                }
            },
            {
                fieldName: "Valor a ser contado",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "any",
                    parameters: {},
                }
            },
        ]
    }],

    uniqueValues: [{                     
        type: "singleValue",
        name: "Conta quantos elementos únicos existem na coluna",
        compatibleInputNodes: {},
        inputFields: [
            {
                fieldName: "Nome da coluna",
                fieldType: "Textbox",
                inputType:
                {
                    type: "string",
                    parameters: {},
                }
            }
        ]
    }],
}