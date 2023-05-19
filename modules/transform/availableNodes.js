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
                    parameters: {values:["+", "-", "*", "/", "^", "log"]}, //this parameters will change
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
                    type: "string", //pode ser null
                    parameters: {},
                }
            },
            {
                fieldName: "Constante",
                fieldType: "Textbox", 
                inputType: 
                {
                    type: "number", //pode ser null
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
}