import { Vector2, userInputFieldsInfoTemplate } from "./auxiliary-types.js";
import { WorldSpace } from "./world-space.js";
import { WorldSpaceNode } from "./world-space-node.js";
import { NodeInputField } from "./node-input-field.js";
import { WorldSpaceNodeTypes } from "../world-space-node-types.js";

WorldSpaceNodeTypes.fetchNodes();
console.log(WorldSpaceNodeTypes.NodeInfoLib);