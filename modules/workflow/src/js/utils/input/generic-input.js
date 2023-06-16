class GenericInput {
    constructor(args) {
        this._args = args;
    }

    _parseArgs() {
        let results = [];

        for (let [arg, value] of Object.entries(this._args)) {
            results.push(`${arg}="${value.join(" ")}"`);
        }

        return results.join(" ");
    }

    render() {
        return "";
    }
}

export { GenericInput };