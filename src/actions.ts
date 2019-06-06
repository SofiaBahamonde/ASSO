import { Shape, Circle, Rectangle, Triangle, Polygon } from './shape'
import { SimpleDrawDocument } from './document'

export interface Action<T> {
    do(): T
    undo(): void
}

abstract class CreateShapeAction<S extends Shape> implements Action<S> {
    constructor(private doc: SimpleDrawDocument, public readonly shape: S) { }

    do(): S {
        this.doc.add(this.shape)
        return this.shape
    }

    undo() {
        this.doc.objects = this.doc.objects.filter(o => o !== this.shape)
    }
}

export class CreateTriangleAction extends CreateShapeAction<Triangle> {
    constructor(doc: SimpleDrawDocument, private x: number, private y: number, private x2: number, private y2: number,private x3: number, private y3: number) {
        super(doc, new Triangle(x, y,x2,y2,x3,y3))
    }
}

export class CreateCircleAction extends CreateShapeAction<Circle> {
    constructor(doc: SimpleDrawDocument, private x: number, private y: number, private radius: number) {
        super(doc, new Circle(x, y, radius))
    }
}

export class CreatePolygonAction extends CreateShapeAction<Polygon> {
    constructor(doc: SimpleDrawDocument, private x: number, private y: number, private points: Array<number>) {
        super(doc, new Polygon(x, y, points))
    }
}

export class CreateRectangleAction extends CreateShapeAction<Rectangle> {
    constructor(doc: SimpleDrawDocument, private x: number, private y: number, private width: number, private height: number) {
        super(doc, new Rectangle(x, y, width, height))
    }
}

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
}