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
//# sourceMappingURL=interperter.js.map