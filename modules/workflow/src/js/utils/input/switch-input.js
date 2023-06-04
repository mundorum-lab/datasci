import { css, html, Oid, OidUI } from "/lib/oidlib-dev.js";
import { generate as uuid } from "short-uuid";

class SwitchOid extends OidUI {

    _onInput(event) {
        this._notify('update', {name: this.name, value: event.target.checked});
    }

    template() {
        const uniqueID = uuid();
        const name = this.name ? `name="${this.name}"` : "";

        return html`
        <label-oid class="w-full" text="{{this.label}}" for="${uniqueID}"></label-oid>
        <div class="w-full my-1">
            <label class="relative inline-flex items-center cursor-pointer">
                <input @click={{this._onInput}} type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-accent peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-foreground"></div>
            </label>
        </div>
        `;
    }
}

Oid.component(
    {
        id:'wf:switch-toggle-oid',
        element:'switch-toggle-oid',
        properties: {
            name: {default: null},
            label: {default: null}
        },
        implementation: SwitchOid,
        stylesheet: ['/style.css']
    }
)

export { SwitchOid };