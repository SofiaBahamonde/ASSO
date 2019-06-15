import { Shape } from './shape'
import { Action, CreateCircleAction, CreateRectangleAction, CreateTriangleAction, CreatePolygonAction } from './actions'
import { Render, InterfaceRender } from './render';
import { UndoManager } from "./undo";
import { ToolBox } from './toolbox';
import { InterfaceObj } from './interfaceobj';

export class SimpleDrawDocument {
    objects = new Array<Shape>()
    undoManager = new UndoManager();
    uielems = new Array<InterfaceObj>();

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

    drawUI(uiRender: InterfaceRender){

        uiRender.draw(...this.uielems)
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

    addUIElem(elem:InterfaceObj){
      

      var found = Boolean(false)

      this.uielems.forEach(element => {

          if(element === elem){
             found = true
              element = elem
          }

      })

      if(found == false){
        this.uielems.push(elem)
      }

    }

    setToolBox(newtoolbox:ToolBox){

      var found = Boolean(false)

      this.uielems.forEach(element => {

          if(element instanceof ToolBox){
             found = true
              element = newtoolbox
          }

      })

      if(found == false){
        this.uielems.push(newtoolbox)
      }

    }


    // translate(s: Shape, xd: number, yd: number): void {
    //     return this.do(new TranslateAction(this, s, xd, yd))
    // }
}