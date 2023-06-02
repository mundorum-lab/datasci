import { GenericInput } from "./generic-input.js";

class NumberField extends GenericInput {
    getIDs() {
        return [this._html_args["id"]];
    }
    
    render() {
        const agrs_str = this._parseArgs();

        return `${this._generateLabel()}<input type="number" ${agrs_str}><br>`;
    }
}

export { NumberField };
