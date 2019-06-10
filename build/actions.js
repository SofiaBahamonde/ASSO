"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shape_1 = require("./shape");
class CreateShapeAction {
    constructor(doc, shape) {
        this.doc = doc;
        this.shape = shape;
    }
    do() {
        this.doc.add(this.shape);
        return this.shape;
    }
    undo() {
        this.doc.objects = this.doc.objects.filter(o => o !== this.shape);
    }
}
class CreateTriangleAction extends CreateShapeAction {
    constructor(doc, points) {
        super(doc, new shape_1.Triangle(points));
        this.points = points;
    }
}
exports.CreateTriangleAction = CreateTriangleAction;
class CreateCircleAction extends CreateShapeAction {
    constructor(doc, points, radius) {
        super(doc, new shape_1.Circle(points, radius));
        this.points = points;
        this.radius = radius;
    }
}
exports.CreateCircleAction = CreateCircleAction;
class CreatePolygonAction extends CreateShapeAction {
    constructor(doc, points) {
        super(doc, new shape_1.Polygon(points));
        this.points = points;
    }
}
exports.CreatePolygonAction = CreatePolygonAction;
class CreateRectangleAction extends CreateShapeAction {
    constructor(doc, points, width, height) {
        super(doc, new shape_1.Rectangle(points, width, height));
        this.points = points;
        this.width = width;
        this.height = height;
    }
}
exports.CreateRectangleAction = CreateRectangleAction;
/*
export class TranslateAction implements Action<void> {
    oldX: number
    oldY: number

    constructor(private doc: SimpleDrawDocument, public shape: Shape, private xd: number, private yd: number) { }

    
    do(): void {
        this.oldX = this.shape.x
        this.oldY = this.shape.y
        this.shape.translate(this.xd, this.yd)
    }

    undo() {
        this.shape.x = this.oldX
        this.shape.y = this.oldY
       // this.shape.translate(-this.xd, -this.yd)
    }
}*/ 
//# sourceMappingURL=actions.js.map