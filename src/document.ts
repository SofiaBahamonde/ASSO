import { Shape } from './shape'
import { Action, CreateCircleAction, CreateRectangleAction, CreatePolygonAction, TranslateAction, RotationAction } from './actions'
import { Render, InterfaceRender } from './render';
import { UndoManager } from "./undo";
import { InterfaceObj } from './interfaceobj';
import { Layers, Layer } from './layer';
import { FileIO } from './fileio';

export class SimpleDrawDocument {

    objects = new Array<Shape>()
    undoManager = new UndoManager();
    shapeDropbox = document.getElementById("shape-dropbox");

    uielems = new Array<InterfaceObj>();

    update: any;

    undo() {
    this.undoManager.undo();
   }

    redo(){
    this.undoManager.redo();
   }


   constructor(update_call: any){
     this.update = update_call
   }


   drawUI(uiRender: InterfaceRender){

    uiRender.draw(...this.uielems)
  }

    draw(render: Render): void {
        // this.objects.forEach(o => o.draw(ctx))
        render.draw(this.getElemsToDraw())
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

    const action_return = a.do()

    this.update()

    return action_return;
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


  getElemsToDraw(): Array<Shape>{

    //Figure out if the concept of layers exists, if not just return objects vector

    this.uielems.forEach(element => {

      if(element instanceof Layers){
        return element.getSortedShapes()
      }
   })

   return this.objects

  }

    export(fileio:FileIO) {
      fileio.export(this.getElemsToDraw())
    }


    import(fileio:FileIO) {
      
      this.uielems.forEach(element => {

        if(element instanceof Layers){

          var layers = new Layers()
          
          var new_layer = new Layer(0, true)
          new_layer.addShapes(fileio.import("FILE"))

          layers.addLayer(new_layer)

          element = layers

        }
     })

    }

  /*
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
*/


}