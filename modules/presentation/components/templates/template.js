import { OidUI } from "/lib/oidlib-dev.js";

export class Template extends OidUI {
  render() {
    super.render();
    this._notify("ready");
  }
}
