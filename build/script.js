"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
const render_1 = require("./render");
const interperter_1 = require("./interperter");
const canvasrender = new render_1.CanvasRender();
const svgrender = new render_1.SVGRender();
const sdd = new document_1.SimpleDrawDocument();
// const c1 = sdd.createCircle([100, 100], 30)
// const r1 = sdd.createRectangle([10, 10], 80, 80)
// const r2 = sdd.createRectangle([30, 30], 40, 40)
// const t1 = sdd.createTriangle([150, 100, 200, 400, 300, 200])
// const t2 = sdd.createTriangle([50,50,70,70,90,50])
// const p1 = sdd.createPolygon([ 200,50, 250,10, 400,200, 200,200 ])
//const s1 = sdd.createSelection(c1, r1, r2)
// sdd.translate(p1, 10, 10) 
// sdd.rotate(t2,Math.PI/3)
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
    sdd.draw(canvasrender);
    sdd.draw(svgrender);
});
redoBtn.addEventListener("click", () => {
    sdd.redo();
    sdd.draw(canvasrender);
    sdd.draw(svgrender);
});
// sdd.draw(canvasrender)
// sdd.draw(svgrender)
//# sourceMappingURL=script.js.map