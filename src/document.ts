import { Shape } from './shape'
import { Action, CreateCircleAction, CreateRectangleAction, CreateTriangleAction, CreatePolygonAction } from './actions'
import { Render } from './render';
import { UndoManager } from "./undo";

export class SimpleDrawDocument {
    objects = new Array<Shape>()
    undoManager = new UndoManager();

    undo() {
    this.undoManager.undo();
  }

    redo() {
    this.undoManager.redo();
  }

    draw(render: Render): void {
        // this.objects.forEach(o => o.draw(ctx))
        render.draw(...this.objects)
    }

    add(r: Shape): void {
        this.objects.push(r)
    }

    do<T>(a: Action<T>): T {
    this.undoManager.onActionDone(a);
    return a.do();
  }

    createRectangle(points: Array<number>, width: number, height: number): Shape {
        return this.do(new CreateRectangleAction(this, points, width, height))
    }

    createCircle(points: Array<number>, radius: number): Shape {
        return this.do(new CreateCircleAction(this, points, radius))
    }

    createTriangle(points: Array<number>): Shape {
      return this.do(new CreateTriangleAction(this, points))
    }

    createPolygon( points: Array<number>): Shape {
      return this.do(new CreatePolygonAction(this, points))
    }


    // translate(s: Shape, xd: number, yd: number): void {
    //     return this.do(new TranslateAction(this, s, xd, yd))
    // }
}