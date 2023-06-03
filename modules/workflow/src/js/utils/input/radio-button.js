import { css, html, Oid, OidUI } from "/lib/oidlib-dev.js";
import { generate as uuid } from "short-uuid";

class RadioOid extends OidUI {

    _onInput(event) {
        // console.log("notifying update - Value: " + event.target.value);
        this._notify('update', {name: this.name, value: event.target.value});
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
                <input @click={{this._onInput}} type="radio" id="${uniqueID}-${obj.name}" name="${uniqueID}" value="${obj.value}" ${checked} aria-checked="false" data-state="unchecked" class="accent-accent-foreground aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" tabindex="-1" data-radix-collection-item=""></button>
                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="${uniqueID}-${obj.name}">${obj.name}</label>
            </div>
            `;

        }

        return html`
            <label-oid class="w-full" text="{{this.label}}" for="${uniqueID}"></label-oid>
            <div role="radiogroup" aria-required="false" dir="ltr" class="grid gap-2" tabindex="0" style="outline: none;">
                ${partial}
            </div>
        `;
    }
}

Oid.component(
    {
        id:'wf:radio-oid',
        element:'radio-oid',
        properties: {
            values: {default: null},
            label: {default: null},
            name: {default: null}
        },
        implementation: RadioOid,
        stylesheet: ['/style.css']
    }
)

export { RadioOid };