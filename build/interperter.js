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
    class TerminalExpression {
    }
    class RectangleArgumentsExpression extends TerminalExpression {
        interpret(context) {
            let x = parseInt(context.command[2]);
            let y = parseInt(context.command[3]);
            let width = parseInt(context.command[4]);
            let height = parseInt(context.command[5]);
            context.document.createRectangle([x, y], width, height);
            context.document.draw(context.canvas);
            context.document.draw(context.svg);
        }
    }
    Interpreter.RectangleArgumentsExpression = RectangleArgumentsExpression;
    class NonterminalExpression {
    }
    class CommandExpression extends NonterminalExpression {
        interpret(context) {
            switch (context.command[0]) {
                case 'draw':
                    let objectExpression = new ObjectExpression();
                    objectExpression.interpret(context);
                    break;
                default:
                    break;
            }
        }
    }
    Interpreter.CommandExpression = CommandExpression;
    class ObjectExpression extends NonterminalExpression {
        interpret(context) {
            switch (context.command[1]) {
                case 'rectangle':
                    let rectangleExpression = new RectangleArgumentsExpression();
                    rectangleExpression.interpret(context);
                    break;
                default:
                    break;
            }
        }
    }
})(Interpreter = exports.Interpreter || (exports.Interpreter = {}));
//# sourceMappingURL=interperter.js.map