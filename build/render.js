"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shape_1 = require("./shape");
const toolbox_1 = require("./toolbox");
const layer_1 = require("./layer");
class InterfaceRender {
    draw(...elems) {
        console.log("Interface Rendering");
        for (const elem of elems) {
            if (elem instanceof toolbox_1.ToolBox) {
                console.log("Drawing ToolBox");
                var toolbox_html = document.getElementById('tools');
                let tb_html = "";
                elem.getTools().forEach(tool => {
                    // tb_html += "<div onclick=\"clicked_tool('" + tool.name +"')\" > <p> " + tool.name + " </p> </div>"
                    tb_html += "<div > <p> " + tool.name + " </p> </div>";
                });
                toolbox_html.innerHTML = tb_html;
            }
            else if (elem instanceof layer_1.Layers) {
                console.log("Drawing Layers");
                var layers_elem = document.getElementById('layers');
                let layers_html = "<li class=\"page-item disabled\"> <a class=\"page-link\" href=\"#\">&laquo;</a> </li>";
                let active_numb = 1;
                for (let layer_it = 0; layer_it < elem.getLayers().length; layer_it++) {
                    if (layer_it == active_numb)
                        layers_html += "<li class=\"page-item active\"> <a class=\"page-link\" href=\"#\"> " + elem.getLayers()[layer_it].pos + " </a> </li>";
                    else
                        layers_html += "<li class=\"page-item\"> <a class=\"page-link\" href=\"#\"> " + elem.getLayers()[layer_it].pos + " </a> </li>";
                }
                layers_elem.innerHTML = layers_html + " <li class=\"page-item\"> <a class=\"page-link\" href=\"#\">&raquo;</a> </li> ";
            }
        }
    }
}
exports.InterfaceRender = InterfaceRender;
class Render {
    constructor(drawAPI) {
        this.drawAPI = drawAPI;
    }
    draw(objs) {
        this.drawAPI.draw(...objs);
    }
    zoom(factor, positive) {
        this.drawAPI.zoom(factor, positive);
    }
    setDrawAPI(dapi) {
        this.drawAPI = dapi;
    }
    getDrawAPI() {
        return this.drawAPI;
    }
}
exports.Render = Render;
class SVGAPI {
    constructor() {
        this.factor = 300;
    }
    draw(...objs) {
        var svg = document.getElementById('svgcanvas');
        var xmlns = "http://www.w3.org/2000/svg";
        var svgElem = document.createElementNS(xmlns, "svg");
        svgElem.setAttributeNS(null, "id", "svgcanvas");
        svgElem.setAttributeNS(null, "width", '300');
        svgElem.setAttributeNS(null, "height", '300');
        svgElem.setAttributeNS(null, "style", "border: 2px solid black; border-radius: 5px 5px 5px 5px/25px 25px 25px 5px;");
        svgElem.setAttributeNS(null, "viewBox", "0 0 " + this.factor + " " + this.factor);
        svg.remove();
        document.getElementById("all_canvas").appendChild(svgElem);
        svg = document.getElementById('svgcanvas');
        for (const shape of objs) {
            if (shape instanceof shape_1.Circle) {
                const circle = document.createElementNS(xmlns, "circle");
                if (shape.hightlighted)
                    circle.setAttribute('style', 'stroke: red; fill: white');
                else
                    circle.setAttribute('style', 'stroke: black; fill: white');
                circle.setAttribute("cx", shape.points[0].toString());
                circle.setAttribute("cy", shape.points[1].toString());
                circle.setAttribute("r", shape.radius.toString());
                svg.appendChild(circle);
            }
            else if (shape instanceof shape_1.Polygon || shape instanceof shape_1.Rectangle) {
                const polygon = document.createElementNS(xmlns, "polygon");
                if (shape.hightlighted)
                    polygon.setAttribute('style', 'stroke: red; fill: white');
                else
                    polygon.setAttribute('style', 'stroke: black; fill: white');
                var textPoints = '';
                for (var item = 0; item < shape.points.length - 1; item += 2)
                    textPoints += shape.points[item] + ',' + shape.points[item + 1] + ' ';
                polygon.setAttribute('points', textPoints);
                svg.appendChild(polygon);
            }
        }
    }
    zoom(factor, positive) {
        if (positive)
            this.factor = 300 / factor;
        else
            this.factor = this.factor * factor;
    }
}
class SVGRender extends Render {
    constructor() {
        super(new SVGAPI());
    }
}
exports.SVGRender = SVGRender;
class WireFrameAPI {
    draw(...objs) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const shape of objs) {
            if (shape instanceof shape_1.Circle) {
                this.ctx.beginPath();
                this.ctx.arc(shape.points[0], shape.points[1], shape.radius, 0, 2 * Math.PI);
                this.ctx.closePath();
                if (shape.hightlighted) {
                    this.ctx.strokeStyle = "red";
                }
                this.ctx.stroke();
                if (shape.hightlighted) {
                    this.ctx.strokeStyle = "grey";
                }
            }
            else if (shape instanceof shape_1.Polygon || shape instanceof shape_1.Rectangle) {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.points[0], shape.points[1]);
                for (var item = 2; item < shape.points.length - 1; item += 2) {
                    this.ctx.lineTo(shape.points[item], shape.points[item + 1]);
                }
                this.ctx.closePath();
                if (shape.hightlighted) {
                    this.ctx.strokeStyle = "red";
                }
                this.ctx.stroke();
                if (shape.hightlighted) {
                    this.ctx.strokeStyle = "grey";
                }
            }
        }
    }
    zoom(factor, positive) {
        console.log(factor);
        console.log(1 / factor);
        if (positive) {
            this.ctx.scale(1 / this.factor, 1 / this.factor);
            this.ctx.scale(factor, factor);
        }
        else {
            this.ctx.scale(1 / factor, 1 / factor);
        }
        this.factor = factor;
    }
}
exports.WireFrameAPI = WireFrameAPI;
class CanvasRender extends Render {
    constructor(drawAPI) {
        super(drawAPI);
    }
}
exports.CanvasRender = CanvasRender;
//# sourceMappingURL=render.js.map