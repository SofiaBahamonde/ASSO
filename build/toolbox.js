"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ToolBox {
    constructor() { this.tools = new Array(); }
    add(new_tool) {
        this.tools.push(new_tool);
    }
    getTools() {
        return this.tools;
    }
}
exports.ToolBox = ToolBox;
//# sourceMappingURL=toolbox.js.map