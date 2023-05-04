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
        category1: [{
            type: "transform",
            name: "filter",
            compatibleInputNodes: {
                /*entrada0: {typeIds<[string]>, listRange<(int, int)>},
                entrada1: {typeIds<[string]>, listRange<(int, int)>},*/  
            },
            inputFields: [
                {
                    fieldName: "Operação",
                    fieldType: "Dropdown", 
                    inputType: 
                    {
                        type: "string",
                        parameters: {values:[">=",">","<","<=","="]},
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