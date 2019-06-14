import { SimpleDrawDocument } from './document'
import { CanvasRender  , SVGRender} from './render';

export namespace Interpreter {

    export class Context {
        public document :  SimpleDrawDocument;
        public canvas : CanvasRender;
        public svg : SVGRender
        public command : Array<string>;
        constructor(doc : SimpleDrawDocument, can : CanvasRender, svg : SVGRender, commands : string){
            this.document = doc;
            this.canvas = can;
            this.svg = svg;
            this.command = commands.split(" ");
        }
          
    }
    
    interface AbstractExpression {
        interpret(context: Context): void;
    }

    abstract class TerminalExpression implements AbstractExpression {
        public abstract interpret(context: Context): void 
    }

    export class RectangleArgumentsExpression extends TerminalExpression{
        public interpret(context: Context): void {
            
            let x = parseInt(context.command[2]) 
            let y = parseInt(context.command[3]) 
            let width = parseInt(context.command[4]) 
            let height = parseInt(context.command[5])

            context.document.createRectangle([x, y], width, height)
            context.document.draw(context.canvas);
            context.document.draw(context.svg);
        }
    }

    abstract class NonterminalExpression implements AbstractExpression {
        public abstract interpret(context: Context): void;
    }

    export class CommandExpression extends NonterminalExpression{

        public interpret(context: Context): void {
            switch (context.command[0]) {
                case 'draw':  
                    let objectExpression = new ObjectExpression()
                    objectExpression.interpret(context)
                    break;
            
                default:
                    break;
            }
        }
    }

    class ObjectExpression extends NonterminalExpression{
        public interpret(context: Context): void {
            switch (context.command[1]) {
                case 'rectangle':
                    let rectangleExpression = new RectangleArgumentsExpression()
                    rectangleExpression.interpret(context);  
                    break;
            
                default:
                    break;
            }
        }
    }
}
