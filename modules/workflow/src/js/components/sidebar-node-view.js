import { html, Oid, OidUI } from "/lib/oidlib-dev.js";


export class SidebarNodeView extends OidUI {
    /*
    Representa os nodes na sidebar que podem ser arrastados
    */

    _onDragStart(event) {
        const dt = event.dataTransfer;
        
        dt.setData('text', this.type);
        dt.setData('text', this.name);
        dt.setData('text', this.iconpath);
        this.style.opacity = '0.4';
    }

    _onDragEnd(event) {
        this.style.opacity = '1';
    }
    
    template () {
        return html`
        <div
            draggable="true"
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
