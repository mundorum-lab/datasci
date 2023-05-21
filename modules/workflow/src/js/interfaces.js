import { Oid } from "./oidlib-dev.js";

Oid.cInterface ({
    id: 'itf:node-view',
    operations: ['getPosition', 'setPosition', 'getUserFields','getInputParameterValue','setInputParameterValue'],
    cardinality: '1:1',
    response: false
});
    /*Interfaces:

    ISpaceTransform 
    'handleGetPosition', 'hangleSetPosition'

    IHasUserFields
    'handleGetUserFields'
    
    IUserInputFields
    'handleGetInputParameterValue','handleSetInputParameterValue'

    IConnectableComponent
    'MakeConnectionTo' , 'ReceiveConnectionFrom'

    */