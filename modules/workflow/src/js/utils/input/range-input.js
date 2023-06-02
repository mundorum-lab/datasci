import { GenericInput } from "./generic-input.js";

class RangeInput extends GenericInput {
    render() {
        const agrs_str = this._parseArgs();
        const config_params = this._parseConfig();

        return `${this._generateLabel()}<input type="range" ${agrs_str} ${config_params}><br>`;
    }
}

export { RangeInput };
