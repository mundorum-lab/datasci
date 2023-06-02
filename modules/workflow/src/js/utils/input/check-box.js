import { GenericInput } from "./generic-input.js";

class CheckBox extends GenericInput {
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
            <label for="${obj.name}" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">${obj.name}</label>
            <input type="checkbox" id="${obj.name}-${this._html_args["id"]}" name="${this._html_args["id"]}" value="${obj.value}" ${checked} role="checkbox" aria-checked="false" data-state="unchecked" class="accent-accent-foreground peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">
            `;
        }

        // return `<button type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on" class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" id="terms"></button>`
        return `<div class="" id="${this._html_args["id"]}">${partial}</div>`;
    }
}

export { CheckBox };
