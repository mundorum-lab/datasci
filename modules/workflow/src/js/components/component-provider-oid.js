import { Oid, OidWeb } from "/lib/oidlib-dev.js";
import { getAvailableNodes } from "/modules/manifest.js";

class ComponentProviderOid extends OidWeb {

    handleGetAllComponents(topic, message) {
        return this.components;
    }

    handleGetComponentInfo(topic, message) {

        for (let category in this.components) {
            for (let node of this.components[category]) {
                if (node.type == message.value)
                    return node;
            }
        }

        return null;
    }
    
    connectedCallback() {
        super.connectedCallback();

        this.components = getAvailableNodes();
    }
}

Oid.component(
    {
        id:'wf:component-provider-oid',
        element:'component-provider-oid',
        properties: {
            components: {default: null},
        },
        provide: ['itf:component-provider'],
        implementation: ComponentProviderOid,
    }
)

export { ComponentProviderOid };