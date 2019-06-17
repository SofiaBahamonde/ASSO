import { Shape } from './shape'
import { Action, CreateCircleAction, CreateRectangleAction, CreatePolygonAction, TranslateAction, RotationAction, ZoomAction } from './actions'
import { Render, InterfaceRender } from './render';
import { UndoManager } from "./undo";
import { InterfaceObj } from './interfaceobj';
import { Layers, Layer } from './layer';
import { FileIO } from './fileio';
import { ToolBox } from './toolbox';

export class SimpleDrawDocument {


  objects = new Array<Shape>()
  undoManager = new UndoManager();
  shapeDropbox = document.getElementById("shape-dropbox");

  uielems = new Array<InterfaceObj>();

  update: any;

  undo() {
    this.undoManager.undo();
  }

  redo() {
    this.undoManager.redo();
  }


  constructor(update_call: any) {
    this.update = update_call
  }


  drawUI(uiRender: InterfaceRender) {
    uiRender.draw(...this.uielems)
  }

  draw(render: Render): void {
    // this.objects.forEach(o => o.draw(ctx))
    render.draw(this.getElemsToDraw())
  }

  getSelLayer(): number{
    
    var e = document.getElementById("layers")
    var str_value = e.getElementsByClassName("active")[0].children[0].innerHTML
    return parseInt(str_value, 10)
  }



  zoom(renders: Array<Render>, factor: number){

  this.do(new ZoomAction(this, renders, factor));
  }

  add(r: Shape): void {
    var option = document.createElement("OPTION");
    option.setAttribute("value", r.getID());
    option.innerHTML = r.getID();
    this.shapeDropbox.appendChild(option);


    this.objects.push(r)
  }

  remove(shape: Shape) {
    var children = this.shapeDropbox.children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];

      if(child.getAttribute("value") == shape.getID()){
        child.remove();
      }
      
    }

    this.objects = this.objects.filter(o => o !== shape)
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

  createPolygon(points: Array<number>): Shape {
    return this.do(new CreatePolygonAction(this, points))
  }


  translate(id : string, xd: number, yd: number): void {
    return this.do(new TranslateAction(this, this.getShape(id), xd, yd))
  }

  rotate(id: string, angle: number): void {
    return this.do(new RotationAction(this, this.getShape(id), angle))
  }

  getShape(id : String){

    let shapes = this.getElemsToDraw()

    for(var i =0; i < shapes.length; i++){
      if(shapes[i].getID() == id){
        return shapes[i];
      }
    }

    return null;
  }


  addUIElem(elem: InterfaceObj) {


    var found = Boolean(false)

    this.uielems.forEach(element => {

      if (element === elem) {
        found = true
        element = elem
      }

    })

    if (found == false) {
      this.uielems.push(elem)
    }
  }


  getElemsToDraw(): Array<Shape> {

    //Figure out if the concept of layers exists, if not just return objects vector

    this.uielems.forEach(element => {

      if (element instanceof Layers) {
        return element.getSortedShapes()
      }
    })

    return this.objects

  }

  export(fileio: FileIO) {
    fileio.export(this.getElemsToDraw())
  }


  import(fileio: FileIO) {

    this.uielems.forEach(element => {

      if (element instanceof Layers) {

        var layers = new Layers()

        var new_layer = new Layer(0, true)
        new_layer.addShapes(fileio.import("FILE"))

        layers.addLayer(new_layer)

        element = layers

      }
    })

  }

  getToolbox(): ToolBox{

    this.uielems.forEach(element => {

      if (element instanceof ToolBox) {
          return element
      }
    })
    return null

  }


  canvasNotification(x:number, y:number){

    console.log("X: " + x.toString() + "Y: " + y.toString() )

    this.uielems.forEach(element => {

      if (element instanceof ToolBox) {
          const tool = element.getSelTool()

          if(tool != null){
            //todo detect if a shape was clicked
            if(tool.sendInput(x,y, null) == true){
              element.unSelectTool()
            }

            return
          }
      }
    })

  }

  getSelShape(): Shape{
  

    var sel_box = <HTMLSelectElement>this.shapeDropbox
    var shape_id = sel_box.options[sel_box.selectedIndex].value;

    this.getElemsToDraw().forEach(shape => {

      if(shape.getID() == shape_id){
        return shape
      }

    })
    return null
  }


  clicked_tool(tool_name: String) {
   console.log("Clicked TOOL:" + tool_name)
    this.getToolbox().clicked_tool(tool_name, this.getSelShape())

}


  setToolListeners(): void {

    var tools = document.getElementById("tools")
    let doc = this
    
    for (let child_i = 0; child_i < tools.children.length; child_i++) {

      const tool = tools.children[child_i];
      console.log(tool)
      tool.addEventListener("click", function(){
        console.log("Hello From tool")
        //doc.clicked_tool(tool.innerHTML.replace('<\/?p[^>]*>', ""))
      }); 
      
    }

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