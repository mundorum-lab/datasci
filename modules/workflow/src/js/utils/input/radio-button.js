import { GenericInput } from "./generic-input.js";

class RadioButton extends GenericInput {
    getIDs() {
        const ids = [];

        for (let obj of this._config_params["values"]) {
            ids.push(`${obj.name}-${this._html_args["id"]}`);
        }

        return ids;
    }

    render() {
        const agrs_str = this._parseArgs();

        let partial = "";
        let checked;
        
        for (let obj of this._config_params["values"]) {
            checked = obj["checked"] ? "checked" : "";
            partial += `
            <div class="flex items-center space-x-2">
                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" or="${obj.name}">${obj.name}</label>
                <input type="radio" id="${obj.name}-${this._html_args["id"]}" name="${this._html_args["id"]}" value="${obj.value}" ${checked} aria-checked="false" data-state="unchecked" class="accent-accent-foreground aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="r1" tabindex="-1" data-radix-collection-item=""></button>
            </div>
            `;
        }
        
        return `
            <div role="radiogroup" aria-required="false" dir="ltr" class="grid gap-2" tabindex="0" style="outline: none;">
                ${partial}
            </div>
        `;
    }
}

export { RadioButton };
