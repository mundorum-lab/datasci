import { GenericInput } from "./generic-input.js";

class RadioButton extends GenericInput {
    render() {
        const agrs_str = this._parseArgs();

        let partial = "";
        let checked;
        
        for (let obj of this._config_params["values"]) {
            checked = obj["checked"] ? "checked" : "";
            partial += `
            <label for="${obj.name}">${obj.name}</label>
            <input type="radio" id="${obj.name}" name="${this._html_args["id"]}" value="${obj.value}" ${checked}>
            `;
        }

        return `<div class="">${partial}</div>`;
    }
}

export { RadioButton };
