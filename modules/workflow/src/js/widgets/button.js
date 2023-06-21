import { html, Oid, OidUI } from "/lib/oidlib-dev";

export class ButtonOid extends OidUI {
  _onClick() {
    this._notify("click", { value: this.value || this.label });
    this._invoke("itf:transfer", "send", { value: this.value || this.label });
  }
}

Oid.component({
  id: "workflow:custom-button",
  element: "custom-button",
  properties: {
    label: {},
    value: {},
  },
  implementation: ButtonOid,
  template: html` <button
    type="button"
    @click
    class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
  >
    {{this.label}}
  </button>`,
});
