"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
const render_1 = require("./render");
const interperter_1 = require("./interperter");
const toolbox_1 = require("./toolbox");
const tool_1 = require("./tool");
const layer_1 = require("./layer");
const fileio_1 = require("./fileio");
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
var importbtn = document.getElementById("import");
var exportbtn = document.getElementById("export");
var format_box = document.getElementById("format-dropbox");
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
var BMPexp = new fileio_1.BMP(100, 100);
var XMLexp = new fileio_1.XML();
var option = document.createElement("OPTION");
option.setAttribute("value", "BMP");
option.innerHTML = "BMP";
format_box.appendChild(option);
var option = document.createElement("OPTION");
option.setAttribute("value", "XML");
option.innerHTML = "XML";
format_box.appendChild(option);
function retFileIO(name) {
    if (name == "BMP")
        return BMPexp;
    else if (name == "XML")
        return XMLexp;
    return null;
}
importbtn.addEventListener("click", () => {
    sdd.import(retFileIO(format_box.value));
    update();
});
exportbtn.addEventListener("click", () => {
    sdd.export(retFileIO(format_box.value));
});
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    return [x, y];
}
const canvas = document.querySelector('canvas');
canvas.addEventListener('mousedown', function (e) {
    const pos = getCursorPosition(canvas, e);
    sdd.canvasNotification(pos[0], pos[1]);
});
function clicked_tool(tool_name) {
    console.log("on script.ts clicked tool");
    sdd.clicked_tool(tool_name);
}
exports.clicked_tool = clicked_tool;
update();
sdd.setToolListeners();
//# sourceMappingURL=script.js.map