import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

export class TransformNodesOid extends OidUI {
    handleNodes(topic, message){
        this._notify('publishNodes', this.nodes)
    }
}

Oid.component(
{
  id: 'ts:transNodes',
  element: 'filter',
  properties: {
    availableNodes: {default: {
        filter: [{                         //is category the same as type?
            type: "filter",
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
                        type: "string",  //could be any, but we can convert str to number
                        parameters: {},
                    }
                },
            ]
        }],
    }},
    name: {default: "Templates"},
    type: {default: "Transformação"},
  },
  receive: {sendNodes: 'handleNodes'},
  /*template: html``,*/
  implementation: TransformNodesOid
})