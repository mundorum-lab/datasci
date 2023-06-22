import { html, Oid, OidUI } from "/lib/oidlib-dev";
import("/modules/workflow/src/js/components/template-selector.js");
import("/modules/workflow/src/js/widgets/buttonPopover.js");
import("/modules/workflow/src/js/components/sidebar.js");
import("/modules/workflow/src/js/components/sidebar-node-list-view.js");
import("/modules/workflow/src/js/components/sidebar-node-view.js");

export class WorkflowOid extends OidUI {
  _onClick(event) {
    let me = event.composedPath().find((x) => x.tagName == "BUTTON");
    if (me.children["chevron"].classList.contains("rotate-90")) {
      me.children["chevron"].classList.remove("rotate-90");
      me.nextElementSibling.classList.add("hidden");
    } else {
      me.children["chevron"].classList.add("rotate-90");
      me.nextElementSibling.classList.remove("hidden");
    }
  }


  connectedCallback(){
    super.connectedCallback();
    
      this.nodes = this.shadowRoot.querySelectorAll(".node");
      this.offsetX = 0;
      this.offsetY = 0;
      this.isMoving = false;
    }
    
      _onMouseDown(event){
        this.isMoving = true;
        this.offsetX = event.clientX - event.target.getBoundingClientRect().left;
    this.offsetY = event.clientY - event.target.getBoundingClientRect().top;
        }
    
      _onMouseMove(event){
        if (!this.isMoving) return;

    event.target.style.left = event.clientX - this.offsetX + 'px';
    event.target.style.top = event.clientY - this.offsetY + 'px';
    event.target.style.position = 'absolute';
      }
    
      _onMouseUp(){
        this.isMoving = false;
      }
  
  template() {
    return html`
      <component-provider-oid id="provider"></component-provider-oid>
      <div class="w-full h-full flex">
        <node-list-oid connect="itf:component-provider#provider"></node-list-oid>
        <div class="w-full">
          <div @mouseup={{this._onMouseUp}} @mousemove={{this._onMouseMove}} @mousedown={{this._onMouseDown}} class="w-full h-full overflow-hidden cursor-move relative">
            <div id="node1" class="node w-32 h-32 bg-blue-500 absolute"></div>
            <div id="node2" class="node w-32 h-32 bg-red-500 absolute"></div>
          </div>
        </div>
      </div>
    `;
  }
}


Oid.component({
  id: "workflow:mainPage",
  element: "workflow-main-page",
  implementation: WorkflowOid,
  stylesheet: ['/style.css']
});
