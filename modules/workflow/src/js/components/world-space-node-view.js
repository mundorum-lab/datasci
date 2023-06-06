import { css, html, Oid, OidUI } from "../../../../../lib/oidlib-dev.js";
import { WorldSpaceNodeTypes } from "../world-space-node-types.js";
import { InputFactory } from "../utils/input/input-factory.js";


export class WorldSpaceNodeView extends OidUI {
    /**
     * Represents the nodes located in the workflow space.
     * @extends OidUI
     */

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
    _onDoubleClick(event) {
        const modal = this.shadowRoot.querySelector(".node dialog");
        modal.showModal();
    }

    connectedCallback() {
        super.connectedCallback();
        this.nodeInfo = WorldSpaceNodeTypes.NodeInfoLib[this.name];
    }

    /**
     * Generates the content for the modal.
     * @returns {string} The generated content.
     */
    generate_modal() {
        let input, partial = "";
        
        const requiredInputs = [
            {
                fieldName: "Lorem",
                inputTypeIdentifier: "InputField",
                inputTypeParameters: []
            },
            {
                fieldName: "Ipsum",
                inputTypeIdentifier: "NumberField",
                inputTypeParameters: []
            }
            ];
        
        for (let field of requiredInputs) {
            input = InputFactory.create(field.inputTypeIdentifier, {id: [field.fieldName]});
            partial += `
            <div class="flex w-1/3 px-4">
                ${input.render(field.fieldName)}
            </div>`;
        }

        return partial;
    }

    /**
     * Generates the visual template for the node view.
     * @returns {string} The generated html template.
     */
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
