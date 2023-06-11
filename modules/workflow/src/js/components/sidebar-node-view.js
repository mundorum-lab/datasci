import { css, html, Oid, OidUI } from "../../../../../lib/oidlib-dev.js";


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
        
        dt.setData('text', this.type);
        dt.setData('text', this.name);
        dt.setData('text', this.iconpath);
        dt.setData('text', event.target.id);
        this.style.opacity = '0.4';
    }

    /**
     * Event handler for the drag end event.
     * @param {DragEvent} event - The drag end event object.
     */
    _onDragEnd(event) {
        this.style.opacity = '1';
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
        template: html`
        <div class="sidebar-node">
            <img 
            @dragstart={{this._onDragStart}}
            @dragend={{this._onDragEnd}}
            src="./{{this.iconpath}}"
            alt="{{this.name}}">
        </div>
        `
    }
)
