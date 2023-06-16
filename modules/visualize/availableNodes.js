export const availableNodes = {
    graphs: [
        {
            output: [
                {
                    type: ["graph/line"],
                    name: "Saída do gráfico", 
                    range: [1,1]
                }
            ],
            id: "visualize:line-plot",
            name: "line Chart",
            presentable: true,
            icon: "datasci/modules/transform/icons/filter.png",
            input: [
                {
                    type: ["json/table"], 
                    name: "Dados",
                    range: [1, 1]
                },
            ],
            fields: [
                {
                    name: "Título do Gráfico",
                    view: "TextBox",
                    parameters: {
                        maxLength: 20,
                        minLength: 5,
                        placeholder: "Insira o título aqui:"
                    }
                },
                {
                    name: "Eixo x (numérico ou categórico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y (númerico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
            ]
        },

        {
            output: [
                {
                    type: ["graph/area"],
                    name: "Saída do gráfico", 
                    range: [1,1]
                }
            ],
            id: "visualize:area-plot",
            name: "Area Chart",
            presentable: true,
            icon: "datasci/modules/transform/icons/filter.png",
            input: [
                {
                    type: ["json/table"], 
                    name: "Dados",
                    range: [1, 1]
                },
            ],
            fields: [
                {
                    name: "Título do Gráfico",
                    view: "TextBox",
                    parameters: {
                        maxLength: 20,
                        minLength: 5,
                        placeholder: "Insira o título aqui:"
                    }
                },
                {
                    name: "Eixo x (numérico ou categórico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
            ]
        },

        {
            output: [
                {
                    type: ["graph/scatter"],
                    name: "Saída do gráfico", 
                    range: [1,1]
                }
            ],
            id: "visualize:scatter-plot",
            name: "Scatter Chart",
            presentable: true,
            icon: "datasci/modules/transform/icons/filter.png",
            input: [
                {
                    type: ["json/table"], 
                    name: "Dados",
                    range: [1, 1]
                },
            ],
            fields: [
                {
                    name: "Título do Gráfico",
                    view: "TextBox",
                    parameters: {
                        maxLength: 20,
                        minLength: 5,
                        placeholder: "Insira o título aqui:"
                    }
                },
                {
                    name: "Eixo x (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
            ]
        },

        {
            output: [
                {
                    type: ["graph/bubble"],
                    name: "Saída do gráfico", 
                    range: [1,1]
                }
            ],
            id: "visualize:bubble-plot",
            name: "Bubble Chart",
            presentable: true,
            icon: "datasci/modules/transform/icons/filter.png",
            input: [
                {
                    type: ["json/table"], 
                    name: "Dados",
                    range: [1, 1]
                },
            ],
            fields: [
                {
                    name: "Título do Gráfico",
                    view: "TextBox",
                    parameters: {
                        maxLength: 20,
                        minLength: 5,
                        placeholder: "Insira o título aqui:"
                    }
                },
                {
                    name: "Eixo x (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Raio",
                    view: "Integer",
                    parameters: {
                        min: 1,
                        placeholder: "Tamanho",
                        value: 10,
                    }
                },
            ]
        },

        {
            output: [
                {
                    type: ["graph/bar"],
                    name: "Saída do gráfico", 
                    range: [1,1]
                }
            ],
            id: "visualize:bar-plot",
            name: "Bar Chart",
            presentable: true,
            icon: "datasci/modules/transform/icons/filter.png",
            input: [
                {
                    type: ["json/table"], 
                    name: "Dados",
                    range: [1, 1]
                },
            ],
            fields: [
                {
                    name: "Título do Gráfico",
                    view: "TextBox",
                    parameters: {
                        maxLength: 20,
                        minLength: 5,
                        placeholder: "Insira o título aqui:"
                    }
                },
                {
                    name: "Eixo x (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y (numérico ou categórico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
            ]
        },

        {
            output: [
                {
                    type: ["graph/column"],
                    name: "Saída do gráfico", 
                    range: [1,1]
                }
            ],
            id: "visualize:column-plot",
            name: "Column Chart",
            presentable: true,
            icon: "datasci/modules/transform/icons/filter.png",
            input: [
                {
                    type: ["json/table"], 
                    name: "Dados",
                    range: [1, 1]
                },
            ],
            fields: [
                {
                    name: "Título do Gráfico",
                    view: "TextBox",
                    parameters: {
                        maxLength: 20,
                        minLength: 5,
                        placeholder: "Insira o título aqui:"
                    }
                },
                {
                    name: "Eixo x (numérico ou categórico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
            ]
        },

        {
            output: [
                {
                    type: ["graph/pie"],
                    name: "Saída do gráfico", 
                    range: [1,1]
                }
            ],
            id: "visualize:pie-plot",
            name: "Pie Chart",
            presentable: true,
            icon: "datasci/modules/transform/icons/filter.png",
            input: [
                {
                    type: ["json/table"], 
                    name: "Dados",
                    range: [1, 1]
                },
            ],
            fields: [
                {
                    name: "Título do Gráfico",
                    view: "TextBox",
                    parameters: {
                        maxLength: 20,
                        minLength: 5,
                        placeholder: "Insira o título aqui:"
                    }
                },
                {
                    name: "Eixo x (numérico ou categórico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
            ]
        },

        {
            output: [
                {
                    type: ["graph/doughnut"],
                    name: "Saída do gráfico", 
                    range: [1,1]
                }
            ],
            id: "visualize:doughnut-plot",
            name: "Doughnut Chart",
            presentable: true,
            icon: "datasci/modules/transform/icons/filter.png",
            input: [
                {
                    type: ["json/table"], 
                    name: "Dados",
                    range: [1, 1]
                },
            ],
            fields: [
                {
                    name: "Título do Gráfico",
                    view: "TextBox",
                    parameters: {
                        maxLength: 20,
                        minLength: 5,
                        placeholder: "Insira o título aqui:"
                    }
                },
                {
                    name: "Eixo x (numérico ou categórico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
            ]
        },

        {
            output: [
                {
                    type: ["graph/polar-area"],
                    name: "Saída do gráfico", 
                    range: [1,1]
                }
            ],
            id: "visualize:polar-area-plot",
            name: "Polar Area Chart",
            presentable: true,
            icon: "datasci/modules/transform/icons/filter.png",
            input: [
                {
                    type: ["json/table"], 
                    name: "Dados",
                    range: [1, 1]
                },
            ],
            fields: [
                {
                    name: "Título do Gráfico",
                    view: "TextBox",
                    parameters: {
                        maxLength: 20,
                        minLength: 5,
                        placeholder: "Insira o título aqui:"
                    }
                },
                {
                    name: "Eixo x (numérico ou categórico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
            ]
        },

        {
            output: [
                {
                    type: ["graph/radar-area"],
                    name: "Saída do gráfico", 
                    range: [1,1]
                }
            ],
            id: "visualize:radar-area-plot",
            name: "Radar Area Chart",
            presentable: true,
            icon: "datasci/modules/transform/icons/filter.png",
            input: [
                {
                    type: ["json/table"], 
                    name: "Dados",
                    range: [1, 1]
                },
            ],
            fields: [
                {
                    name: "Título do Gráfico",
                    view: "TextBox",
                    parameters: {
                        maxLength: 20,
                        minLength: 5,
                        placeholder: "Insira o título aqui:"
                    }
                },
                {
                    name: "Eixo x (numérico ou categórico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
            ]
        },

        {
            output: [
                {
                    type: ["graph/linear-regression"],
                    name: "Saída do gráfico", 
                    range: [1,1]
                }
            ],
            id: "visualize:linear-regression-plot",
            name: "Linear Regression Plot",
            presentable: true,
            icon: "datasci/modules/transform/icons/filter.png",
            input: [
                {
                    type: ["json/table"], 
                    name: "Dados",
                    range: [1, 1]
                },
            ],
            fields: [
                {
                    name: "Título do Gráfico",
                    view: "TextBox",
                    parameters: {
                        maxLength: 20,
                        minLength: 5,
                        placeholder: "Insira o título aqui:"
                    }
                },
                {
                    name: "Eixo x (numérico ou categórico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y1 (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
                {
                    name: "Eixo y2 (numérico)",
                    view: "TextInput",
                    parameters: {
                        minLength: 1,
                        placeholder: "Nome da coluna",
                    }
                },
            ]
        },
    ],
}