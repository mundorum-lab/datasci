import { css, html, Oid, OidUI } from "../../../../../lib/oidlib-dev.js";
import { WorldSpaceNodeTypes } from "../world-space-node-types.js";
import { InputFactory } from "../utils/input/input-factory.js";
import { generate as uuid } from "short-uuid";


export class WorldSpaceNodeView extends OidUI {
    /*
    Representa os nodes que estarão localizados no espaço do workflow
    
    */

    _onDragStart(event) {
        const dt = event.dataTransfer;

        dt.effectAllowed = 'copy';
        dt.setData('text/html', this.outerHTML);
        dt.setData('text', event.target.id);
        this.style.opacity = '0.4';
    }

    _onDragEnd(event) {
        this.style.opacity = '1';
    }

    _onDoubleClick(event) {
        const modal = this.shadowRoot.querySelector(".node dialog");
        modal.showModal();
    }

    connectedCallback() {
        super.connectedCallback();
        this.nodeInfo = WorldSpaceNodeTypes.NodeInfoLib[this.name];
    }

    generate_modal() {
        let input, partial = "";
        
        const requiredInputs = [
            {
                name: "Lorem",
                view: "InputField",
                parameters: {}
            },
            {
                name: "Ipsum",
                view: "NumberField",
                parameters: {}
            },
            {
                name: "Dolor",
                view: "RadioButton",
                parameters: {
                    values: [
                        {name: "A", value: "A"},
                        {name: "B", value: "B"},
                        {name: "C", value: "C"}
                    ]
                }
            },
            {
                name: "Sit",
                view: "CheckBox",
                parameters: {
                    values: [
                        {name: "A", value: "A", checked: true},
                        {name: "B", value: "B", checked: true},
                        {name: "C", value: "C", checked: true}
                    ]
                }
            }
            ];
        
        for (let field of requiredInputs) {
            input = InputFactory.create(field.view, field.name, {id: [uuid()]}, field.parameters);
            partial += `
            <div class="flex w-1/3 px-4">
                ${input.render(field.name)}
            </div>`;
        }

        return partial;
    }

    template () {
        const modal_content = this.generate_modal();

        return html`
        <div class="node" @dblclick={{this._onDoubleClick}} @dragstart={{this._onDragStart}} 
        @dragend={{this._onDragEnd}} draggable="true">
            <img src="./{{this.iconpath}}"alt="{{this.name}}">
            <dialog data-modal>
                ${modal_content}
            </dialog>
        </div>
        `;
    }
}

Oid.component(
    {
        id:'wf:world-space-node',
        element:'world-space-node',
        properties: {
            type: {},
            name: {},
            compatibleInputNodes: {},
            inputFields: {},
            iconpath: {},
        },
        implementation: WorldSpaceNodeView,
        styles: css`
        .node {
            border: 1px solid black;
            border-radius: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 48px;
            height: 48px;
        }

        .node > img {
            width: 32px;
            height: 32px;'
        }
        `
    }
)
