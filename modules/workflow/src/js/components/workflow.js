import { html, Oid, OidUI } from "/lib/oidlib-dev";
import("/modules/workflow/src/js/components/template-selector.js");
import("/modules/workflow/src/js/widgets/buttonPopover.js");

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
      <div class="w-full h-full flex">
        <div
          class="w-80 h-full flex flex-col justify-between gap-4 bg-muted p-6 z-50 opacity-100 shadow-lg border-r"
        >
          <div class="flex flex-col gap-4">
          <span class="text-xl font-semibold mb-4">Nodes</span>
          <ul role="list" class="-mx-2 space-y-1">
            <li>
              <div>
                <button
                  type="button"
                  @click
                  class="hover:bg-background flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-primary"
                  aria-controls="sub-menu-1"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                  Graphs
                  <svg
                    id="chevron"
                    class="text-gray-400 ml-auto h-5 w-5 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <ul class="hidden mt-1 px-2 space-y-1" id="sub-menu-1">
                  <li>
                    <!-- 44px -->
                    <a
                      draggable="true"
                      href="#"
                      class="bg-background flex justify-between border rounded-md py-1.5 pl-2 pr-2 text-sm leading-6 text-primary"
                      ><div class="flex gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                          />
                        </svg>
                        Scatter Graph
                      </div>
                      <div class="text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          />
                        </svg>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          </div>
          <!-- O botão abaixo deve disparar um evento para o módulo de apresentação -->
          <!-- fazendo uma requisição da lista de templates. -->
          <button-popover
            label="Select Template"
            publish="click~apresentacao/templates/requisicao; saved~workflow/saved"
          ></button-popover>
          <!-- O componente de lista de templates recebe o evento da requisição, carrega o arquivo -->
          <!-- que contém a lista de templates e dispara um evento com a lista de templates. -->
          <template-lister-oid
            class="hidden"
            subscribe="apresentacao/templates/requisicao~requestTemplatesList"
            publish="responseTemplatesList~apresentacao/templates/listagem"
          >
          </template-lister-oid>
          <!-- O componente de seleção de templates recebe a lista de templates do barramento e -->
          <!-- apresenta os templates disponível para o usuario escolher. -->
        </div>
        <div class="w-full h-full ">
        <div @mouseup={{this._onMouseUp}} @mousemove={{this._onMouseMove}} @mousedown={{this._onMouseDown}} class="w-full h-full overflow-hidden cursor-move relative">
  <div id="node1" class="node w-32 h-32 bg-blue-500 absolute"></div>
  <div id="node2" class="node w-32 h-32 bg-red-500 absolute"></div>
</div></div>
      </div>
    `;
  }
}



Oid.component({
  id: "workflow:mainPage",
  element: "workflow-main-page",
  implementation: WorkflowOid,
});
