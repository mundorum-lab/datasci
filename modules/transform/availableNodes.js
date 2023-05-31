export const availableNodes = {
    filter: [{
        output: [
            {
                type: ["json/table"], 
                range: [1,1]
            }
        ], //TODO: Better understanding of types
        id: "ts:filter",
        name: "Filtro",
        presentable: false,
        icon: "datasci/modules/transform/icons/filter.png",
        input: [
            {
                type: ["json/table"], 
                range: [1, 1]
            }
        ],
        fields: [
            {
                name: "Coluna",
                kind: "TextBox", 
                parameters: []    //TODO: Think about Parameters
            },
            {
                name: "Operação",
                kind: "",         //TODO think about possible values
                parameters: []  
            },
            {
                name: "Valor de Comparação",
                kind: "TextBox", 
                parameters: []    
            }
        ]
    }],

    groupby: [{
        output: [
            {
                type: ["json/table"], 
                range: [1,1]
            }
        ], 
        id: "ts:groupby",
        name: "Agrupar linhas",
        presentable: false,
        icon: "datasci/modules/transform/icons/groupby.png",
        input: [
            {
                type: ["json/table"], 
                range: [1, 1]
            }
        ],
        fields: [
            {
                name: "Operação",
                kind: "", 
                parameters: [] 
            },
            {
                name: "Coluna agrupada",
                kind: "TextBox", 
                parameters: []
            },
            {
                name: "Coluna Analisada",
                kind: "TextBox", 
                parameters: []
            },
            {
                name: "Nome da Coluna Resultante",
                kind: "TextBox", 
                parameters: []
            }
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
                    parameters: {}, 
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
                    parameters: {}, 
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
                    parameters: {}, 
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
                    parameters: {},
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

    columnOperation: [{                     
        type: "table/json",
        name: "Fazer operações entre colunas",
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
                    parameters: {values:["+", "-", "*", "/", "^"]}, //this parameters will change
                }
            },
            {
                fieldName: "Coluna 1",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string",
                    parameters: {},
                }
            },
            {
                fieldName: "Coluna 2",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string", 
                    parameters: {},
                }
            },
            {
                fieldName: "Nova coluna",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string", 
                    parameters: {},
                }
            },
        ]
    }],
    
    columnOperation: [{                     
        type: "table/json",
        name: "Fazer operações com uma colunas",
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
                    parameters: {values:["+", "-", "*", "/", "^", "log"]}, //this parameters will change
                }
            },
            {
                fieldName: "Coluna",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string",
                    parameters: {},
                }
            },
            {
                fieldName: "Constante",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "number", 
                    parameters: {},
                }
            },
            {
                fieldName: "Nova coluna",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string", 
                    parameters: {},
                }
            },
        ]
    }],
    deleteColumn: [{                     
        type: "table/json",
        name: "Deletar coluna",
        compatibleInputNodes: {
            /*entrada0: {typeIds<[string]>, listRange<(int, int)>}, //need to check with all groups the available IDs, this can change
            entrada1: {typeIds<[string]>, listRange<(int, int)>},*/  
        },
        inputFields: [
            {
                fieldName: "Coluna",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string",
                    parameters: {},
                }
            },
        ]
    }],
    orderBy: [{                     
        type: "table/json",
        name: "Ordenar",
        compatibleInputNodes: {
            /*entrada0: {typeIds<[string]>, listRange<(int, int)>}, //need to check with all groups the available IDs, this can change
            entrada1: {typeIds<[string]>, listRange<(int, int)>},*/  
        },
        inputFields: [
            {
                fieldName: "Coluna",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "string",
                    parameters: {},
                }
            },
            {
                fieldName: "Ordem",
                fieldType: "Dropdown", 
                inputType: 
                {
                    type: "boolean",
                    parameters: {values:["Crescente", "Decrescente"]},
                }
            },
        ]
    }],
}