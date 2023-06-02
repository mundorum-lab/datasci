import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class LargeComponent extends OidUI {
  resetColor() {
    this.bgcolor = "yellow"
  }

  handleChangeColor(topic, message) {
    this.bgcolor = "gold"
  }
}

Oid.component({
  id: "presentation-stub:large-component",
  element: "large-stub-oid",
  receive: ["changeColor"],
  properties: {
    bgcolor: {default: "Yellow"},
  },
  implementation: LargeComponent,
  template: `
    <style>
      .stub {
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
      }
    </style>

    <div class="stub" style="background-color: {{this.bgcolor}}">
      <button @click={{this.resetColor}}>Large Stub Component</button>
    </div>`
});