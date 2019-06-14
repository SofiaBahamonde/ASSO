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

    export class RectangleExpression implements AbstractExpression{

        public interpret(context: Context): void {
            
            let x = parseInt(context.command[2]) 
            let y = parseInt(context.command[3]) 
            let width = parseInt(context.command[4]) 
            let height = parseInt(context.command[5])

            context.document.createRectangle([x, y], width, height)
 
        }
    }

    export class CommandExpression implements AbstractExpression{
        private command : String;

        constructor(cmd : String) { 
            this.command = cmd;
        }

        public interpret(context: Context): void {
            switch (context.command[0]) {
                case 'draw':  
                    let objectExpression = new ShapeExpression(context.command[1])
                    objectExpression.interpret(context)

                    context.document.draw(context.canvas);
                    context.document.draw(context.svg);
                    break;
            
                default:
                    break;
            }
        }
    }

    class ShapeExpression implements AbstractExpression{
        private shape : String;

        constructor(shape : String) { 
            this.shape = shape;
        }

        public interpret(context: Context): void {
            switch (this.shape) {
                case 'rectangle':
                    let rectangleExpression = new RectangleExpression()
                    rectangleExpression.interpret(context);  
                    break;
            
                default:
                    break;
            }
        }
    }
}
