import { Bus, css, html, Oid, OidUI } from "/lib/oidlib-dev.js";
import { OidInputFactory } from "../utils/input/oid-input-factory.js";
import { WorldSpaceNode } from "./world-space-node.js";
import { generate as uuid } from "short-uuid";


export class WorldSpaceNodeView extends OidUI {
    /**
     * Represents the nodes located in the workflow space.
     * @extends OidUI
     */

    /**
     * Handler for bus messages.
     * @param {object} topic - The topic of the message.
     * @param {object} message - The message.
     */
    handleUpdate(topic, message) {
        const name = message.name;
        const value = message.value;

        this.model.setInputField(name, value);
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
        this.node = event.composedPath().find((element) => element instanceof WorldSpaceNodeView);
        this.node.setAttribute('dontScroll', 'true');

    }

    /**
     * Event handler for the cancel event.
     * @param {Event} event - The cancel event object.
     */
    _onCancel(event) {
        this.isOpen = false;
        this.node = event.composedPath().find((element) => element instanceof WorldSpaceNodeView);
        this.node.removeAttribute('dontScroll');
    }

    /**
     * Event handler for the close button event.
     * @param {Event} event - The click event object.
     */
    _onClose(event) {
        const modal = this.shadowRoot.querySelector("dialog");

        if (this.isOpen) {
            modal.close();
            this.isOpen = false;
        }
        this.node = event.composedPath().find((element) => element instanceof WorldSpaceNodeView);
        this.node.removeAttribute('dontScroll');
    }

    connectedCallback() {
        super.connectedCallback();

        // Simulates subscribe="input/changed~${this.id}"
        // We can assume that the inputs inside dialog will
        // always publish in the correct category
        Bus.i.subscribe(`input/changed/${this.id}`, this.handleUpdate.bind(this));

        // Gets Node Info from Library
        const getNodeInfo = () => { return this._invoke("itf:component-provider", "getComponentInfo", {value: this.type}).then(success, fail) };
        const success = (value) => {
            
            if (value != null) {
                this.nodeInfo = value[0];
                this.fields = this.nodeInfo.fields;
                this.model = new WorldSpaceNode(this.type, this.name, this.nodeInfo);
            }
            else {
                setTimeout(getNodeInfo, 1200);
            }
        }
        const fail = (reason) => { console.log(reason); }

        getNodeInfo();
    }
      
    /**
     * Generates the content for the modal.
     * @returns {string} The generated content.
     */
    generateModal() {
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

    /**
     * Generates a node's input/output ports.
     * @returns {string} The generated content.
     */
    generatePorts(direction, requiredPorts) {
        const portElement = direction == "output" ? '<div @mousedown={{this._onMouseDownHandle}} class="w-3 h-4 box-border border-ring border-2 border-r-0 rounded-l-lg relative right-0"></div>' : '<div @mousedown={{this._onMouseDownHandle}} class="w-3 h-4 box-border border-ring border-2 border-l-0 rounded-r-lg relative left-0"></div>'
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
            for (let type of port.type) {
                type.split("/").forEach((item, pos) => {
                    crumbColector.push(breadcrumbPiece(item, pos));
                });
                partial += `
                <div class="flex w-full py-3 gap-x-2 text-primary border-b border-accent ${direction == "output" ? "flex-row-reverse" : "flex-row"}">
                    ${portElement}
                    <ol class="h-4 w-full inline-flex items-center space-x-0 ${direction == "output" ? "justify-end" : "justify-start"}">
                        ${crumbColector.join("")}
                    </ol>
                </div>`;
            }
        }

        return partial;
    }

    _onMouseDown(event){
        this.node = event.composedPath().find((element) => element instanceof WorldSpaceNodeView);
        this.node.setAttribute('moving', 'true');
      }

    _onMouseDownHandle(event){
        this.node = event.composedPath().find((element) => element instanceof WorldSpaceNodeView);
        this.node.setAttribute('dontMove', 'true');
      }

    /**
     * Event handler for clicking the delete button
     */
    _onDeleteNode() {
        this.model.Destroy();
        this.node.remove();
    }

     /**
     * Generates a loading skeleton for the node
     * @returns {string} The generated content.
     */
    renderLoading() {
        return html`
        <div class="w-72 h-72 border bg-primary-foreground rounded-md flex flex-col items-center" role="status">
            <div class="flex items-center w-full h-8 p-2 border-b border-border">
                <div class="h-2 bg-border rounded-full w-48"></div>
            </div>
            <div class="flex flex-col w-full h-full items-center justify-center">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-background animate-spin fill-border" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
        </div>
        `;
    }

    /**
     * Generates a the node
     * @returns {string} The generated content.
     */
    renderNode() {
        const modalContent = this.generateModal();
        const outputPorts = this.generatePorts("output", this.nodeInfo.output);
        const inputPorts = this.generatePorts("input", this.nodeInfo.input);
        const title = this.nodeInfo.name;
        const icon = this.nodeInfo.icon;
        const formID = uuid();

        return html`
        <div @mousedown={{this._onMouseDown}} class="w-72 h-fit border bg-primary-foreground rounded-md flex flex-col items-start justify-start" @dblclick={{this._onOpenConfig}}>
            <div class="flex justify-between px-2 py-1 content-center w-full border-b">
                <div class="flex justify-center items-center w-fit h-full gap-2">
                    <img src="${icon}" alt="{{this.name}}" class="pointer-events-none object-fill max-w-8 max-h-8">
                    <span class="text-md text-primary font-medium">${title}</span>
                </div>
                <div class="flex justify-around gap-2">
                    <button @click={{this._onOpenConfig}} class="w-10 h-10 p-2 rounded-md border border-input hover:bg-accent hover:text-accent-foreground transitions-color">
                        <svg class="object-fill stroke-0 stroke-primary" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                            </path>
                        </svg>
                    </button>
                    <button @click={{this._onDeleteNode}} class="w-10 h-10 p-2 rounded-md border border-input hover:bg-accent hover:text-accent-foreground transitions-color">
                        <svg class="object-fill stroke-0 stroke-primary -primary" viewBox="0 0 12 12" fill="none" version="1.1 xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" y1="11" x2="11" y2="1" class="stroke-primary fill-none" stroke-width="1"/>
                            <line x1="1" y1="1" x2="11" y2="11" class="stroke-primary fill-none" stroke-width="1"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div id="inputs" class="w-full">
                ${inputPorts}
            </div>

            <div id="outputs" class="w-full">
                ${outputPorts}
            </div>
            
            <dialog @mousedown={{this._onMouseDownHandle}} data-modal @cancel={{this._onCancel}} class="w-1/3 rounded-xl bg-background text-foreground border">
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
                </div>
            </div>
            </dialog>
        </div>
        `;
    }

    /**
     * Generates the visual template for the node view.
     * @returns {string} The generated html template.
     */
    template () {

        if (this.nodeInfo != null)
            return this.renderNode();
        return this.renderLoading();

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
            type: {},
            name: {},
            presentable: {},
            icon: {},
            fields: {}
        },
        implementation: WorldSpaceNodeView,
        stylesheet: ['/style.css'],
        receive: ['update'],
    }
)
