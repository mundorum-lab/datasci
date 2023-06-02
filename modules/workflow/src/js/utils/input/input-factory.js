import { InputField } from "./input-field.js";
import { NumberField } from "./number-field.js";
import { RadioButton } from "./radio-button.js";
import { CheckBox } from "./check-box.js";

class InputFactory {
    static create(view, label, html_args, config_params) {
        let input;

        switch (view) {
            case 'InputField':
                input = new InputField(label, html_args, config_params);
                break;
            case 'NumberField':
                input = new NumberField(label, html_args, config_params);
                break;
            case 'RadioButton':
                input = new RadioButton(label, html_args, config_params);
                break;
            case 'CheckBox':
                input = new CheckBox(label, html_args, config_params);
                break;
            default:
                return null;
        }

        return input;
    }
}

export { InputFactory };