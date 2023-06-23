/*
  Narrativa:

  Quando o usuário clica no Botão "Select Template" é publicado no barramento a mensagem
  de requisição da lista de templates com o tópico "apresentacao/templates/requisicao".
  O FornecedorOid, que assina esse tópico, mapeia internamente essa mensagem para 
  "requestTemplatesList" e carrega o arquivo com a lista de templates. Depois, é publicada
  a mensagem contendo a lista dos templates com o tópico "apresentacao/templates/listagem".

  Então, o componente template-selector deve assinar o tópico "apresentacao/templates/listagem",
  para receber a lista de templates. Na parte visual, é aberto um popover em formato de um radio
  button com a lista de templates disponível. O usuário deve selecionar o que mais lhe convém e 
  clicar em "Salvar". Esse evento de salvar publica no barramento com o tópico "saved~workflow/saved"
  uma mensagem contendo o template selecionado.
*/

import { css, html, Oid, OidUI } from "/lib/oidlib-dev.js";
import { generate as uuid } from "short-uuid";

export class TemplateSelector extends OidUI {
  handleSelector(topic, message) {
    this.value = message.value;
  }

  handleSaved(topic, message) {
    this._notify('saved', {value: this.checked});
  }

  _onClick(event) {
    this.checked = event.target.value;
  }

  template() {
    const uniqueID = uuid(); //gera um ID único para o TemplateSelector
    let partial = "";

    for (let obj of this.value) {
      partial += `
        <div class="flex items-center space-x-2">
            <input @click={{this._onClick}} type="radio" id="${uniqueID}-${obj.template}" name="${uniqueID}" value="${obj.template}" aria-checked="false" data-state="unchecked" class="accent-accent-foreground aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" tabindex="-1" data-radix-collection-item=""></button>
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="${uniqueID}-${obj.template}">${obj.template}</label>
        </div>
        `;
    }

    return html`
      <div
        role="radiogroup"
        aria-required="false"
        dir="ltr"
        class="grid gap-2"
        tabindex="0"
        style="outline: none;"
      >
        ${partial}
      </div>
    `;
  }
}

Oid.component({
  id: "wf:template-selector",
  element: "template-selector-oid",
  properties: {
    value: { default: [] },
  },
  receive: ["selector", "saved"],
  implementation: TemplateSelector,
  stylesheet: ["/style.css"],
});
