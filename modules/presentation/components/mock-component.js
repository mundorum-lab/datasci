import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class MockComponent extends OidUI {
  handleChange(_, { value }) {
    this.bg = value;
  }

  _onClick() {
    this.bg = "bg-red-500";
    this._notify("change", { value: "bg-green-500" });
  }
}

Oid.component({
  id: "presentation:mock-component",
  element: "mock-component-oid",
  receive: ["change"],
  properties: {
    bg: { default: "bg-background" },
  },
  implementation: MockComponent,
  template: `
    <div class="flex items-center justify-center h-full {{this.bg}}">
      <button @click class="border bg-background rounded-sm hover:bg-muted transition px-3 py-1.5">Mock Component</button>
    </div>
  `,
});
