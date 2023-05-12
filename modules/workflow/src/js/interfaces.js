import { Oid } from "./oidlib-dev.js";

Oid.cInterface ({
    id: 'itf:node-view',
    operations: ['getPosition', 'setPosition', 'getParameters', 'setParameters'],
    cardinality: '1:1',
    response: false
});