"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
const render_1 = require("./render");
const interperter_1 = require("./interperter");
const toolbox_1 = require("./toolbox");
const tool_1 = require("./tool");
const layer_1 = require("./layer");
const sdd = new document_1.SimpleDrawDocument(update);
const canvasrender = new render_1.CanvasRender(new render_1.WireFrameAPI());
const svgrender = new render_1.SVGRender();
const uirender = new render_1.InterfaceRender();
function update() {
    sdd.draw(canvasrender);
    sdd.draw(svgrender);
    sdd.drawUI(uirender);
}
var toolbox = new toolbox_1.ToolBox();
const movetool = new tool_1.MoveTool("Move Tool", "movetool.png");
const painttool = new tool_1.PaintTool("Red", "Paint Tool", "painttool.png");
toolbox.add(movetool);
toolbox.add(painttool);
sdd.addUIElem(toolbox);
const layerui = new layer_1.Layers();
layerui.addLayernew();
layerui.addLayernew();
layerui.addLayernew();
sdd.addUIElem(layerui);
var consoleBtn = document.getElementById("submit");
var undoBtn = document.getElementById("undo");
var redoBtn = document.getElementById("redo");
var input = document.getElementById("console-input");
consoleBtn.addEventListener("click", () => {
    let command = input.value;
    let context = new interperter_1.Interpreter.Context(sdd, canvasrender, svgrender, command);
    let expression = new interperter_1.Interpreter.CommandExpression(command[0]);
    expression.interpret(context);
});
undoBtn.addEventListener("click", () => {
    sdd.undo();
    update();
});
redoBtn.addEventListener("click", () => {
    sdd.redo();
    update();
});
update();
//# sourceMappingURL=script.js.map