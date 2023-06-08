import { Bus, css, html, Oid, OidUI } from "../../../../../lib/oidlib-dev.js";
import { WorldSpaceNodeTypes } from "../world-space-node-types.js";
import { InputOid } from "../utils/input/input-field.js";
import { NumberOid } from "../utils/input/number-field.js";
import { RangeOid } from "../utils/input/range-input.js";
import { RadioOid } from "../utils/input/radio-button.js";
import { CheckOid } from "../utils/input/check-box.js";
import { SwitchOid } from "../utils/input/switch-input.js";
import { DropDownOid } from "../utils/input/dropdown-input.js";
import { OidInputFactory } from "../utils/input/oid-input-factory.js";
import { generate as uuid } from "short-uuid";


export class WorldSpaceNodeView extends OidUI {
    /**
     * Represents the nodes located in the workflow space.
     * @extends OidUI
     */

    // Must be arrow function so object context is not lost
    handleUpdate = (topic, message) => {
        console.log("Received an update: ", message);
    }
    
    /**
     * Event handler for the drag start event.
     * @param {DragEvent} event - The dragstart event object.
     */
    _onDragStart(event) {
        const dt = event.dataTransfer;

        dt.effectAllowed = 'copy';
        dt.setData('text/html', this.outerHTML);
        dt.setData('text', event.target.id);
        this.style.opacity = '0.4';
    }

    /**
     * Event handler for the drag end event.
     * @param {DragEvent} event - The dragend event object.
     */
    _onDragEnd(event) {
        this.style.opacity = '1';
    }

    /**
     * Event handler for the double click event.
     * @param {MouseEvent} event - The double click event object.
     */
    _onOpenConfig(event) {
        const modal = this.shadowRoot.querySelector("dialog");

        if (!this.isOpen) {
            modal.showModal();
            this.isOpen = true;
        }

    }

    _onCancel(event) {
        this.isOpen = false;
    }

    _onClose(event) {
        const modal = this.shadowRoot.querySelector("dialog");

        if (this.isOpen) {
            modal.close();
            this.isOpen = false;
        }
    }

    connectedCallback() {
        super.connectedCallback();

        // Simulates subscribe="input/changed~${this.id}"
        // We can assume that the inputs inside dialog will
        // always publish in the correct category
        Bus.i.subscribe(`input/changed/${this.id}`, this.handleUpdate);

        // Gets Node Info from Library
        // this.nodeInfo = WorldSpaceNodeTypes.NodeInfoLib[this.name];
        // Stub for testing:
        this.nodeInfo = {
            "output": [
                {"type": "input/database", "name": "Saída dos dados", "range": [1, 5]},
                {"type": "input/sql", "name": "Saída dos dados", "range": [1, 5]}
            ],
            "input": [
                {"type": "input/database", "name": "Saída dos dados", "range": [1, 5]},
                {"type": "input/sql", "name": "Saída dos dados", "range": [1, 5]}
            ],
            "id": "data:database",
            "name": "Database",
            "presentable": false,
            "icon": "modules/workflow/src/assets/templateselection.png",
            "fields": [{
                "name": "URL",
                "label": "URL da Database",
                "view": "InputField",
                "parameters": {
                    "maxLength": 10
                    }
                }]
        }
        this.fields = this.nodeInfo.fields;
    }
      
    /**
     * Generates the content for the modal.
     * @returns {string} The generated content.
     */
    generate_modal() {
        const requiredInputs = this.fields;
        let input, partial = "";
        this.formListID = [];
        
        
        for (let field of requiredInputs) {
            const elementID = uuid();
            
            partial += `
            <div class="flex px-4 gap-2 content-center">
                ${OidInputFactory.createView(field.view, this.id, {name: field.name, label: field.label, ...field.parameters})}
            </div>
            `;
        }

        return partial;
    }

    generatePorts(direction, requiredPorts) {
        const portElement = direction == "output" ? '<div class="w-3 h-4 box-border border-ring border-2 border-r-0 rounded-l-lg relative left-full"></div>' : '<div class="w-3 h-4 box-border border-ring border-2 border-l-0 rounded-r-lg relative left-0"></div>'
        const breadcrumbPiece = (content, pos) => {
            const separator = pos == 0 ? '' : '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>';
            
            return `
            <li>
                <div class="flex items-center space-x-0">
                    ${separator}
                    <span class="ml-1 text-sm font-medium text-primary">${content}</span>
                </div>
            </li>
            `;
        }

        let partial = "", crumbColector;
        for (let port of requiredPorts) {
            crumbColector = [];
            port.type.split("/").forEach((item, pos) => {
                crumbColector.push(breadcrumbPiece(item, pos));
            });
            partial += `
            <div class="flex w-full pr-3 py-3 gap-x-2 text-primary border-b border-accent">
                ${portElement}
                <ol class="h-4 inline-flex items-center space-x-0">
                    ${crumbColector.join("")}
                </ol>
            </div>`;
        }

        return partial;
    }

    /**
     * Generates the visual template for the node view.
     * @returns {string} The generated html template.
     */
    template () {
        const modalContent = this.nodeInfo != null ? this.generateModal() : "";
        const outputPorts = this.nodeInfo != null ? this.generatePorts("output", this.nodeInfo.output) : "";
        const inputPorts = this.nodeInfo != null ? this.generatePorts("input", this.nodeInfo.input) : "";
        const title = this.nodeInfo != null ? this.nodeInfo.name : "";
        const icon = this.nodeInfo != null ? this.nodeInfo.icon : "";
        const formID = uuid();

        return html`
        <div class="node w-72 h-fit border bg-primary-foreground rounded-md flex flex-col items-start justify-start" @dblclick={{this._onOpenConfig}} @dragstart={{this._onDragStart}} 
        @dragend={{this._onDragEnd}} draggable="true">
            <div class="flex justify-between px-2 py-1 content-center w-full border-b">
                <div class="flex justify-center items-center w-fit h-full gap-2">
                    <img src="${icon}" alt="{{this.name}}" class="object-fill max-w-8 max-h-8">
                    <span class="text-md text-primary font-medium">${title}</span>
                </div>
                <button @click={{this._onOpenConfig}} class="w-10 h-10 p-2 rounded-md border border-input hover:bg-accent hover:text-accent-foreground transitions-color">
                    <svg class="object-fill stroke-0 stroke-primary" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                        </path>
                    </svg>
                </button>
            </div>

            <div id="inputs" class="w-full">
                ${inputPorts}
            </div>

            <div id="outputs" class="w-full">
                ${outputPorts}
            </div>
            
            <dialog data-modal @cancel={{this._onCancel}} class="w-1/3 rounded-xl bg-background text-foreground border">
            <div class="flex flex-col gap-y-4 justify-center">
                <div class="flex items-center justify-between">
                    <div class="w-6">
                    </div>
                    <h2 class="text-2xl">${title}</h2>
                    <button @click={{this._onClose}} class="w-6 h-6 focus:ring-2 focus:ring-ring">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                    </button>
                </div>
                <div class="flex flex-col gap-y-4">
                    ${modalContent}
                    <button type="submit" form="${formID}" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">Salvar</button>
                </div>
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
            output: {},
            input: {},
            id: {},
            name: {},
            presentable: {},
            icon: {},
            fields: {}
        },
        implementation: WorldSpaceNodeView,
        stylesheet: ['../../../../../style.css'],
        receive: ['update'],
    }
)
