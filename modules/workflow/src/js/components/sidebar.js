import { css, html, Oid, OidUI } from "../../../../../lib/oidlib-dev.js";


export class Sidebar extends OidUI {
    /*
    Representa a barra que conterá os nodes para o usuário arrastá-los para o canvas.
    
    */

}

Oid.component(
    {
        id:'wf:sidebar',
        element:'sidebar',
        properties: {
        },
        implementation: Sidebar,
        template: html`
        <div>
        </div>
        `,
    }
)
