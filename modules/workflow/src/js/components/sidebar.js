import { css, html, Oid, OidUI } from "../oidlib-dev.js";


export class Sidebar extends OidUI {
    /*
    Representa os nodes que estarão localizados no sidebar, para o usuário arrastá-los para o canvas.
    
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
