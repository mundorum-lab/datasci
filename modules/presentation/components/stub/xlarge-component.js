import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class XLargeComponent extends OidUI {
  changeSmallColor() {
    this.bgcolor = "orange";
    this._notify("componentClick", { value: "changeColor" })
  }

  handleChangeColor(topic, message) {
    this.bgcolor = "cyan"
  }
}

Oid.component({
  id: "presentation-stub:xlarge-component",
  element: "xlarge-stub-oid",
  receive: ["changeColor"],
  properties: {
    bgcolor: {default: "orange"},
  },
  implementation: XLargeComponent,
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
      <button @click={{this.changeSmallColor}}>Extra Large Stub Component</button>
    </div>`
});