import { html, Oid, OidUI } from "/lib/oidlib-dev.js";
import { GraphOutMessageParser } from "../utils/bus/graph-out-message.js";
import { WorldSpace } from "/modules/workflow/src/js/components/world-space.js";

class WorkflowPublisherOid extends OidUI {
    _onClick() {
        const message = GraphOutMessageParser.parseGraph(WorldSpace.onWorldSpaceComponents);
        
        this._notify('export', message);
    }

    template () {
        return html`
        <button @click={{this._onClick}} class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
            Executar
        </button>
        `;
    }
}

Oid.component(
    {
        id:'wf:workflow-publisher-oid',
        element:'workflow-publisher-oid',
        properties: {
        },
        implementation: WorkflowPublisherOid,
        stylesheet: ['/style.css']
    }
)

export { WorkflowPublisherOid };