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

        if (!this.isOpen) {
            modal.showModal();
            this.isOpen = true;
        }

    }

    _onClose(event) {
        const modal = this.shadowRoot.querySelector(".node dialog");

        if (this.isOpen) {
            modal.close();
            this.isOpen = false;
        }
    }

    _onSubmit(event) {
        let formResponses = {};
        let complexValue;
        let formInput;

        event.preventDefault();

        for (let element of this.formListID) {
            formInput = this.shadowRoot.getElementById(element.id);

            if (element.view == "RadioButton" || element.view == "CheckBox") {
                complexValue = [];
                for (let child of formInput.children) {
                    if (child.tagName.toLowerCase() == 'label')
                        continue;
                    complexValue.push(
                        {id: child.id, value: child.value}
                    );
                }
                formResponses[element.name] = complexValue;
                continue;
            }

            formResponses[element.name] = formInput.value;
        }
        console.log(formResponses);
    }

    connectedCallback() {
        super.connectedCallback();
        this.nodeInfo = WorldSpaceNodeTypes.NodeInfoLib[this.name];
    }

    generate_modal() {
        let input, partial = "";
        this.formListID = [];
        
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
            const elementID = uuid();

            input = InputFactory.create(field.view, field.name, {id: [elementID]}, field.parameters);
            this.formListID.push({view: field.view, name: field.name, id: elementID});
            partial += `
            <div class="flex px-4 gap-2 content-center">
                ${input.render(field.name)}
            </div>`;
        }

        return partial;
    }

    template () {
        const modalContent = this.generate_modal();
        const formID = uuid();

        return html`
        <div class="node w-20 h-20 border-2 border-black bg-green-600 rounded-md" @dblclick={{this._onDoubleClick}} @dragstart={{this._onDragStart}} 
        @dragend={{this._onDragEnd}} draggable="true">
            <img src="./{{this.iconpath}}"alt="{{this.name}}">
            <dialog data-modal class="w-1/3 rounded-xl bg-background text-foreground border">
            <div class="flex flex-col gap-y-4 justify-center">
                <div class="flex items-center justify-between">
                    <div class="w-6">
                    </div>
                    <h2 class="text-2xl">Lorem Ipsum</h2>
                    <button @click={{this._onClose}} class="w-6 h-6 focus:ring-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                    </button>
                </div>
                <form @submit={{this._onSubmit}} action="" id="${formID}" class="flex flex-col gap-y-4">
                    ${modalContent}
                    <button type="submit" form="${formID}" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">Salvar</button>
                </form>
            </div>
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
