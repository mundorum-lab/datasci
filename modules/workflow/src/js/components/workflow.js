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
      this.pane = this.shadowRoot.querySelector("#pane");
      this.container = this.shadowRoot.querySelector("#container");
      //MAGIC NUMBER
      this.offsetX = 260;
      this.offsetY = 75;
      this.isMoving = false;

      this.scale = 1;

    }
    
      _onMouseDown(event){
        event.preventDefault();
        this.isMoving = true;

        //Mouse
        this._startPosX = event.clientX / this.scale;
        this._startPosY = event.clientY / this.scale;

        this._startPosPaneX = event.clientX;
        this._startPosPaneY = event.clientY;

      }
    
      _onMouseMove(event) {
        event.preventDefault();
        if (!this.isMoving) return;

        this.nodes.forEach(node => {
          if(node.hasAttribute('moving')){
            this.nodeMoving = node;
          }
        });

        if(this.nodeMoving != undefined){
          const dx = (event.clientX / this.scale)-this._startPosX;
          const dy = (event.clientY / this.scale)-this._startPosY;
          this.nodeMoving.style.left = parseFloat(this.nodeMoving.style.left)+ dx + 'px';
          this.nodeMoving.style.top = parseFloat(this.nodeMoving.style.top) + dy + 'px';
          this._startPosX += dx;
          this._startPosY += dy;
        } else {
          const dx = event.clientX-this._startPosPaneX;
          const dy = event.clientY-this._startPosPaneY;
          this.pane.style.left = Math.min(Math.max(parseFloat(this.pane.style.left)+ dx, -5000+this.container.offsetWidth), 0) + 'px';
          this.pane.style.top = Math.min(Math.max(parseFloat(this.pane.style.top) +dy, -5000+this.container.offsetHeight), 0) + 'px';
          this._startPosPaneX += dx;
          this._startPosPaneY += dy;
        }

        

      }
      _onMouseUp(event){
        event.preventDefault();
        this.nodes.forEach(node => {
          if(node.hasAttribute('moving')){
            node.removeAttribute('moving');
          }
        });
        this.nodeMoving = undefined;
        this.isMoving = false;
      }

      _onWheel(e) {
        e.preventDefault();

        // Calculate the zoom factor based on the wheel event
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        this.scale *= zoomFactor;

        this.pane.style.transform = `scale(${this.scale})`;
      }
      _onDragOver(ev){
        ev.preventDefault();
      }

      _onDrop(ev){
        ev.preventDefault();
        console.log(ev.dataTransfer.getData('text'));
        const receivedObject = JSON.parse(ev.dataTransfer.getData('text'));
        let node = document.createElement("div");
        const mouseX = ev.clientX / this.scale;
        const mouseY = ev.clientY / this.scale;

        node.innerHTML = `<world-space-node class="node absolute" style="left: ${mouseX - this.offsetX / this.scale}px; top: ${mouseY - this.offsetY / this.scale}px;" type="${receivedObject.type}" id="${"id" + Math.random().toString(16).slice(2)}" name="${receivedObject.name}" connect="itf:component-provider#provider"></world-space-node>`;
        ev.target.appendChild(node);
        this.nodes = this.shadowRoot.querySelectorAll(".node");
      }
        
  
  template() {
    return html`
      <component-provider-oid id="provider"></component-provider-oid>
      <div class="w-full h-full flex">
        <node-list-oid connect="itf:component-provider#provider"></node-list-oid>
        <div id="container" class="w-full h-screen overflow-hidden relative">
        <div id="pane" style="left: 0px; top: 0px;" @drop={{this._onDrop}} @dragover={{this._onDragOver}} @mouseup={{this._onMouseUp}} @mousemove={{this._onMouseMove}} @wheel={{this._onWheel}} @mousedown={{this._onMouseDown}} class="absolute cursor-move w-[5000px] h-[5000px] bg-dotted-spacing-7 bg-dotted-radius-px bg-dotted-gray-400">
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
