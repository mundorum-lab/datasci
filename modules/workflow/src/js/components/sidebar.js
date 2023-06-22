import { html, Oid, OidUI } from "/lib/oidlib-dev.js";


export class NodeListOid extends OidUI {
    /*
    Representa a barra que conterá os nodes para o usuário arrastá-los para o canvas.
    
    */

    connectedCallback() {
        super.connectedCallback();

        // Gets all available nodes from library
        const getNodeInfo = () => { return this._invoke("itf:component-provider", "getAllComponents", { }).then(success, fail) };
        const success = (value) => {
            
            if (value != null) {
                this.categories = value[0];
                console.log(this.categories);
            }
            else {
                setTimeout(getNodeInfo, 1200);
            }
        }
        const fail = (reason) => { console.log(reason); }

        getNodeInfo();
    }

    generateCategories() {
        let partial = "", list;

        if (this.categories == null)
            return "";
        
        for (let category in this.categories) {
            list = "";

            for (let node of this.categories[category]) {
                list += `${node.type}, ${node.name}, ${node.icon} ; `;
            }

            list.slice(0, list.length - 1);
            partial += `
            <sidebar-node-list name="${category}" nodes="${list}">
            </sidebar-node-list>
            `;
        }

        return partial;
    }

    template() {
        const available = this.generateCategories();

        return html`
        <div class="w-64 h-full flex flex-col justify-between gap-4 bg-muted p-6 z-50 opacity-100 shadow-lg border-r">
            <div class="flex flex-col gap-4">
                <span class="text-xl font-semibold mb-4">Nodes</span>
                ${available}
            </div>
            <div class="w-full flex items-center justify-center">
                <!-- O botão abaixo deve disparar um evento para o módulo de apresentação -->
                <!-- fazendo uma requisição da lista de templates. -->
                <button-popover
                label="Select Template"
                publish="click~apresentacao/templates/requisicao; saved~workflow/saved"
                class="grow">
                </button-popover>
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
        </div>
        `;
    }
}

Oid.component(
    {
        id:'wf:node-list-oid',
        element:'node-list-oid',
        properties: {
            categories: {default: null}
        },
        implementation: NodeListOid,
        stylesheet: ['/style.css']
    }
)
