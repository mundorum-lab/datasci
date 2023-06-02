import { GenericInput } from "./generic-input.js";

class InputField extends GenericInput {
    getIDs() {
        return [this._html_args["id"]];
    }
    
    render() {
        const agrs_str = this._parseArgs();
        const config_params = this._parseConfig();

        return `
        ${this._generateLabel()}
        <input type="text" ${agrs_str} ${config_params} class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        `;
    }
}

export { InputField };
