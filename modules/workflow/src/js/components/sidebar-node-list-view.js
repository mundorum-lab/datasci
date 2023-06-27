import { html, Oid, OidUI } from "/lib/oidlib-dev.js";

export class SidebarNodeListView extends OidUI {
    /** Represents the lists of nodes that will be in the sidebar
     * @extends OidUI
    */
    
    _onClick(event) {
        let me = event.composedPath().find((x) => x.tagName == "BUTTON")
        if (me.children["chevron"].classList.contains("rotate-90")) {
          me.children["chevron"].classList.remove("rotate-90");
          me.nextElementSibling.classList.add("hidden");
        } else {
          me.children["chevron"].classList.add("rotate-90");
          me.nextElementSibling.classList.remove("hidden");
        }
      }

    /**
     * Given that nodes is in the "type1, name1, icon1 ; type2, name2, icon2..." format, parses it
     * @returns {Array.<Object>} - An array of objects with the type, name and icon fields
     */
    parseNodes() {
        if (this.nodes == null) return [];

        const items = this.nodes.split(';');
        const parsedItems = items.filter(item => item != ' ').map(item => {
            const [type, name, icon] = item.trim().split(',');
            return {
                type: type.trim(),
                name: name.trim(),
                icon: icon.trim(),
            };
        });

        return parsedItems;
    }
    
    template () {
        let template = ``;

        let parsedNodes = this.parseNodes();

        for (let node of parsedNodes) {
            template += `<li> <sidebar-node type="${node.type}" name="${node.name}" iconpath="${node.icon}" > </li>`;
        }

        return html`
        <div class="w-full">
            <button
                type="button"
                @click="{{this._onClick}}"
                class="hover:bg-background flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-primary"
                aria-controls="sub-menu-1"
                aria-expanded="false"
            >
            <div class="text-gray-400 w-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 stroke-primary"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                </svg>
            </div>
                <span class="w-28">${this.name}</span>
                <svg
                    id="chevron"
                    class="text-gray-400 ml-auto h-5 w-5 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
            <ul class="hidden mt-1 px-2 space-y-1">
                ${template}
            </ul>
        </div>`;
    }
}

Oid.component(
    {
        id:'wf:sidebar-node-list',
        element:'sidebar-node-list',
        properties: {
            name: {default: null},
            nodes: {default: null}, //type1, name1, icon1 ; type2, name2, icon2 ...
        },
        implementation: SidebarNodeListView,
        stylesheet: ["/style.css"],
    }
)
