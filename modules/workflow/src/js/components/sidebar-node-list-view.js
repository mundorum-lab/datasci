import { html, Oid, OidUI } from "../../../../../lib/oidlib-dev.js";

export class SidebarNodeListView extends OidUI {
    /*
    Represents the lists of nodes that will be in the sidebar
    */
    
    parseNodes() {
        const items = this.nodes.split(';');
        const parsedItems = items.map(item => {
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
        let template = `<li>
                            <!-- 44px -->
                        `;

        nodes = this.parseNodes()

        for (let node of this.nodes) {
            template += `<sidebar-node type=${node.type} name=${node.name} iconpath=${node.icon} ></>`;
        }

        template += `</li>`;
        return template;
    }
}

Oid.component(
    {
        id:'wf:sidebar-node-list',
        element:'sidebar-node-list',
        properties: {
            name: {},
            nodes: {}, //type1, name1, icon1 ; type2, name2, icon2 ...
        },
        implementation: SidebarNodeListView,
    }
)
