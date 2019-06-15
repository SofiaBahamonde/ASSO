import { SimpleDrawDocument } from './document'
import { CanvasRender, SVGRender } from './render';
import {Interpreter} from './interperter';
import { ToolBox } from './toolbox';
import { MoveTool, PaintTool, ActionParam } from './tool';

function wait(ms:number){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }


const canvasrender = new CanvasRender()
const svgrender = new SVGRender()




const sdd = new SimpleDrawDocument()


var toolbox = new ToolBox()

const movetool = new MoveTool("Move Tool", "movetool.png")
const painttool = new PaintTool("Red", "Paint Tool", "painttool.png")

toolbox.add(movetool)
toolbox.add(painttool)

sdd.setToolBox(toolbox)


const c1 = sdd.createCircle([100, 100], 30)
const r1 = sdd.createRectangle([10, 10], 80, 80)
const r2 = sdd.createRectangle([30, 30], 40, 40)
const t1 = sdd.createTriangle([150, 100, 200, 400, 300, 200])
const p1 = sdd.createPolygon([ 200,50, 250,10, 400,200, 200,200 ])


const act = new ActionParam([[50, 50]], [t1])
movetool.action(act)
 
/* const s1 = sdd.createSelection(c1, r1, r2)
sdd.translate(s1, 10, 10) */

console.log("Hello in Script.ts")

var button = <HTMLButtonElement> document.getElementById("submit");
var input = <HTMLInputElement> document.getElementById("console-input");

if(button){
    button.addEventListener("click", () => {
        let command : string = input.value;
        let context :Interpreter.Context = new Interpreter.Context(sdd, canvasrender, svgrender, command); 
        let expression : Interpreter.CommandExpression = new Interpreter.CommandExpression(command[0]);
        expression.interpret(context)
    })
}

 sdd.draw(canvasrender)
 sdd.draw(svgrender)