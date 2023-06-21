import { css, html, Oid, OidUI } from "/lib/oidlib-dev.js";
import { generate as uuid } from "short-uuid";

class DropDownOid extends OidUI {

    _onInput(event) {
        // console.log("notifying update - Value: " + event.target);
        this._notify('update', {name: this.name, value: event.target.value});
    }

    template() {
        const replacedQuotes = this.values.replaceAll("'", '"');
        const valuesObj = JSON.parse(replacedQuotes);
        const uniqueID = uuid();
        
        let selected, partial = "";

        for (let obj of valuesObj) {
            selected = obj["selected"] ? "selected" : "";
            partial += `
                <option class="text-sm text-accent-foreground font-medium" value="${obj.value}" ${selected}>${obj.name}</option>
            `;
        }

        return html`
        <label-oid class="w-full" text="{{this.label}}" for="${uniqueID}"></label-oid>
        <select @change={{this._onInput}} id="${uniqueID}" name="${this.name}" class="text-sm text-accent-foreground font-medium bg-background border border-border rounded-lg block w-full p-2.5">
            ${partial}
        </select>
        `;
    }
}

Oid.component(
    {
        id:'wf:dropdown-oid',
        element:'dropdown-oid',
        properties: {
            values: {default: null},
            label: {default: null},
            name: {default: null}
        },
        implementation: DropDownOid,
        stylesheet: ['/style.css']
    }
)

export { DropDownOid };