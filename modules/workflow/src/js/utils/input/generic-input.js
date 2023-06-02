class GenericInput {
    constructor(label, html_args, config_params) {
        this._label = label;
        this._html_args = html_args;
        this._config_params = config_params;
    }

    _generateLabel() {
        if (!("id" in this._html_args))
            return "";
        
        return `<label for="${this._html_args["id"]}" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="terms">${this._label}</label>`
    }

    _parseConfig() {
        let results = [];

        for (let [arg, value] of Object.entries(this._config_params)) {
            if (arg == "list")
                continue;
            results.push(`${arg.toLocaleLowerCase()}="${value}"`);
        }

        return results.join(" ");
    }

    _parseArgs() {
        let results = [];

        for (let [arg, value] of Object.entries(this._html_args)) {
            results.push(`${arg}="${value.join(" ")}"`);
        }

        return results.join(" ");
    }

    getIDs() {
        return [];
    }
    
    render() {
        return "";
    }
}

export { GenericInput };