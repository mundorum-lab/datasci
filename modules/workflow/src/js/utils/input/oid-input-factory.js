import { generate as uuid } from "short-uuid";

class OidInputFactory {
    static parseInterface(interfaceOid) {
        let partial = "";

        for (let [param, value] of Object.entries(interfaceOid)) {
            if (value != null)
                partial += `${param}="${value}"`;
        }

        return partial;
    }

    static createView(view, bind, interfaceOid) {
        let input;

        switch (view) {
            case 'InputField':
                input = this.createInputOid(bind, interfaceOid);
                break;
            case 'NumberField':
                input = this.createNumberOid(bind, interfaceOid);
                break;
            case 'RadioButton':
                input = this.createRadioOid(bind, interfaceOid);
                break;
            case 'CheckBox':
                input = this.createCheckOid(bind, interfaceOid);
                break;
            case 'RangeInput':
                input = this.createRangeOid(bind, interfaceOid);
                break;
            case 'Switch':
                input = this.createSwitchOid(bind, interfaceOid);
                break;
            case 'DropDown':
                input = this.createDropDownOid(bind, interfaceOid);
                break;
            case 'FileInput':
                input = this.createFileInputOid(bind, interfaceOid);
                break;
            default:
                input = "";
        }

        return input;
    }

    static createInputOid(bind, {maxLength = null, minLength = null, pattern = null, placeholder = null, value = null, label = null, name = null} = {}) {
        const bindCommunication = bind != null ? `/${bind}` : "";
        const interfaceOid = {
            "max-length": maxLength,
            "min-length": minLength,
            "pattern": pattern,
            "placeholder": placeholder,
            "value": value,
            "label": label,
            "name": name
        };

        return `<input-oid publish="update~input/changed${bindCommunication}" class="w-full" ${this.parseInterface(interfaceOid)}></input-oid>`;
    }

    static createNumberOid(bind, {max = null, min = null, placeholder = null, step = null, value = null, label = null, name = null} = {}) {
        const bindCommunication = bind != null ? `/${bind}` : "";
        const interfaceOid = {
            "max": max,
            "min": min,
            "placeholder": placeholder,
            "step": step,
            "value": value,
            "label": label,
            "name": name
        };

        return `<number-oid publish="update~input/changed${bindCommunication}" class="w-full" ${this.parseInterface(interfaceOid)}></number-oid>`;
    }

    static createRadioOid(bind, {values = null, label = null, name = null} = {}) {
        const bindCommunication = bind != null ? `/${bind}` : "";
        const interfaceOid = {
            "values": JSON.stringify(values).replaceAll('"', "'"),
            "label": label,
            "name": name
        };

        return `<radio-oid publish="update~input/changed${bindCommunication}" class="w-full" ${this.parseInterface(interfaceOid)}></radio-oid>`;
    }

    static createCheckOid(bind, {values = null, label = null, name = null} = {}) {
        const bindCommunication = bind != null ? `/${bind}` : "";
        const interfaceOid = {
            "values": JSON.stringify(values).replaceAll('"', "'"),
            "label": label,
            "name": name
        };

        return `<check-oid publish="update~input/changed${bindCommunication}" class="w-full" ${this.parseInterface(interfaceOid)}></check-oid>`;
    }

    static createRangeOid(bind, {max = null, min = null, value = null, step = null, label = null, name = null} = {}) {
        const bindCommunication = bind != null ? `/${bind}` : "";
        const interfaceOid = {
            "max": max,
            "min": min,
            "value": value,
            "step": step,
            "label": label,
            "name": name
        };

        return `<range-oid publish="update~input/changed${bindCommunication}" class="w-full" ${this.parseInterface(interfaceOid)}></range-oid>`;
    }

    static createSwitchOid(bind, {name = null, label = null} = {}) {
        const bindCommunication = bind != null ? `/${bind}` : "";
        const interfaceOid = {
            "name": name,
            "label": label
        };

        return `<switch-toggle-oid publish="update~input/changed${bindCommunication}" class="w-full" ${this.parseInterface(interfaceOid)}></switch-toggle-oid>`;
    }

    static createDropDownOid(bind, {values = null, name = null, label = null} = {}) {
        const bindCommunication = bind != null ? `/${bind}` : "";
        const interfaceOid = {
            "values": JSON.stringify(values).replaceAll('"', "'"),
            "label": label,
            "name": name
        };

        return `<dropdown-oid publish="update~input/changed${bindCommunication}" class="w-full" ${this.parseInterface(interfaceOid)}></dropdown-oid>`;
    }

    static createFileInputOid(bind, {name = null, label = null, sep = null} = {}) {
        bind = uuid();

        const valueAlreadySelected = sep != null ? `value="${sep}"` : "";
        const bindCommunication = bind != null ? `/${bind}` : "";
        const interfaceOid = {
            "sep": sep
        };
        

        return `
        <div class="w-full flex flex-col gap-x-4 content-center">
            <div class="flex flex-col gap-y-2">
                <label-oid text="${label}" for="${name}"></label-oid>
            </div>
            <div class="flex gap-x-4">
                <input-oid publish="update~input/changed${bindCommunication}" class="w-2/5" ${valueAlreadySelected} placeholder="Entre um separador" max-length="2" min-length="1"></input-oid>
                <filereader-oid class="h-10 w-full" subscribe="input/changed${bindCommunication}~separator" publish="loaded~file/loaded" ${this.parseInterface(interfaceOid)}></filereader-oid>
            </div>
        </div>
        `;
    }
}

export { OidInputFactory };
