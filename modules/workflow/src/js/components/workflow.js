import { html, Oid, OidUI } from "/lib/oidlib-dev";
import { worldSpaceNodeConnector as Connector} from "/modules/workflow/src/js/components/connectors/index.js";
import("/modules/workflow/src/js/components/template-selector.js");
import("/modules/workflow/src/js/widgets/buttonPopover.js");
import("/modules/workflow/src/js/components/sidebar.js");
import("/modules/workflow/src/js/components/sidebar-node-list-view.js");
import("/modules/workflow/src/js/components/sidebar-node-view.js");
import("/modules/workflow/src/js/components/world-space-node-view.js");
import("/modules/workflow/src/js/components/arrow-oid.js");
import("/modules/workflow/src/js/utils/input/inputs.js");

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
      this.isMoving = false;

      this.scale = 1;

      this.sourceNode = null;
      this.targetNode = null;

      this.sourcePos = null;
      this.targetPos = null;

    }
    
      _onMouseDown(event){
        this.isMoving = true;

        //Mouse
        this._startPosX = event.clientX / this.scale;
        this._startPosY = event.clientY / this.scale;

        this._startPosPaneX = event.clientX;
        this._startPosPaneY = event.clientY;

      }
    
      _onMouseMove(event) {
        if (!this.isMoving) return;
        let dontMove = false

        this.nodes.forEach(node => {
          if(node.hasAttribute('moving') && !node.hasAttribute('dontMove')){
            this.nodeMoving = node;
          } else if(node.hasAttribute('dontMove')){
            dontMove = true;
          }}
        );

        if(this.nodeMoving != undefined){
          event.preventDefault();
          const dx = (event.clientX / this.scale)-this._startPosX;
          const dy = (event.clientY / this.scale)-this._startPosY;
          this.nodeMoving.style.left = parseFloat(this.nodeMoving.style.left)+ dx + 'px';
          this.nodeMoving.style.top = parseFloat(this.nodeMoving.style.top) + dy + 'px';
          this._startPosX += dx;
          this._startPosY += dy;
        } else if(!dontMove) {
          event.preventDefault();
          const dx = event.clientX-this._startPosPaneX;
          const dy = event.clientY-this._startPosPaneY;
          this.pane.style.left = Math.min(Math.max(parseFloat(this.pane.style.left)+ dx, (-5000 * this.scale) + this.container.offsetWidth), 0) + 'px';
          this.pane.style.top = Math.min(Math.max(parseFloat(this.pane.style.top) +dy, (-5000 * this.scale) + this.container.offsetHeight), 0) + 'px';
          this._startPosPaneX += dx;
          this._startPosPaneY += dy;
        }

        

      }
      _onMouseUp(event){
        this.nodes.forEach(node => {
          if(node.hasAttribute('moving')){
            node.removeAttribute('moving');
            node.removeAttribute('dontMove');
          }
        });
        this.nodeMoving = undefined;
        this.isMoving = false;
      }

      _onWheel(e) {
        let dontScroll = false;
        this.nodes.forEach(node => {
          if(node.hasAttribute('dontScroll')){
            dontScroll = true;
          }
        });
        if(dontScroll) return;
        e.preventDefault();

        // Calculate the zoom factor based on the wheel event
        const zoomFactor = e.deltaY < 0 ? 1.02 : 0.98;
        if(this.scale * zoomFactor * 5000 > this.container.offsetWidth){
          this.scale *= zoomFactor;
          this.pane.style.transformOrigin = "left top";
          this.pane.style.transform = `scale(${this.scale})`;
          this.pane.style.left = Math.min(Math.max(parseFloat(this.pane.style.left), (-5000 * this.scale) + this.container.offsetWidth), 0) + 'px';
          this.pane.style.top = Math.min(Math.max(parseFloat(this.pane.style.top), (-5000 * this.scale) + this.container.offsetHeight), 0) + 'px';
        }
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

        node.innerHTML = html`<world-space-node @connectstart={{this._onConnectStart}} class="node absolute z-50" style="left: ${mouseX - (this.pane.getBoundingClientRect().left) / this.scale}px; top: ${mouseY - (this.pane.getBoundingClientRect().top) / this.scale}px;" type="${receivedObject.type}" id="${"id" + Math.random().toString(16).slice(2)}" name="${receivedObject.name}" connect="itf:component-provider#provider"></world-space-node>`;
        ev.target.appendChild(node);
        this.nodes = this.shadowRoot.querySelectorAll(".node");

        this.nodes.forEach((node) => {node.addEventListener("connectstart", this._onConnectStart.bind(this))});
        this.nodes.forEach((node) => {node.addEventListener("connectend", this._onConnectEnd.bind(this))});
      }
        
    _onConnectStart(event) {
      this.sourceNode = event.detail.port;
      this.sourcePos = {top: event.detail.top, left: event.detail.left};
    }

    _onConnectEnd(event) {
      this.targetNode = event.detail.port;
      this.targetPos = {top: event.detail.top, left: event.detail.left};

      if (this.sourceNode != null) {
        const pane = this.shadowRoot.querySelector("#pane");
        const arrow = `<arrow-oid class="w-full h-full absolute z-40" x0="${this.sourcePos.left}" y0="${this.sourcePos.top}" x1="${this.targetPos.left}" y1="${this.targetPos.top}" style="left: ${this.sourcePos.left}px; top: ${this.sourcePos.top}px;"></arrow-oid>`;
        const valid = Connector.makeConnection(this.sourceNode, this.targetNode);
        const wrap = document.createElement("div");

        if (valid) {
          wrap.innerHTML = arrow;
          pane.appendChild(wrap);
          this.sourceNode = null;
          this.targetNode = null;
          this.sourcePos = null;
          this.targetPos = null;
        }
      }
    }

  template() {
    return html`
      <component-provider-oid id="provider"></component-provider-oid>
      <div class="w-full h-full flex">
        <node-list-oid connect="itf:component-provider#provider"></node-list-oid>
        <div id="container" class="w-full h-full overflow-hidden relative">
          <div id="pane" style="left: -2000px; top: -2000px;" @drop={{this._onDrop}} @dragover={{this._onDragOver}} @mouseup={{this._onMouseUp}} @mouseleave={{this._onMouseUp}} @mousemove={{this._onMouseMove}} @wheel={{this._onWheel}} @mousedown={{this._onMouseDown}} class="absolute cursor-move w-[5000px] h-[5000px] bg-dotted-spacing-7 bg-dotted-radius-px bg-dotted-gray-400 z-0">
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
