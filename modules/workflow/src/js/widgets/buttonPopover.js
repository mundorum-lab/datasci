import { html, Oid, OidUI } from "/lib/oidlib-dev";
import 'flowbite';

export class ButtonPopoverOid extends OidUI {
  _onClick() {
    this._notify("click", { value: this.value || this.label });
    let dialog = this.shadowRoot.querySelector("dialog");
    dialog.showModal();
  }

  _onClose() {
    let dialog = this.shadowRoot.querySelector("dialog");
    dialog.close();
  }

  _onSave() {
    this._notify('saved', {value: true});
    let dialog = this.shadowRoot.querySelector("dialog");
    dialog.close();
  }


template(){
  return html` <button
  type="button"
  @click={{this._onClick}}
  class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
>
  {{this.label}}
  
</button>
<dialog id="dialog" class="w-1/3 rounded-xl bg-background text-foreground border">
            <div class="flex flex-col gap-y-4 justify-center">
                <div class="flex items-center justify-between">
                    <div class="w-6">
                    </div>
                    <h2 class="text-2xl">Select Template</h2>
                    <button @click={{this._onClose}} class="w-6 h-6 focus:ring-2 focus:ring-ring">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                    </button>
                </div>
                <template-selector-oid 

subscribe="apresentacao/templates/listagem~selector; workflow/saved~saved"
>
</template-selector-oid>
                <div class="flex flex-col gap-y-4">
                    
            <div class="flex px-4 gap-2 content-center">
                <input-oid publish="update~input/changed/a" class="w-full" max-length="10" label="URL da Database" name="URL"></input-oid>
            </div>
            
                    <button @click={{this._onSave}} type="submit" form="sPsQdyh7kaUbd3bdizWcVv" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">Salvar</button>
                </div>
            </div>
            </dialog>
`;
}

}

Oid.component({
  id: "workflow:button-popover",
  element: "button-popover",
  properties: {
    label: {},
    value: {},
    popover: {},
  },
  implementation: ButtonPopoverOid,
});
