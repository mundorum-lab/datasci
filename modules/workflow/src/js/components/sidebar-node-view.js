import { html, Oid, OidUI } from "/lib/oidlib-dev.js";


export class SidebarNodeView extends OidUI {
    /**
     * Represents the nodes on the sidebar that can be dragged.
     * @extends OidUI
     */

    /**
     * Event handler for the drag start event.
     * @param {DragEvent} event - The drag start event object.
     */
    _onDragStart(event) {
        const dt = event.dataTransfer;

        let object = {name: this.name, type: this.type, icon: this.iconpath}
        
        dt.setData('text', JSON.stringify(object));
        this.style.opacity = '0.4';
    }

    /**
     * Event handler for the drag end event.
     * @param {DragEvent} event - The drag end event object.
     */
    _onDragEnd(event) {
        this.style.opacity = '1';
    }
    
    template () {
        return html`
        <div
            draggable="true"
            @dragstart={{this._onDragStart}}
            @dragend={{this._onDragEnd}}
            href="#"
            class="bg-background flex w-full h-8 justify-between items-center border rounded-md py-1.5 px-1.5 text-sm leading-6 text-primary"
        >
            <div class="flex gap-1 w-28 h-fill">
                <img src={{this.iconpath}} alt={{this.name}} class="w-6 h-6">
                <span class="w-fill h-6">{{this.name}}</span>
            </div>
            <div class="text-gray-400 w-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
        </div>
        `;
    }
}

Oid.component(
    {
        id:'wf:sidebar-node',
        element:'sidebar-node',
        properties: {
            type: {},
            name: {},
            iconpath: {},
        },
        implementation: SidebarNodeView,
        stylesheet: ["/style.css"],
    }
)
