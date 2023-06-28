import { html, Oid, OidUI } from "/lib/oidlib-dev";
import { worldSpaceNodeConnector as Connector} from "/modules/workflow/src/js/components/connectors/index.js";
import * as d3 from "d3"
import("/modules/workflow/src/js/components/template-selector.js");
import("/modules/workflow/src/js/widgets/buttonPopover.js");
import("/modules/workflow/src/js/components/sidebar.js");
import("/modules/workflow/src/js/components/sidebar-node-list-view.js");
import("/modules/workflow/src/js/components/sidebar-node-view.js");
import("/modules/workflow/src/js/components/world-space-node-view.js");
import("/modules/workflow/src/js/components/arrow-oid.js");
import("/modules/workflow/src/js/utils/input/inputs.js");


export class WorkflowOid extends OidUI {
  /**
   * Represents the view of the entire workflow page
   * @extends OidUI
   */

  /**
   * Event handler for the click event.
   * @param {Event} event - The click event object.
   */
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
      this.handles = [];
      this.nodes = this.shadowRoot.querySelectorAll(".node");
      this.pane = this.shadowRoot.querySelector("#pane");
      this.svg = this.shadowRoot.querySelector("#svg1");
      this.container = this.shadowRoot.querySelector("#container");
      this.isMoving = false;

      this.scale = 1;

      this.sourceNode = null;
      this.targetNode = null;

      this.sourcePos = null;
      this.targetPos = null;

    }
    
    /**
     * Event handler for the mouse down event for dragging the pane.
     * @param {MouseEvent} event - The mouse down event object
     */
      _onMouseDown(event){
        this.isMoving = true;

        //Mouse
        this._startPosX = event.clientX / this.scale;
        this._startPosY = event.clientY / this.scale;

        this._startPosPaneX = event.clientX;
        this._startPosPaneY = event.clientY;

      }
    
      /**
       * Event handler for the mouse move event for dragging the pane.
       * @param {MouseEvent} event - The mouse move event object. 
       * @returns - Stop the function when the down event has not happenned.
       */
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
          this.handles.forEach((handle) => {
            handle.line
            .attr("x1",handle.source.target.getBoundingClientRect().left / this.scale + handle.source.target.offsetWidth/2 - parseFloat(this.pane.style.left) / this.scale - this.container.offsetLeft  / this.scale)
            .attr("y1",handle.source.target.getBoundingClientRect().top / this.scale + handle.source.target.offsetHeight/2 - parseFloat(this.pane.style.top) / this.scale - this.container.offsetTop  / this.scale)
            .attr('x2',handle.target.target.getBoundingClientRect().left / this.scale + handle.target.target.offsetWidth/2 - parseFloat(this.pane.style.left) / this.scale - this.container.offsetLeft  / this.scale)
            .attr("y2",handle.target.target.getBoundingClientRect().top / this.scale + handle.target.target.offsetHeight/2 - parseFloat(this.pane.style.top) / this.scale - this.container.offsetTop  / this.scale)
          })
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

      /**
       * Event handler for the mouse up event.
       * @param {MouseEvent} event - The mouse up event object. 
       */
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

      /**
       * Event handler for the wheel event.
       * @param {WheelEvent} e - The wheel event object. 
       * @returns - Stop the function when inside the modal.
       */
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

      /**
       * Event handler for the drag over event.
       * @param {DragEvent} ev - The drag over event object. 
       */
      _onDragOver(ev){
        ev.preventDefault();
      }

      /**
       * Event handler for the drop event.
       * @param {DragEvent} ev - The drop event object. 
       */
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
        
    /**
     * Event handler for the mouse click on port which starts the connection process.
     * @param {CustomEvent} event - The connect start event object.
     */
    _onConnectStart(event) {
      this.sourceNode = event.detail.port;
      this.source = event.detail;
    }

    /**
     * Event handler for the mouse click on port which ends the connection process.
     * @param {CustomEvent} event - The connect end event object.
     */
    _onConnectEnd(event) {
      this.targetNode = event.detail.port;
      this.target = event.detail;

      if (this.sourceNode != null) {
        let svg = d3.select(this.svg);
        const valid = Connector.makeConnection(this.sourceNode, this.targetNode);

        if (valid) {
          this.handles.push({
            source: this.source, 
            target: this.target, 
            line: svg.append("line")
          .attr("x1",this.source.target.getBoundingClientRect().left / this.scale + this.source.target.offsetWidth/2 - parseFloat(this.pane.style.left) / this.scale - this.container.offsetLeft / this.scale)
          .attr("y1",this.source.target.getBoundingClientRect().top / this.scale + this.source.target.offsetHeight/2 - parseFloat(this.pane.style.top) / this.scale - this.container.offsetTop / this.scale)
          .attr('x2',this.target.target.getBoundingClientRect().left / this.scale + this.target.target.offsetWidth/2 - parseFloat(this.pane.style.left) / this.scale - this.container.offsetLeft / this.scale)
          .attr("y2",this.target.target.getBoundingClientRect().top / this.scale + this.target.target.offsetHeight/2 - parseFloat(this.pane.style.top) / this.scale - this.container.offsetTop / this.scale)
          .attr("stroke-width", 3)
          .attr("stroke", "black")});
          this.targetNode = null;
          this.source = null;
          this.target = null;
        }
      }
    }

  /**
   * Generates the visual template for the workflow page view.
   * @returns {string} The generated html template.
   */
  template() {
    return html`
      <component-provider-oid id="provider"></component-provider-oid>
      <div class="w-full h-full flex">
        <node-list-oid connect="itf:component-provider#provider"></node-list-oid>
        <div id="container" class="w-full h-full overflow-hidden relative">
          <div id="pane" style="left: -2000px; top: -2000px;" @drop={{this._onDrop}} @dragover={{this._onDragOver}} @mouseup={{this._onMouseUp}} @mouseleave={{this._onMouseUp}} @mousemove={{this._onMouseMove}} @wheel={{this._onWheel}} @mousedown={{this._onMouseDown}} class="absolute cursor-move w-[5000px] h-[5000px] bg-dotted-spacing-7 bg-dotted-radius-px bg-dotted-gray-400 z-0">
          <svg id="svg1" style="display: relative; top: 0; left: 0; width: 5000px; height: 5000px" class="pointer-events-none">
          </div>
          </svg>
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
