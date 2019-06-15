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
    
    interface Expression {
        interpret(context: Context): void;
    }

    export class CommandExpression implements Expression{
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

    class ShapeExpression implements Expression{
        private shape : String;

        constructor(shape : String) { 
            this.shape = shape;
        }

        public interpret(context: Context): void {
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

    export class RectangleExpression implements Expression{

        private x : number;
        private y : number;
        private width : number;
        private height : number;

        constructor(x: string, y: string, width: string, height: string){
            this.x = parseInt(x);
            this.y = parseInt(y);
            this.width = parseInt(width);
            this.height = parseInt(height);
        }

        public interpret(context: Context): void {

            context.document.createRectangle([this.x, this.y], this.width, this.height)
 
        }
    }

    export class CircleExpression implements Expression{
        private x : number;
        private y : number;
        private radius : number;

        constructor(x: string, y: string, radius : string){
            this.x = parseInt(x);
            this.y = parseInt(y);
            this.radius = parseInt (radius);
        }

        public interpret(context: Context): void{
            context.document.createCircle([this.x, this.y], this.radius);
        }
    }

    export class PolygonExpression implements Expression{

        protected points : Array<number>;

        constructor(command : Array<string>){
            this.points = [];

            for(var i = 2; i < command.length; i++){
                this.points.push(parseInt(command[i]));
            }

            console.log(this.points);
        }

        public interpret(context: Context): void {

            context.document.createPolygon(this.points);
 
        }
    }

}
