import { html, Oid, OidUI } from "/lib/oidlib-dev";
import("/modules/workflow/src/js/components/template-selector.js");
import("/modules/workflow/src/js/widgets/buttonPopover.js");
import("/modules/workflow/src/js/components/sidebar.js");
import("/modules/workflow/src/js/components/sidebar-node-list-view.js");
import("/modules/workflow/src/js/components/sidebar-node-view.js");
import("/modules/workflow/src/js/components/world-space-node-view.js");

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
      //MAGIC NUMBER
      this.offsetX = 260;
      this.offsetY = 75;
      this.isMoving = false;

      this.scale = 1;
      console.log(nodes)

    }
    
      _onMouseDown(event){
        this.isMoving = true;

        //Mouse
        this._startPosX = event.clientX;
        this._startPosY = event.clientY;



      }
    
      _onMouseMove(event) {
        this.mouseX = event.clientX-this.offsetX;
        this.mouseY = event.clientY-this.offsetY;
        if (!this.isMoving) return;
        
        
        const mouseX = event.clientX;
        const mouseY = event.clientY;



        const dx = mouseX-this._startPosX;
        const dy = mouseY-this._startPosY;
        this.nodes.forEach(node => {
    
          node.style.left = parseFloat(node.style.left)+ dx + 'px';
          node.style.top = parseFloat(node.style.top) +dy + 'px';
          


        });
        this._startPosX = this._startPosX +dx;
        this._startPosY = this._startPosY +dy;

      }
      _onWheel(event) {
      
        }

      _onDragOver(ev){
        ev.preventDefault();
      }

      _onDrop(ev){
        ev.preventDefault();
        console.log(ev.dataTransfer.getData('text'));
        const receivedObject = JSON.parse(ev.dataTransfer.getData('text'));
        let node = document.createElement("div");
        const mouseX = ev.clientX;
        const mouseY = ev.clientY;

        node.innerHTML = `<world-space-node class="node absolute" style="left: ${mouseX - this.offsetX}px; top: ${mouseY - this.offsetY}px;" type="${receivedObject.type}" id="${"id" + Math.random().toString(16).slice(2)}" name="${receivedObject.name}" connect="itf:component-provider#provider"></world-space-node>`;
        ev.target.appendChild(node);
        this.nodes = this.shadowRoot.querySelectorAll(".node");
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
        <div id="pane" @drop={{this._onDrop}} @dragover={{this._onDragOver}} @mouseup={{this._onMouseUp}} @mousemove={{this._onMouseMove}} @wheel={{this._onWheel}} @mousedown={{this._onMouseDown}} class="w-full h-full overflow-hidden cursor-move relative">
            <div id="node2" class="node w-32 h-32 absolute" style="left: 400px; top: 400px;">
            <world-space-node type="data:database" id="a" name="Lorem Ipsum" connect="itf:component-provider#provider"></world-space-node>
            </div>
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
