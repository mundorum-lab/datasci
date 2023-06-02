import { GenericInput } from "./generic-input.js";

class RangeInput extends GenericInput {
    getIDs() {
        return [this._html_args["id"]];
    }

    render() {
        const agrs_str = this._parseArgs();
        const config_params = this._parseConfig();

        return `
        ${this._generateLabel()}
        <input ${agrs_str} ${config_params} type="range" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer bg-primary">
        `;
    }
}

export { RangeInput };
