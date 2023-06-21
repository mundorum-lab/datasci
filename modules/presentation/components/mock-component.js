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
    id: { default: "none" },
  },
  implementation: MockComponent,
  template: `
    <div class="flex flex-col items-center justify-center gap-4 h-full {{this.bg}}">
      <p class="text-2xl font-bold">{{this.id}}</p>
      <button @click class="border bg-background rounded-sm hover:bg-muted transition px-3 py-1.5">Mock Component</button>
    </div>
  `,
});
