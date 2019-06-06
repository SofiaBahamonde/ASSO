import { Shape } from './shape'
import { Action, CreateCircleAction, CreateRectangleAction, CreateTriangleAction, CreatePolygonAction, TranslateAction } from './actions'
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

    createRectangle(x: number, y: number, width: number, height: number): Shape {
        return this.do(new CreateRectangleAction(this, x, y, width, height))
    }

    createCircle(x: number, y: number, radius: number): Shape {
        return this.do(new CreateCircleAction(this, x, y, radius))
    }

    createTriangle(x: number, y: number, x2: number, y2: number, x3: number, y3: number): Shape {
      return this.do(new CreateTriangleAction(this, x, y, x2, y2, x3, y3))
    }

    createPolygon(x: number, y: number, points: Array<number>): Shape {
      return this.do(new CreatePolygonAction(this, x, y, points))
    }


    translate(s: Shape, xd: number, yd: number): void {
        return this.do(new TranslateAction(this, s, xd, yd))
    }
}