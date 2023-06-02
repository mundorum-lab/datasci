import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class MediumComponent extends OidUI {
  changeLargeColor() {
    this._notify("componentClick", { value: "changeColor" })
  }

  handleMediumComponent(topic, message) {
  }
}

Oid.component({
  id: "presentation-stub:medium-component",
  element: "medium-stub-oid",
  receive: ["mediumComponent"],
  properties: {
    bgcolor: {default: "lightgreen"},
  },
  implementation: MediumComponent,
  template: `
    <style>
      .stub {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
      }
    </style>

    <div class="stub" style="background-color: {{this.bgcolor}}">
      <button @click={{this.changeLargeColor}}>Medium Stub Component</button>
    </div>`
});