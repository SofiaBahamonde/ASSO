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
//# sourceMappingURL=interperter.js.map