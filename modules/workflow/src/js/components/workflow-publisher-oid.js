import { html, Oid, OidWeb } from "/lib/oidlib-dev.js";
import { GraphOutMessageParser } from "../utils/bus/graph-out-message.js";
import { WorldSpace } from "/modules/workflow/src/js/components/world-space.js";

class WorkflowPublisherOid extends OidWeb {
    handleExport() {
        const message = GraphOutMessageParser.parseGraph(WorldSpace.onWorldSpaceComponents);
        
        this._notify('export', message);
    }
}

Oid.component(
    {
        id:'wf:workflow-publisher-oid',
        element:'workflow-publisher-oid',
        properties: {
        },
        implementation: WorkflowPublisherOid,
        receive: ['export'],
        stylesheet: ['/style.css']
    }
)

export { WorkflowPublisherOid };