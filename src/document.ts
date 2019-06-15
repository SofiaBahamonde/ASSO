import { Shape } from './shape'
import { Action, CreateCircleAction, CreateRectangleAction, CreatePolygonAction, TranslateAction, RotationAction } from './actions'
import { Render } from './render';
import { UndoManager } from "./undo";

export class SimpleDrawDocument {
    objects = new Array<Shape>()
    undoManager = new UndoManager();
    shapeDropbox = document.getElementById("shape-dropbox");

    undo() {
    this.undoManager.undo();
   }

    redo(){
    this.undoManager.redo();
   }

    draw(render: Render): void {
        // this.objects.forEach(o => o.draw(ctx))
        render.draw(...this.objects)
    }

    add(r: Shape): void {
        var option = document.createElement("OPTION");
        option.setAttribute("value",r.getID());
        option.innerHTML = r.getID();
        this.shapeDropbox.appendChild(option);
        
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

    createPolygon( points: Array<number>): Shape {
      return this.do(new CreatePolygonAction(this, points))
    }


    translate(s: Shape, xd: number, yd: number): void {
        return this.do(new TranslateAction(this, s, xd, yd))
    }

    rotate(s: Shape, angle: number): void {
      return this.do(new RotationAction(this, s, angle))
  }
}