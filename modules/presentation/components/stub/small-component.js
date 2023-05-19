import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class SmallComponent extends OidUI {
  handleChangeColor(topic, message) {
    this.bgcolor = "orange"
  }

  changeXLargeColor() {
    this.bgcolor = "cyan";
    this._notify("componentClick", { value: "changeColor" })
  }
}

Oid.component({
  id: "presentation-stub:small-component",
  element: "small-stub-oid",
  receive: ["changeColor"],
  properties: {
    bgcolor: {default: "cyan"},
  },
  implementation: SmallComponent,
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
      <button @click={{this.changeXLargeColor}}>Small Stub Component</button>
    </div>`
});