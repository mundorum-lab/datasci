import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class MockComponent extends OidUI {
  handleChange() { }
}

Oid.component({
  id: "presentation:mock-component",
  element: "mock-component-oid",
  receive: ["change"],
  implementation: MockComponent,
  template: `
    <div>
      <button>Mock Component</button>
    </div>
  `,
});
