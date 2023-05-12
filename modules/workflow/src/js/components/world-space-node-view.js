import { css, html, Oid, OidUI } from "../oidlib-dev.js";


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
        template: html`
        <div class="node" @dblclick={{this._onDoubleClick}}>
            <img 
            @dragstart={{this._onDragStart}} 
            @dragend={{this._onDragEnd}} 
            src="./{{this.iconpath}}"
            alt="{{this.name}}">
            <dialog data-modal>
                <span>Lorem Ipsum</span>
            </dialog>
        </div>
        `,
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
