export const availableNodes = {
    filter: [{
        output: [
            {
                type: ["json/table"], 
                range: [1,2]
            }
        ],
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
                view: "TextInput", 
                parameters: []  
            },
            {
                name: "Operação",
                view: "DropDown",
                parameters: [ { options: [
                    {name: "maior que", value: "gt"},
                    {name: "maior ou igual que", value: "ge"},
                    {name: "menor que", value: "lt"},
                    {name: "menor ou igual que", value: "le"},
                    {name: "igual a", value: "eq"},
                    {name: "diferente de", value: "ne"},
                ]}]
            }
        ]
    }],

    groupby: [{
        output: [
            {
                type: ["json/table"], 
                range: [1,2]
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
                view: "DropDown", 
                parameters: [ { options: [
                    {name: "produto acumulativo", value: "cumProd"},
                    {name: "soma acumulativa" , value: "cumSum"},
                    {name: "media", value:"mean"},
                    {name: "desvio padrao", value: "std"},
                    {name: "soma", value: "sum"},
                    {name: "variância", value: "var"},
                    {name: "máximo acumulativo", value: "cumMax"},
                    {name: "mínimo acumulativo", value: "cumMin"},
                    {name: "máximo", value: "max"},
                    {name: "minimo", value: "min"},
                    {name: "contar", value: "count"}
        
                ]}] 
            },
            {
                name: "Coluna agrupada",
                kind: "TextInput", 
                parameters: []
            },
            {
                name: "Coluna Analisada",
                kind: "TextInput", 
                parameters: []
            },
            {
                name: "Nome da Coluna Analisada Resultante",
                kind: "TextInput", 
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
        output: [
            {
                type: ["json/singleValue"], 
                range: [1,1]
            }
        ],
        id: "ts:minimum",
        name: "Mínimo",
        presentable: false,
        icon: "datasci/modules/transform/icons/minimum.png",
        input: [
            {
                type: ["json/table"], 
                range: [1, 1]
            }
        ],
        fields: [
            {
                name: "Coluna",
                view: "TextInput", 
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da coluna",
                }]  
            },
        ]
    }],

    maximum: [{
        output: [
            {
                type: ["json/singleValue"], 
                range: [1,1]
            }
        ],
        id: "ts:maximum",
        name: "Máximo",
        presentable: false,
        icon: "datasci/modules/transform/icons/maximum.png",
        input: [
            {
                type: ["json/table"], 
                range: [1, 1]
            }
        ],
        fields: [
            {
                name: "Coluna",
                view: "TextInput", 
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da coluna",
                }]  
            },
        ]
    }],

    count: [{
        output: [
            {
                type: ["json/singleValue"], 
                range: [1,1]
            }
        ],
        id: "ts:count",
        name: "Contar",
        presentable: false,
        icon: "datasci/modules/transform/icons/count.png",
        input: [
            {
                type: ["json/table"], 
                range: [1, 1]
            }
        ],
        fields: [
            {
                name: "Coluna",
                view: "TextInput", 
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da coluna",
                }]  
            },
            {
                name: "Valor",
                view: "TextInput",
                parameters: [{
                    minLength: 1,
                    placeholder: "Valor a ser comparado"
                }]
            },
        ]
    }],

    unique: [{
        output: [
            {
                type: ["json/singleValue"], 
                range: [1,1]
            }
        ],
        id: "ts:unique",
        name: "Valores únicos",
        presentable: false,
        icon: "datasci/modules/transform/icons/unique.png",
        input: [
            {
                type: ["json/table"], 
                range: [1, 1]
            }
        ],
        fields: [
            {
                name: "Coluna",
                view: "TextInput", 
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da coluna",
                }]  
            },
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