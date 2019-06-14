(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shape_1 = require("./shape");
class CreateShapeAction {
    constructor(doc, shape) {
        this.doc = doc;
        this.shape = shape;
    }
    do() {
        this.doc.add(this.shape);
        return this.shape;
    }
    undo() {
        this.doc.objects = this.doc.objects.filter(o => o !== this.shape);
    }
}
class CreateTriangleAction extends CreateShapeAction {
    constructor(doc, points) {
        super(doc, new shape_1.Triangle(points));
        this.points = points;
    }
}
exports.CreateTriangleAction = CreateTriangleAction;
class CreateCircleAction extends CreateShapeAction {
    constructor(doc, points, radius) {
        super(doc, new shape_1.Circle(points, radius));
        this.points = points;
        this.radius = radius;
    }
}
exports.CreateCircleAction = CreateCircleAction;
class CreatePolygonAction extends CreateShapeAction {
    constructor(doc, points) {
        super(doc, new shape_1.Polygon(points));
        this.points = points;
    }
}
exports.CreatePolygonAction = CreatePolygonAction;
class CreateRectangleAction extends CreateShapeAction {
    constructor(doc, points, width, height) {
        super(doc, new shape_1.Rectangle(points, width, height));
        this.points = points;
        this.width = width;
        this.height = height;
    }
}
exports.CreateRectangleAction = CreateRectangleAction;
/*
export class TranslateAction implements Action<void> {
    oldX: number
    oldY: number

    constructor(private doc: SimpleDrawDocument, public shape: Shape, private xd: number, private yd: number) { }

    
    do(): void {
        this.oldX = this.shape.x
        this.oldY = this.shape.y
        this.shape.translate(this.xd, this.yd)
    }

    undo() {
        this.shape.x = this.oldX
        this.shape.y = this.oldY
       // this.shape.translate(-this.xd, -this.yd)
    }
}*/ 

},{"./shape":6}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("./actions");
const undo_1 = require("./undo");
class SimpleDrawDocument {
    constructor() {
        this.objects = new Array();
        this.undoManager = new undo_1.UndoManager();
        // translate(s: Shape, xd: number, yd: number): void {
        //     return this.do(new TranslateAction(this, s, xd, yd))
        // }
    }
    undo() {
        this.undoManager.undo();
    }
    redo() {
        this.undoManager.redo();
    }
    draw(render) {
        // this.objects.forEach(o => o.draw(ctx))
        render.draw(...this.objects);
    }
    add(r) {
        this.objects.push(r);
    }
    do(a) {
        this.undoManager.onActionDone(a);
        return a.do();
    }
    createRectangle(points, width, height) {
        return this.do(new actions_1.CreateRectangleAction(this, points, width, height));
    }
    createCircle(points, radius) {
        return this.do(new actions_1.CreateCircleAction(this, points, radius));
    }
    createTriangle(points) {
        return this.do(new actions_1.CreateTriangleAction(this, points));
    }
    createPolygon(points) {
        return this.do(new actions_1.CreatePolygonAction(this, points));
    }
}
exports.SimpleDrawDocument = SimpleDrawDocument;

},{"./actions":1,"./undo":7}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interpreter;
(function (Interpreter) {
    class Context {
        constructor(doc, can, svg, commands) {
            this.document = doc;
            this.canvas = can;
            this.svg = svg;
            this.command = commands.split(" ");
        }
    }
    Interpreter.Context = Context;
    class RectangleExpression {
        interpret(context) {
            let x = parseInt(context.command[2]);
            let y = parseInt(context.command[3]);
            let width = parseInt(context.command[4]);
            let height = parseInt(context.command[5]);
            context.document.createRectangle([x, y], width, height);
        }
    }
    Interpreter.RectangleExpression = RectangleExpression;
    class CommandExpression {
        constructor(cmd) {
            this.command = cmd;
        }
        interpret(context) {
            switch (context.command[0]) {
                case 'draw':
                    let objectExpression = new ShapeExpression(context.command[1]);
                    objectExpression.interpret(context);
                    context.document.draw(context.canvas);
                    context.document.draw(context.svg);
                    break;
                default:
                    break;
            }
        }
    }
    Interpreter.CommandExpression = CommandExpression;
    class ShapeExpression {
        constructor(shape) {
            this.shape = shape;
        }
        interpret(context) {
            switch (this.shape) {
                case 'rectangle':
                    let rectangleExpression = new RectangleExpression();
                    rectangleExpression.interpret(context);
                    break;
                default:
                    break;
            }
        }
    }
})(Interpreter = exports.Interpreter || (exports.Interpreter = {}));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shape_1 = require("./shape");
class SVGRender {
    constructor() {
        this.svg = document.getElementById('svgcanvas');
    }
    draw(...objs) {
        for (const shape of objs) {
            if (shape instanceof shape_1.Rectangle) {
                const e = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                e.setAttribute('style', 'stroke: black; fill: white');
                e.setAttribute('x', shape.points[0].toString());
                e.setAttribute('y', shape.points[1].toString());
                e.setAttribute('width', shape.width.toString());
                e.setAttribute('height', shape.height.toString());
                this.svg.appendChild(e);
            }
            else if (shape instanceof shape_1.Circle) {
                const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                c.setAttribute('style', 'stroke: black; fill: white');
                c.setAttribute("cx", shape.points[0].toString());
                c.setAttribute("cy", shape.points[1].toString());
                c.setAttribute("r", shape.radius.toString());
                this.svg.appendChild(c);
            }
        }
    }
}
exports.SVGRender = SVGRender;
class CanvasRender {
    constructor() {
        const canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
    }
    draw(...objs) {
        for (const shape of objs) {
            if (shape instanceof shape_1.Circle) {
                this.ctx.ellipse(shape.points[0], shape.points[1], shape.radius, shape.radius, 0, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
            else if (shape instanceof shape_1.Rectangle) {
                this.ctx.strokeRect(shape.points[0], shape.points[0], shape.width, shape.height);
            }
            else if (shape instanceof shape_1.Triangle) {
                this.ctx.moveTo(shape.points[0], shape.points[1]);
                this.ctx.lineTo(shape.points[2], shape.points[3]);
                this.ctx.lineTo(shape.points[4], shape.points[5]);
                this.ctx.lineTo(shape.points[0], shape.points[1]);
                this.ctx.stroke();
            }
            else if (shape instanceof shape_1.Polygon) {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.points[0], shape.points[1]);
                for (var item = 2; item < shape.points.length - 1; item += 2) {
                    this.ctx.lineTo(shape.points[item], shape.points[item + 1]);
                }
                this.ctx.closePath();
                this.ctx.stroke();
            }
        }
    }
}
exports.CanvasRender = CanvasRender;

},{"./shape":6}],5:[function(require,module,exports){
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
// const p1 = sdd.createPolygon([ 200,50, 250,10, 400,200, 200,200 ])
/* const s1 = sdd.createSelection(c1, r1, r2)
sdd.translate(s1, 10, 10) */
console.log("Hello in Script.ts");
var button = document.getElementById("submit");
var input = document.getElementById("console-input");
if (button) {
    button.addEventListener("click", () => {
        let command = input.value;
        let context = new interperter_1.Interpreter.Context(sdd, canvasrender, svgrender, command);
        let expression = new interperter_1.Interpreter.CommandExpression(command[0]);
        expression.interpret(context);
    });
}
// sdd.draw(canvasrender)
// sdd.draw(svgrender)

},{"./document":2,"./interperter":3,"./render":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    constructor(points) {
        this.points = points;
    }
}
exports.Shape = Shape;
class Rectangle extends Shape {
    constructor(points, width, height) {
        super(points);
        this.points = points;
        this.width = width;
        this.height = height;
    }
}
exports.Rectangle = Rectangle;
class Circle extends Shape {
    constructor(points, radius) {
        super(points);
        this.points = points;
        this.radius = radius;
    }
}
exports.Circle = Circle;
class Triangle extends Shape {
    constructor(points) {
        super(points);
        this.points = points;
    }
}
exports.Triangle = Triangle;
class Polygon extends Shape {
    constructor(points) {
        super(points);
        this.points = points;
    }
}
exports.Polygon = Polygon;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UndoManager {
    constructor() {
        this.doStack = new Array();
        this.undoStack = new Array();
    }
    undo() {
        if (this.doStack.length > 0) {
            const a1 = this.doStack.pop();
            a1.undo();
            this.undoStack.push(a1);
        }
    }
    redo() {
        if (this.undoStack.length > 0) {
            const a1 = this.undoStack.pop();
            a1.do();
            this.doStack.push(a1);
        }
    }
    onActionDone(a) {
        this.doStack.push(a);
        this.undoStack.length = 0;
    }
}
exports.UndoManager = UndoManager;

},{}]},{},[5]);
