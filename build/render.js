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
        svgElem.setAttributeNS(null, "width", '300');
        svgElem.setAttributeNS(null, "height", '300');
        svgElem.setAttributeNS(null, "style", "border: 2px solid black; border-radius: 5px 5px 5px 5px/25px 25px 25px 5px;");
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
//# sourceMappingURL=render.js.map