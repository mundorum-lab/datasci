import { css, html, Oid, OidUI } from "../oidlib-dev.js";


export class SidebarNodeView extends OidUI {
    /*
    Representa os nodes na sidebar que podem ser arrastados
    */

    _onDragStart(event) {
        const dt = event.dataTransfer;
        
        dt.setData('text', this.type);
        dt.setData('text', this.name);
        dt.setData('text', this.iconpath);
        dt.setData('text', event.target.id);
        this.style.opacity = '0.4';
    }

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
