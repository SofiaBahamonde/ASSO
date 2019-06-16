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
                    let tb_html = toolbox_html.innerHTML

                    elem.getTools().forEach(tool => {
                        
                        tb_html += "<div> <p> " + tool.name + " </p> </div>"

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


export interface Render {
    draw(...objs: Array<Shape>): void
}

export class SVGRender implements Render {
    svg: HTMLElement

    constructor() {
        this.svg = <HTMLElement>document.getElementById('svgcanvas')
    }

    draw(...objs: Array<Shape>): void {
        var xmlns = "http://www.w3.org/2000/svg";
            
        var svgElem = document.createElementNS (xmlns, "svg");
        svgElem.setAttributeNS (null, "id", "svgcanvas");
        svgElem.setAttributeNS (null, "width", '300');
        svgElem.setAttributeNS (null, "height", '300');
        svgElem.setAttributeNS (null, "style", "border: 2px solid black; border-radius: 5px 5px 5px 5px/25px 25px 25px 5px;");

        this.svg.remove();
        document.getElementById("all_canvas").appendChild(svgElem);
        this.svg = <HTMLElement>document.getElementById('svgcanvas')

        
        for (const shape of objs) {
           
            if (shape instanceof Rectangle) {
                const e = document.createElementNS(xmlns, "rect")
                e.setAttribute('style', 'stroke: black; fill: white')
                e.setAttribute('x', shape.points[0].toString())
                e.setAttribute('y', shape.points[1].toString())
                e.setAttribute('width', shape.width.toString())
                e.setAttribute('height', shape.height.toString())
                this.svg.appendChild(e)
            } else if(shape instanceof Circle){
                const c = document.createElementNS(xmlns, "circle")
                c.setAttribute('style', 'stroke: black; fill: white')
                c.setAttribute("cx",shape.points[0].toString())
                c.setAttribute("cy",shape.points[1].toString())
                c.setAttribute("r",shape.radius.toString())
                this.svg.appendChild(c)
            }
        }
    }
}

export class CanvasRender implements Render {
    ctx: CanvasRenderingContext2D
    canvas : any

    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')
    }

    draw(...objs: Array<Shape>): void {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const shape of objs) {
            if (shape instanceof Circle) {
                this.ctx.ellipse(shape.points[0], shape.points[1], shape.radius, shape.radius, 0, 0, 2 * Math.PI)
                this.ctx.stroke()
            } else if (shape instanceof Rectangle) {
                this.ctx.strokeRect(shape.points[0], shape.points[0], shape.width, shape.height)   
            } else if (shape instanceof Polygon) {

                this.ctx.beginPath()
                this.ctx.moveTo(shape.points[0], shape.points[1])
                for( var item = 2 ; item < shape.points.length-1 ; item+=2 )
                {this.ctx.lineTo( shape.points[item] , shape.points[item+1] )}
                this.ctx.closePath()
                this.ctx.stroke()
            }
        }
    }
}