import { css, html, Oid, OidUI } from "/lib/oidlib-dev.js";
import { generate as uuid } from "short-uuid";

class NumberOid extends OidUI {

    _onInput(event) {
        // console.log("notifying update - Value: " + event.target.value);
        this._notify('update', {name: this.name, value: event.target.value});
    }

    template() {
        const uniqueID = uuid();
        const max = this.max ? `max="${this.max}"` : "";
        const min = this.min ? `min="${this.min}"` : "";
        const placeholder = this.placeholder ? `placeholder="${this.placeholder}"` : "";
        const step = this.step ? `step="${this.step}"` : "";
        const value = this.value ? `value="${this.value}"` : "";

        return html`
        <label-oid class="w-full" text="{{this.label}}" for="${uniqueID}"></label-oid>
        <input @change={{this._onInput}} id=${uniqueID} type="number" ${max} ${min} ${this.placeholder} ${step} ${value} 
        class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        `;
    }
}

Oid.component(
    {
        id:'wf:number-oid',
        element:'number-oid',
        properties: {
            max: {default: null},
            min: {default: null},
            placeholder: {default: null},
            step: {default: null},
            value: {default: null},
            label: {default: null},
            name: {default: null}
        },
        implementation: NumberOid,
        stylesheet: ['/style.css']
    }
)

export { NumberOid };