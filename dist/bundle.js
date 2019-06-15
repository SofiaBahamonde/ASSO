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
class TranslateAction {
    constructor(doc, shape, xd, yd) {
        this.doc = doc;
        this.shape = shape;
        this.xd = xd;
        this.yd = yd;
    }
    do() {
        //this.oldX = this.shape.x
        //this.oldY = this.shape.y
        this.shape.translate(this.xd, this.yd);
    }
    undo() {
        // this.shape.x = this.oldX
        // this.shape.y = this.oldY
        // this.shape.translate(-this.xd, -this.yd)
    }
}
exports.TranslateAction = TranslateAction;
class RotationAction {
    constructor(doc, shape, angle) {
        this.doc = doc;
        this.shape = shape;
        this.angle = angle;
    }
    do() {
        this.shape.rotate(this.angle);
    }
    undo() {
        // this.shape.x = this.oldX
        // this.shape.y = this.oldY
        // this.shape.translate(-this.xd, -this.yd)
    }
}
exports.RotationAction = RotationAction;

},{"./shape":6}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("./actions");
const undo_1 = require("./undo");
class SimpleDrawDocument {
    constructor() {
        this.objects = new Array();
        this.undoManager = new undo_1.UndoManager();
        this.shapeDropbox = document.getElementById("shape-dropbox");
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
        var option = document.createElement("OPTION");
        option.setAttribute("value", r.getID());
        option.innerHTML = r.getID();
        this.shapeDropbox.appendChild(option);
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
    createPolygon(points) {
        return this.do(new actions_1.CreatePolygonAction(this, points));
    }
    translate(s, xd, yd) {
        return this.do(new actions_1.TranslateAction(this, s, xd, yd));
    }
    rotate(s, angle) {
        return this.do(new actions_1.RotationAction(this, s, angle));
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
                    let rectangleExpression = new RectangleExpression(context.command[2], context.command[3], context.command[4], context.command[5]);
                    rectangleExpression.interpret(context);
                    break;
                case 'circle':
                    let circleExpression = new CircleExpression(context.command[2], context.command[3], context.command[4]);
                    circleExpression.interpret(context);
                    break;
                case 'triangle':
                    let triangleExpression = new PolygonExpression(context.command);
                    triangleExpression.interpret(context);
                    break;
                case 'polygon':
                    let polygonExpression = new PolygonExpression(context.command);
                    polygonExpression.interpret(context);
                    break;
                default:
                    break;
            }
        }
    }
    class RectangleExpression {
        constructor(x, y, width, height) {
            this.x = parseInt(x);
            this.y = parseInt(y);
            this.width = parseInt(width);
            this.height = parseInt(height);
        }
        interpret(context) {
            context.document.createRectangle([this.x, this.y], this.width, this.height);
        }
    }
    Interpreter.RectangleExpression = RectangleExpression;
    class CircleExpression {
        constructor(x, y, radius) {
            this.x = parseInt(x);
            this.y = parseInt(y);
            this.radius = parseInt(radius);
        }
        interpret(context) {
            context.document.createCircle([this.x, this.y], this.radius);
        }
    }
    Interpreter.CircleExpression = CircleExpression;
    class PolygonExpression {
        constructor(command) {
            this.points = [];
            for (var i = 2; i < command.length; i++) {
                this.points.push(parseInt(command[i]));
            }
            console.log(this.points);
        }
        interpret(context) {
            context.document.createPolygon(this.points);
        }
    }
    Interpreter.PolygonExpression = PolygonExpression;
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
        var xmlns = "http://www.w3.org/2000/svg";
        var svgElem = document.createElementNS(xmlns, "svg");
        svgElem.setAttributeNS(null, "id", "svgcanvas");
        svgElem.setAttributeNS(null, "width", '400');
        svgElem.setAttributeNS(null, "height", '400');
        svgElem.setAttributeNS(null, "style", "border: 1px solid blue;");
        this.svg.remove();
        document.getElementById("all_canvas").appendChild(svgElem);
        this.svg = document.getElementById('svgcanvas');
        for (const shape of objs) {
            if (shape instanceof shape_1.Rectangle) {
                const e = document.createElementNS(xmlns, "rect");
                e.setAttribute('style', 'stroke: black; fill: white');
                e.setAttribute('x', shape.points[0].toString());
                e.setAttribute('y', shape.points[1].toString());
                e.setAttribute('width', shape.width.toString());
                e.setAttribute('height', shape.height.toString());
                this.svg.appendChild(e);
            }
            else if (shape instanceof shape_1.Circle) {
                const c = document.createElementNS(xmlns, "circle");
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
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }
    draw(...objs) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const shape of objs) {
            if (shape instanceof shape_1.Circle) {
                this.ctx.ellipse(shape.points[0], shape.points[1], shape.radius, shape.radius, 0, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
            else if (shape instanceof shape_1.Rectangle) {
                this.ctx.strokeRect(shape.points[0], shape.points[0], shape.width, shape.height);
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

},{"./document":2,"./interperter":3,"./render":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    constructor(points) {
        this.points = points;
    }
    //translation with array of points 
    translate(xd, yd) {
        for (var item = 0; item < this.points.length - 1; item += 2) {
            this.points[item] += xd;
            this.points[item + 1] += yd;
        }
    }
    rotate(angle) {
        for (var item = 0; item < this.points.length - 1; item += 2) {
            // this.points[item] = Math.cos(angle) - Math.sin(angle) + this.points[item]*(1-Math.cos(angle))+this.points[item+1]*Math.sin(angle)
            //this.points[item+1] =  Math.sin(angle) + Math.cos(angle) + this.points[item+1]*(1-Math.cos(angle))-this.points[item+1]*Math.sin(angle)
            this.points[item] = this.points[item] * Math.cos(angle) - this.points[item + 1] * Math.sin(angle);
            this.points[item + 1] = this.points[item + 1] * Math.sin(angle) + this.points[item] * Math.cos(angle);
        }
    }
}
exports.Shape = Shape;
class Rectangle extends Shape {
    constructor(points, width, height) {
        super(points);
        this.points = points;
        this.width = width;
        this.height = height;
        this.id = Circle.idCounter++;
    }
    getID() {
        return "rect_" + this.id;
    }
}
Rectangle.idCounter = 0;
exports.Rectangle = Rectangle;
class Circle extends Shape {
    constructor(points, radius) {
        super(points);
        this.points = points;
        this.radius = radius;
        this.id = Circle.idCounter++;
    }
    getID() {
        return "circle_" + this.id;
    }
}
Circle.idCounter = 0;
exports.Circle = Circle;
class Polygon extends Shape {
    constructor(points) {
        super(points);
        this.points = points;
        this.id = Circle.idCounter++;
    }
    getID() {
        return "polygon_" + this.id;
    }
}
Polygon.idCounter = 0;
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
