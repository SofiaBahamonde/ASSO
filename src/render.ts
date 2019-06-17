import { Shape, Circle, Rectangle, Polygon } from "./shape"


import { InterfaceObj } from "./interfaceobj";
import { ToolBox } from "./toolbox";
import { Layers } from "./layer";


export class InterfaceRender{
    draw(...elems: Array<InterfaceObj>): void {


        console.log("Interface Rendering")

            for (const elem of elems) {
                
                if (elem instanceof ToolBox) {
                    
                    console.log("Drawing ToolBox")
                    var toolbox_html = <HTMLElement>document.getElementById('tools')
                    let tb_html = ""

                    elem.getTools().forEach(tool => {
                        
                       // tb_html += "<div onclick=\"clicked_tool('" + tool.name +"')\" > <p> " + tool.name + " </p> </div>"
                       tb_html += "<div > <p> " + tool.name + " </p> </div>"

                    });

                    
                    toolbox_html.innerHTML = tb_html

                } else if(elem instanceof Layers){

                console.log("Drawing Layers")

                var layers_elem = <HTMLElement>document.getElementById('layers')
                let layers_html = "<li class=\"page-item disabled\"> <a class=\"page-link\" href=\"#\">&laquo;</a> </li>"

                let active_numb = 1

                for (let layer_it = 0; layer_it < elem.getLayers().length; layer_it++) {

                    if(layer_it == active_numb)
                        layers_html += "<li class=\"page-item active\"> <a class=\"page-link\" href=\"#\"> " + elem.getLayers()[layer_it].pos + " </a> </li>"
                    else
                        layers_html += "<li class=\"page-item\"> <a class=\"page-link\" href=\"#\"> " + elem.getLayers()[layer_it].pos + " </a> </li>"
                }

                layers_elem.innerHTML = layers_html + " <li class=\"page-item\"> <a class=\"page-link\" href=\"#\">&raquo;</a> </li> "

            } 

        }


    }
}

// Bridge Design Pattern with strategy mixed in
export interface DrawAPI {

    draw( ...objs: Array<Shape>): void

    zoom(scale : number, positive:boolean): void
}

export abstract class Render {

    constructor(private drawAPI:DrawAPI){
    }

    draw(objs: Array<Shape>): void {
        this.drawAPI.draw(...objs)
    }

    zoom(factor : number, positive:boolean){
        this.drawAPI.zoom(factor, positive);
    }

    setDrawAPI(dapi:DrawAPI){
        this.drawAPI = dapi
    }

    getDrawAPI(): DrawAPI{
        return this.drawAPI
    }
}

class SVGAPI implements DrawAPI{

    factor: number = 300;

    draw(...objs: Array<Shape>): void {
        var svg =  <HTMLElement>document.getElementById('svgcanvas');
        var xmlns = "http://www.w3.org/2000/svg";
            
        var svgElem = document.createElementNS (xmlns, "svg");
        svgElem.setAttributeNS (null, "id", "svgcanvas");
        svgElem.setAttributeNS (null, "width", '300');
        svgElem.setAttributeNS (null, "height", '300');
        svgElem.setAttributeNS (null, "style", "border: 2px solid black; border-radius: 5px 5px 5px 5px/25px 25px 25px 5px;");
        svgElem.setAttributeNS (null, "viewBox", "0 0 " + this.factor + " " + this.factor)

        svg.remove();
        document.getElementById("all_canvas").appendChild(svgElem);
        svg= document.getElementById('svgcanvas')

        
        for (const shape of objs) {
           
            if(shape instanceof Circle){
                const c = document.createElementNS(xmlns, "circle")
                c.setAttribute('style', 'stroke: black; fill: white')
                c.setAttribute("cx",shape.points[0].toString())
                c.setAttribute("cy",shape.points[1].toString())
                c.setAttribute("r",shape.radius.toString())
                svg.appendChild(c)
            }else if (shape instanceof Polygon || shape instanceof Rectangle) {
                const polygon =  document.createElementNS(xmlns, "polygon")
                polygon.setAttribute('style', 'stroke: black; fill: white')      
                var textPoints = ''                
                for ( var item = 0 ; item < shape.points.length-1 ; item+=2 ) 
                    textPoints +=  shape.points[item] + ',' + shape.points[item+1] + ' '
                polygon.setAttribute('points', textPoints)    
                svg.appendChild(polygon)
                
            }
        }
    }

    zoom(factor: number, positive : boolean){

        if(positive)
            this.factor = 300/factor;
        else    
            this.factor = this.factor * factor;
    }
}

export class SVGRender extends Render {

    constructor() {
        super(new SVGAPI())
    }

}

export class WireFrameAPI implements DrawAPI{

    ctx: CanvasRenderingContext2D
    canvas : any
    factor: number

    draw(...objs: Array<Shape>) {

        this.canvas = <HTMLCanvasElement> document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const shape of objs) {
            if (shape instanceof Circle) {
                this.ctx.beginPath();
                this.ctx.arc(shape.points[0], shape.points[1], shape.radius, 0, 2 * Math.PI);
                this.ctx.closePath()
                this.ctx.stroke()  
            } else if (shape instanceof Polygon || shape instanceof Rectangle) {
                this.ctx.beginPath()
                this.ctx.moveTo(shape.points[0], shape.points[1])
                for( var item = 2 ; item < shape.points.length-1 ; item+=2 )
                {this.ctx.lineTo( shape.points[item] , shape.points[item+1] )}
                this.ctx.closePath()
                this.ctx.stroke()
            }
        }
    }

    zoom(factor: number, positive : boolean){
        console.log(factor)
        console.log(1/factor)
        if(positive){
            this.ctx.scale(1/this.factor, 1/this.factor);
            this.ctx.scale(factor,factor);
        }
        else{
            this.ctx.scale(1/factor,1/factor);
        }

        this.factor = factor;


    }
}


export class CanvasRender extends Render {
    
    constructor(drawAPI:DrawAPI) {
        super(drawAPI)
    }


}