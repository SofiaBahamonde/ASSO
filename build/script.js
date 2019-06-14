"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
const render_1 = require("./render");
const canvasrender = new render_1.CanvasRender();
const svgrender = new render_1.SVGRender();
const sdd = new document_1.SimpleDrawDocument();
const c1 = sdd.createCircle([100, 100], 30);
const r1 = sdd.createRectangle([10, 10], 80, 80);
const r2 = sdd.createRectangle([30, 30], 40, 40);
const t1 = sdd.createTriangle([150, 100, 200, 400, 300, 200]);
const t2 = sdd.createTriangle([50, 50, 70, 70, 90, 50]);
const p1 = sdd.createPolygon([200, 50, 250, 10, 400, 200, 200, 200]);
//const s1 = sdd.createSelection(c1, r1, r2)
sdd.translate(p1, 10, 10);
sdd.rotate(t2, Math.PI / 3);
console.log("Hello in Script.ts");
sdd.draw(canvasrender);
sdd.draw(svgrender);
//# sourceMappingURL=script.js.map