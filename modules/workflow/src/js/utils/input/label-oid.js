import { css, html, Oid, OidUI } from "/lib/oidlib-dev.js";

class LabelOid extends OidUI {

    template() {
        if (this.text == "undefined" || this.text == "")
            return html``;
            
        return html`
        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="{{this.for}}">{{this.text}}</label>
        `;
    }
}

Oid.component(
    {
        id:'wf:label-oid',
        element:'label-oid',
        properties: {
            text: {default: ""},
            for: {default: ""}
        },
        implementation: LabelOid,
        stylesheet: ['/style.css']
    }
)