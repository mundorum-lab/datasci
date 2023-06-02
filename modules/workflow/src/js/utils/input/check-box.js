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
            <label for="${obj.name}">${obj.name}</label>
            <input type="checkbox" id="${obj.name}-${this._html_args["id"]}" name="${this._html_args["id"]}" value="${obj.value}" ${checked}>
            `;
        }

        return `<div class="" id="${this._html_args["id"]}">${partial}</div>`;
    }
}

export { CheckBox };
