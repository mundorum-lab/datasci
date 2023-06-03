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
            default:
                input = "";
        }

        return input;
    }

    static createInputOid(bind, {maxLength = null, minLength = null, pattern = null, placeholder = null, label = null, name = null} = {}) {
        const bindCommunication = bind != null ? `/${bind}` : "";
        const interfaceOid = {
            "max-length": maxLength,
            "min-length": minLength,
            "pattern": pattern,
            "placeholder": placeholder,
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
}

export { OidInputFactory };
