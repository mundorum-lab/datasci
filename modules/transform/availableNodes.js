export const availableNodes = {default: {
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
}}