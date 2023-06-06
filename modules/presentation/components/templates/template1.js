import { Oid, OidUI } from "/lib/oidlib-dev.js";

export class Template1 extends OidUI {
}

Oid.component({
  id: "presentation-template:template-1",
  element: "template1-oid",
  implementation: Template1,
  properties: {
    region1: {default: null},
    region2: {default: null},
    region3: {default: null},
    region4: {default: null}
  },
  template: `
  <style>
    .template {
      display: grid;
      grid-template-columns: 0.4fr 0.6fr;
      grid-template-rows: 1fr 1fr;
      padding: 10px;
      grid-gap: 10px;
      width: calc(100% - 20px);
      height: calc(100vh - 20px);
      background-color: #efefef;
    }

    .region, .component {
      display: flex;
      flex-grow: 1;
      flex-shrink: 1;
      flex-direction: column;
      row-gap: 10px;
      width: 100%;
      height: 100%;
    }
  </style>

  <div class="template">
    <div class="region">{{this.region1}}</div>
    <div class="region">{{this.region2}}</div>
    <div class="region">{{this.region3}}</div>
    <div class="region">{{this.region4}}</div>
  </div>`
});