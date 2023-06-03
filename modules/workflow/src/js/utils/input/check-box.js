import { css, html, Oid, OidUI } from "/lib/oidlib-dev.js";
import { generate as uuid } from "short-uuid";

class CheckOid extends OidUI {

    _onInput(event) {
        const boxes = this.shadowRoot.querySelectorAll("input[type=checkbox]");
        const message = {};

        for (let box of boxes) {
            message[box.id] = box.checked;
        }
        // console.log(message);
        this._notify('update', {name: this.name, value: message});
    }

    template() {
        const replacedQuotes = this.values.replaceAll("'", '"');
        const valuesObj = JSON.parse(replacedQuotes);
        const uniqueID = uuid();
        
        let partial = "";
        let checked;

        for (let obj of valuesObj) {
            checked = obj["checked"] ? "checked" : "";
            partial += `
            <div class="flex items-center space-x-2">
                <input @click={{this._onInput}} id="${obj.name}" type="checkbox" name="${uniqueID}" value="${obj.value}" ${checked} role="checkbox" aria-checked="false" data-state="unchecked" class="accent-accent-foreground peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">
                <label for="${obj.name}" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">${obj.name}</label>
            </div>
            `;

        }


        return html`
        <label-oid class="w-full" text="{{this.label}}" for="${uniqueID}"></label-oid>
        <div class="grid gap-2">
            ${partial}
        </div>`;
    }
}

Oid.component(
    {
        id:'wf:check-oid',
        element:'check-oid',
        properties: {
            values: {default: null},
            label: {default: null},
            name: {default: null}
        },
        implementation: CheckOid,
        stylesheet: ['/style.css']
    }
)

export { CheckOid };