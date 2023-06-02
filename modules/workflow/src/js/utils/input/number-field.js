import { GenericInput } from "./generic-input.js";

class NumberField extends GenericInput {
    render() {
        const agrs_str = this._parseArgs();

        return `${this._generateLabel()}<input type="number" ${agrs_str}><br>`;
    }
}

export { NumberField };
