import { html, Oid, OidUi } from "../oidlib-dev.js";


export class WorldSpaceNode extends OidUi {
    /*
    Representa os nodes que estarão localizados no espaço do workflow
    
    */

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
            iconPath: {},
        },
        implementation: WorldSpaceNode,
        template: html`
        <div>
        </div>
        `,
    }
)
