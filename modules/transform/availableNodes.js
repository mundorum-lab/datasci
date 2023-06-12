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
        presentable: true,
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
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da coluna",
                }]  
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
        presentable: true,
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
        output: [
            {
                type: ["json/singleValue"], 
                range: [1,1]
            }
        ],
        id: "ts:mean",
        name: "Média",
        presentable: true,
        icon: "datasci/modules/transform/icons/average.png",
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

    median: [{
        output: [
            {
                type: ["json/singleValue"], 
                range: [1,1]
            }
        ],
        id: "ts:median",
        name: "Mediana",
        presentable: true,
        icon: "datasci/modules/transform/icons/median.png",
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

    mode: [{
        output: [
            {
                type: ["json/singleValue"], 
                range: [1,1]
            }
        ],
        id: "ts:mode",
        name: "Moda",
        presentable: true,
        icon: "datasci/modules/transform/icons/mode.png",
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

    stddev: [{
        output: [
            {
                type: ["json/singleValue"], 
                range: [1,1]
            }
        ],
        id: "ts:stddev",
        name: "Desvio padrão",
        presentable: true,
        icon: "datasci/modules/transform/icons/stddev.png",
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


    minimum: [{
        output: [
            {
                type: ["json/singleValue"], 
                range: [1,1]
            }
        ],
        id: "ts:minimum",
        name: "Mínimo",
        presentable: true,
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
        presentable: true,
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
        presentable: true,
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
        presentable: true,
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
        id: 'ts:columnOp',
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
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da coluna resultante",
                }]  
            },
            {
                name: "Coluna 1",
                view: "TextInput", 
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da primeira coluna",
                }]  
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
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da segunda coluna",
                }]  
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
        id: 'ts:columnOpConstant',
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
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da coluna resultante",
                }]  
            },
            {
                name: "Coluna",
                view: "TextInput", 
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da coluna",
                }]  
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
        id: 'ts:deleteColumn',
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
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da coluna",
                }]  
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
        id: 'ts:orderby',
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
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da coluna",
                }]  
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
        id: 'ts:normalize',
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
                parameters: [{
                    minLength: 1,
                    placeholder: "Nome da coluna",
                }]  
            },
        ]
    }],

    alias: [{
        output: [
            {
                type: ["json/table"], 
                range: [1,2]
            }
        ],
        id: 'ts:transAlias',
        name: "Renomear coluna",
        presentable: true,
        icon: "datasci/modules/transform/icons/alias.png",
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
                name: "Novo nome",
                view: "TextInput", 
                parameters: [{
                    minLength: 1,
                    placeholder: "Novo nome da coluna",
                }]  
            },
        ]
    }],

}