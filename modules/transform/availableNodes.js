[
    {
        output: [
            {
                type: ["json/table"], 
                name: "saída",
                range: [1,2]
            }
        ],
        type: "ts:filter",
        name: "Filtro",
        presentable: true,
        icon: "datasci/modules/transform/icons/filter.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/table"], 
                name: "saida",
                range: [1,2]
            }
        ], 
        type: "ts:groupby",
        name: "Agrupar linhas",
        presentable: true,
        icon: "datasci/modules/transform/icons/groupby.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/singleValue"], 
                name: "saida",
                range: [1,1]
            }
        ],
        type: "ts:mean",
        name: "Média",
        presentable: true,
        icon: "datasci/modules/transform/icons/average.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/singleValue"], 
                name: "saida",
                range: [1,1]
            }
        ],
        type: "ts:median",
        name: "Mediana",
        presentable: true,
        icon: "datasci/modules/transform/icons/median.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/singleValue"], 
                name: "saida",
                range: [1,1]
            }
        ],
        type: "ts:mode",
        name: "Moda",
        presentable: true,
        icon: "datasci/modules/transform/icons/mode.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/singleValue"], 
                name: "saida",
                range: [1,1]
            }
        ],
        type: "ts:stddev",
        name: "Desvio padrão",
        presentable: true,
        icon: "datasci/modules/transform/icons/stddev.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },


    {
        output: [
            {
                type: ["json/singleValue"], 
                name: "saida",
                range: [1,1]
            }
        ],
        type: "ts:minimum",
        name: "Mínimo",
        presentable: true,
        icon: "datasci/modules/transform/icons/minimum.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/singleValue"], 
                name: "saida",
                range: [1,1]
            }
        ],
        type: "ts:maximum",
        name: "Máximo",
        presentable: true,
        icon: "datasci/modules/transform/icons/maximum.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/singleValue"], 
                name: "saida",
                range: [1,1]
            }
        ],
        type: "ts:count",
        name: "Contar",
        presentable: true,
        icon: "datasci/modules/transform/icons/count.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/singleValue"], 
                name: "saida",
                range: [1,1]
            }
        ],
        type: "ts:unique",
        name: "Valores únicos",
        presentable: true,
        icon: "datasci/modules/transform/icons/unique.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/table"], 
                name: "saida",
                range: [1,2]
            }
        ],
        type: 'ts:columnOp',
        name: "Operação entre colunas",
        presentable: true,
        icon: "datasci/modules/transform/icons/columnOp.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/table"], 
                name: "saida",
                range: [1,2]
            }
        ],
        type: 'ts:columnOpConstant',
        name: "Operação entre coluna e constante",
        presentable: true,
        icon: "datasci/modules/transform/icons/columnOpConstant.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/table"], 
                name: "saida",
                range: [1,2]
            }
        ],
        type: 'ts:deleteColumn',
        name: "Deletar coluna",
        presentable: true,
        icon: "datasci/modules/transform/icons/columnDelete.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/table"], 
                name: "saida",
                range: [1,2]
            }
        ],
        type: 'ts:orderby',
        name: "Ordenar",
        presentable: true,
        icon: "datasci/modules/transform/icons/columnDelete.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/table"], 
                name: "saida",
                range: [1,2]
            }
        ],
        type: 'ts:normalize',
        name: "Normalizar",
        presentable: true,
        icon: "datasci/modules/transform/icons/zscoreNorm.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

    {
        output: [
            {
                type: ["json/table"], 
                name: "saida",
                range: [1,2]
            }
        ],
        type: 'ts:transAlias',
        name: "Renomear coluna",
        presentable: true,
        icon: "datasci/modules/transform/icons/alias.png",
        input: [
            {
                type: ["json/table"], 
                name: "entrada",
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
    },

]