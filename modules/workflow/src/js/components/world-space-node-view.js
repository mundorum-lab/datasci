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

    _onClose(event) {
        const modal = this.shadowRoot.querySelector(".node dialog");
        modal.close();
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
            },
            {
                name: "Amet",
                view: "RangeInput",
                parameters: {
                    max: "100",
                    min: "0",
                    value: "20",
                    step: "10"
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
        <div class="node w-20 h-20 border-2 border-black bg-green-600 rounded-md" @dblclick={{this._onDoubleClick}} @dragstart={{this._onDragStart}} 
        @dragend={{this._onDragEnd}} draggable="true">
            <img src="./{{this.iconpath}}"alt="{{this.name}}">
            <dialog data-modal class="w-1/3 h-2/3 rounded-xl">
                <button @click={{this._onClose}} class="w-12 h-12 float-right focus:ring-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                </button>
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
        stylesheet: ['../../../../../style.css'],
        styles: css`
            .node { /* */ }
        `
    }
)
