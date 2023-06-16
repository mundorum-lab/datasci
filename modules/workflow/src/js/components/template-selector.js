/*
    <!-- O botão abaixo deve disparar um evento para o módulo de apresentação -->
    <!-- fazendo uma requisição da lista de templates. -->
    <button-oid
      label="Request templates"
      publish="click~apresentacao/templates/requisicao"
      value="teste"
    ></button-oid>

    <!-- O componente de lista de templates recebe o evento da requisição, carrega o arquivo -->
    <!-- que contém a lista de templates e dispara um evento com a lista de templates. -->
    <template-lister-oid
      subscribe="apresentacao/templates/requisicao~requestTemplatesList"
      publish="responseTemplatesList~apresentacao/templates/listagem"
    >
    </template-lister-oid>

    Quando o usuário clica no Botão "Request templates" é publicado no barramento a mensagem
    de requisição da lista de templates com o tópico "apresentacao/templates/requisicao".
    O FornecedorOid, que assina esse tópico, mapeia internamente essa mensagem para 
    "requestTemplatesList" e carrega o arquivo com a lista de templates. Depois, é publicada
    a mensagem contendo a lista dos templates com o tópico "apresentacao/templates/listagem".

    Então, o componente template-selector deve assinar o tópico "apresentacao/templates/listagem",
    para receber a lista de templates.
    <template-selector-oid subscribe="apresentacao/templates/listagem~selector"> </template-selector-oid>
*/

import { css, html, Oid, OidUI } from "/lib/oidlib-dev.js";
import { generate as uuid } from "short-uuid";

export class TemplateSelector extends OidUI {
    handleSelector (topic, message) {
      this.value = message.value;
    }

    _onClick(event) {
      const poppover = this.shadowRoot.querySelector(".hidden");

      poppover.classList.remove("hidden");
    }

    template() {
      const uniqueID = uuid();  //gera um ID único para o TemplateSelector
      let partial = "";
      
      for (let obj of this.value) {

        partial += `
        <div class="flex items-center space-x-2">
            <input type="radio" id="${uniqueID}-${obj.template}" name="${uniqueID}" value="${obj.template}" aria-checked="false" data-state="unchecked" class="accent-accent-foreground aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" tabindex="-1" data-radix-collection-item=""></button>
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="${uniqueID}-${obj.template}">${obj.template}</label>
        </div>
        `;
      }
    
      return html`
      <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="${uniqueID}">Template Selector</label>
      <div role="radiogroup" aria-required="false" dir="ltr" class="grid gap-2" tabindex="0" style="outline: none;">
          ${partial}
      </div>
      `;
    }
  }

Oid.component(
    {
      id: 'wf:template-selector',
      element: 'template-selector-oid',
      properties: {
        value: {default: []}
      },
      receive: ['selector'],
      implementation: TemplateSelector,
      stylesheet: ['/style.css']
    })