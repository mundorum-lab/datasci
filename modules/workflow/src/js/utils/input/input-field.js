import { GenericInput } from "./generic-input";

class InputField extends GenericInput {
    render() {
        const agrs_str = this._parseArgs();

        return `<input type="text" ${agrs_str}>`;
    }
}

export { InputField };
