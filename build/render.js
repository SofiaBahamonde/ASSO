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
                let tb_html = toolbox_html.innerHTML;
                elem.getTools().forEach(tool => {
                    tb_html += "<div> <p> " + tool.name + " </p> </div>";
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
    setDrawAPI(dapi) {
        this.drawAPI = dapi;
    }
    getDrawAPI() {
        return this.drawAPI;
    }
}
exports.Render = Render;
class SVGAPI {
    draw(...objs) {
        var svg = document.getElementById('svgcanvas');
        var xmlns = "http://www.w3.org/2000/svg";
        var svgElem = document.createElementNS(xmlns, "svg");
        svgElem.setAttributeNS(null, "id", "svgcanvas");
        svgElem.setAttributeNS(null, "width", '300');
        svgElem.setAttributeNS(null, "height", '300');
        svgElem.setAttributeNS(null, "style", "border: 2px solid black; border-radius: 5px 5px 5px 5px/25px 25px 25px 5px;");
        svg.remove();
        document.getElementById("all_canvas").appendChild(svgElem);
        svg = document.getElementById('svgcanvas');
        for (const shape of objs) {
            if (shape instanceof shape_1.Rectangle) {
                const e = document.createElementNS(xmlns, "rect");
                e.setAttribute('style', 'stroke: black; fill: white');
                e.setAttribute('x', shape.points[0].toString());
                e.setAttribute('y', shape.points[1].toString());
                e.setAttribute('width', shape.width.toString());
                e.setAttribute('height', shape.height.toString());
                svg.appendChild(e);
            }
            else if (shape instanceof shape_1.Circle) {
                const c = document.createElementNS(xmlns, "circle");
                c.setAttribute('style', 'stroke: black; fill: white');
                c.setAttribute("cx", shape.points[0].toString());
                c.setAttribute("cy", shape.points[1].toString());
                c.setAttribute("r", shape.radius.toString());
                svg.appendChild(c);
            }
        }
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
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const shape of objs) {
            if (shape instanceof shape_1.Circle) {
                ctx.beginPath();
                ctx.arc(shape.points[0], shape.points[1], shape.radius, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.stroke();
            }
            else if (shape instanceof shape_1.Rectangle) {
                ctx.strokeRect(shape.points[0], shape.points[0], shape.width, shape.height);
            }
            else if (shape instanceof shape_1.Polygon) {
                ctx.beginPath();
                ctx.moveTo(shape.points[0], shape.points[1]);
                for (var item = 2; item < shape.points.length - 1; item += 2) {
                    ctx.lineTo(shape.points[item], shape.points[item + 1]);
                }
                ctx.closePath();
                ctx.stroke();
            }
        }
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