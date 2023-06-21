import { Oid } from "/lib/oidlib-dev.js";
import { Template } from "./template";

Oid.component({
  id: "presentation:template-1",
  element: "template1-oid",
  implementation: Template,
  template: `
    <div class="grid grid-cols-5 grid-rows-4 gap-4 flex-grow p-4 bg-muted">
      <div id="region1" class="overflow-hidden row-span-1 col-span-5 bg-background rounded-md shadow"></div>
      <div id="region2" class="overflow-hidden row-span-3 col-span-1 row-start-2 bg-background rounded-md shadow"></div>
      <div id="region3" class="overflow-hidden row-span-3 col-span-3 row-start-2 bg-background rounded-md shadow"></div>
      <div id="region4" class="overflow-hidden row-span-3 col-span-1 row-start-2 bg-background rounded-md shadow"></div>
    </div>
  `,
});
