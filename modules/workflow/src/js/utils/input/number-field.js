import { GenericInput } from "./generic-input.js";

class NumberField extends GenericInput {
    render(label = null) {
        const agrs_str = this._parseArgs();
        let label_tag = "";
        
        if (label != null) {
            label_tag = `<label for="${this._args["id"]}">${label}:</label>`;
        }

        return `${label_tag}<input type="number" ${agrs_str}><br>`;
    }
}

export { NumberField };
