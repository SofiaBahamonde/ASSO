import { SimpleDrawDocument } from './document'
import { CanvasRender, SVGRender } from './render';
import {Interpreter} from './interperter';

const canvasrender = new CanvasRender()
const svgrender = new SVGRender()

const sdd = new SimpleDrawDocument()
// const c1 = sdd.createCircle([100, 100], 30)
// const r1 = sdd.createRectangle([10, 10], 80, 80)
// const r2 = sdd.createRectangle([30, 30], 40, 40)
// const t1 = sdd.createPolygon([150, 100, 200, 400, 300, 200])
// const t2 = sdd.createPolygon([50,50,70,70,90,50])
// const t3 = sdd.createPolygon([50,50,70,70,90,50])
// const p1 = sdd.createPolygon([ 200,50, 250,10, 400,200, 200,200 ])

// const s1 = sdd.createSelection(c1, r1, r2)
// sdd.translate(p1, 10, 10) 
// sdd.rotate(t2,Math.PI/3)
// sdd.rotate(r1,Math.PI/3)

var consoleBtn = <HTMLButtonElement> document.getElementById("submit");
var undoBtn = <HTMLButtonElement> document.getElementById("undo");
var redoBtn = <HTMLButtonElement> document.getElementById("redo");

var input = <HTMLInputElement> document.getElementById("console-input");


consoleBtn.addEventListener("click", () => {
    let command : string = input.value;
    let context :Interpreter.Context = new Interpreter.Context(sdd, canvasrender, svgrender, command); 
    let expression : Interpreter.CommandExpression = new Interpreter.CommandExpression(command[0]);
    expression.interpret(context)
});

undoBtn.addEventListener("click", () => {
    sdd.undo();
    sdd.draw(canvasrender)
    sdd.draw(svgrender)
});

redoBtn.addEventListener("click", () => {
    sdd.redo();
    sdd.draw(canvasrender)
    sdd.draw(svgrender)
});



//  sdd.draw(canvasrender)
//  sdd.draw(svgrender)