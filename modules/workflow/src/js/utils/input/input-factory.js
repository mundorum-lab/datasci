import { InputField } from "./input-field.js";
import { NumberField } from "./number-field.js";

class InputFactory {
    static create(name, args) {
        let input;

        switch (name) {
            case 'InputField':
                input = new InputField(args);
                break;
            case 'NumberField':
                input = new NumberField(args);
                break;
            
            default:
                return null;
        }

        return input;
    }
}

export { InputFactory };