import { InputField } from "./input-field";

class InputFactory {
    create(name, args) {
        let input;

        switch (name) {
            case 'InputField':
                input = new InputField(args);
                break;
            default:
                return null;
        }

        return input;
    }
}