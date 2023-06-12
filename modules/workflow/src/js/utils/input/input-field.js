import { css, html, Oid, OidUI } from "/lib/oidlib-dev.js";
import { generate as uuid } from "short-uuid";

class InputOid extends OidUI {

    _onInput(event) {
        // console.log("notifying update - Value: " + event.target.value);
        this._notify('update', {name: this.name, value: event.target.value});
    }

    template() {
        const uniqueID = uuid();
        const maxLength = this.maxLength ? `maxlength="${this.maxLength}"` : "";
        const minLength = this.minLength ? `minlength="${this.minLenght}"` : "";
        const pattern = this.pattern ? `pattern="${this.pattern}"` : "";
        const placeholder = this.placeholder ? `placeholder="${this.placeholder}"` : "";
        const value = this.value ? `value="${this.value}"` : "";

        return html`
        <label-oid class="w-full" text="{{this.label}}" for="${uniqueID}"></label-oid>
        <input @input={{this._onInput}} id="${uniqueID}" type="text" ${maxLength} ${minLength} ${pattern} ${placeholder} ${value}
        class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        `;
    }
}

Oid.component(
    {
        id:'wf:input-oid',
        element:'input-oid',
        properties: {
            'max-length': {default: null},
            'min-lenght': {default: null},
            list: {default: null},
            pattern: {default: null},
            placeholder: {default: null},
            value: {default: null},
            label: {default: null},
            name: {default: null}
        },
        implementation: InputOid,
        stylesheet: ['/style.css']
    }
)

export { InputOid };