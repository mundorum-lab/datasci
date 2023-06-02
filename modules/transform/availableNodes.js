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
        output: [
            {
                type: ["json/table"], 
                range: [1,2]
            }
        ],
        id: 'ts:transColumnOp',
        name: "Operação entre colunas",
        presentable: true,
        icon: "datasci/modules/transform/icons/columnOp.png",
        input: [
            {
                type: ["json/table"], 
                range: [1, 1]
            }
        ],
        fields: [
            {
                name: "Nova coluna",
                view: "TextInput", 
                parameters: []  
            },
            {
                name: "Coluna 1",
                view: "TextInput", 
                parameters: []  
            },
            {
                name: "Operação",
                view: "DropDown",
                parameters: [{ options: [
                    {name: "Soma", value: "+"},
                    {name: "Subtração", value: "-"},
                    {name: "Multiplicação", value: "*"},
                    {name: "Divisão", value: "/"},
                    {name: "Potência", value: "^"},
                ]}]
            },
            {
                name: "Coluna 2",
                view: "TextInput", 
                parameters: []  
            },
        ]
    }],

    columnOperationConstant: [{
        output: [
            {
                type: ["json/table"], 
                range: [1,2]
            }
        ],
        id: 'ts:transColumnOpConstant',
        name: "Operação entre coluna e constante",
        presentable: true,
        icon: "datasci/modules/transform/icons/columnOpConstant.png",
        input: [
            {
                type: ["json/table"], 
                range: [1, 1]
            }
        ],
        fields: [
            {
                name: "Nova coluna",
                view: "TextInput", 
                parameters: []  
            },
            {
                name: "Coluna",
                view: "TextInput", 
                parameters: []  
            },
            {
                name: "Operação",
                view: "DropDown",
                parameters: [{ options: [
                    {name: "Soma", value: "+"},
                    {name: "Subtração", value: "-"},
                    {name: "Multiplicação", value: "*"},
                    {name: "Divisão", value: "/"},
                    {name: "Potência", value: "^"},
                    {name: "Log", value: "log"},
                ]}]
            },
            {
                name: "Constante",
                view: "NumberField", 
                parameters: []  
            },
        ]
    }],

    deleteColumn: [{
        output: [
            {
                type: ["json/table"], 
                range: [1,2]
            }
        ],
        id: 'ts:transDeleteColumn',
        name: "Deletar coluna",
        presentable: true,
        icon: "datasci/modules/transform/icons/columnDelete.png",
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
        ]
    }],

    orderBy: [{
        output: [
            {
                type: ["json/table"], 
                range: [1,2]
            }
        ],
        id: 'ts:transOrderBy',
        name: "Ordenar",
        presentable: true,
        icon: "datasci/modules/transform/icons/columnDelete.png",
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
                name: "Order",
                view: "DropDown",
                parameters: [{ options: [
                    {name: "Crescente", value: "true"},
                    {name: "Decrescente", value: "false"},
                ]}]
            },

        ]
    }],

    zScoreNorm: [{
        output: [
            {
                type: ["json/table"], 
                range: [1,2]
            }
        ],
        id: 'ts:transNormalize',
        name: "Normalizar",
        presentable: true,
        icon: "datasci/modules/transform/icons/zscoreNorm.png",
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
        ]
    }],

}