import { css, html, Oid, OidUI } from "/lib/oidlib-dev.js";
import { generate as uuid } from "short-uuid";

class RangeOid extends OidUI {

    _onInput(event) {
        // console.log("notifying update - Value: " + event.target.value);
        this._notify('update', {name: this.name, value: event.target.value});
    }

    template() {
        const uniqueID = uuid();
        const max = this.max ? `max="${this.max}"` : "";
        const min = this.min ? `min="${this.min}"` : "";
        const step = this.step ? `step="${this.step}"` : "";
        const value = this.value ? `value="${this.value}"` : "";

        return html`
        <label-oid class="w-full" text="{{this.label}}" for="${uniqueID}"></label-oid>
        <input @change={{this._onInput}} type="range" ${max} ${min} ${step} ${value} 
        class="w-full h-2 bg-foreground accent-accent-foreground rounded-lg cursor-pointer bg-accent">
        `;
    }
}

Oid.component(
    {
        id:'wf:range-oid',
        element:'range-oid',
        properties: {
            max: {default: null},
            min: {default: null},
            step: {default: null},
            value: {default: null},
            label: {default: null},
            name: {default: null}
        },
        implementation: RangeOid,
        stylesheet: ['/style.css']
    }
)

export { RangeOid };