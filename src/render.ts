import { Shape, Circle, Rectangle, Triangle } from "./shape"

export interface Render {
    draw(...objs: Array<Shape>): void
}

export class SVGRender implements Render {
    svg: HTMLElement

    constructor() {
        this.svg = <HTMLElement>document.getElementById('svgcanvas')
    }

    draw(...objs: Array<Shape>): void {
        for (const shape of objs) {
            if (shape instanceof Rectangle) {
                const e = document.createElementNS("http://www.w3.org/2000/svg", "rect")
                e.setAttribute('style', 'stroke: black; fill: white')
                e.setAttribute('x', shape.x.toString())
                e.setAttribute('y', shape.y.toString())
                e.setAttribute('width', shape.width.toString())
                e.setAttribute('height', shape.height.toString())
                this.svg.appendChild(e)
            } else if(shape instanceof Circle){
                const c = document.createElementNS("http://www.w3.org/2000/svg", "circle")
                c.setAttribute('style', 'stroke: black; fill: white')
                c.setAttribute("cx",shape.x.toString())
                c.setAttribute("cy",shape.y.toString())
                c.setAttribute("r",shape.radius.toString())
                this.svg.appendChild(c)
            }
        }
    }
}

export class CanvasRender implements Render {
    ctx: CanvasRenderingContext2D

    constructor() {
        const canvas = <HTMLCanvasElement>document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')
    }

    draw(...objs: Array<Shape>): void {
        for (const shape of objs) {
            if (shape instanceof Circle) {
                this.ctx.ellipse(shape.x, shape.y, shape.radius, shape.radius, 0, 0, 2 * Math.PI)
                this.ctx.stroke()
            } else if (shape instanceof Rectangle) {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)   
            } else if (shape instanceof Triangle) {
                this.ctx.moveTo(shape.x,shape.y)
                this.ctx.lineTo(shape.x2,shape.y2)
                this.ctx.lineTo(shape.x3,shape.y3)
                this.ctx.lineTo(shape.x,shape.y)
                this.ctx.stroke()
            }
        }
    }
}