import { Shape } from "./shape";
import { InterfaceObj } from "./interfaceobj"

export class Layer{


    private objects: Array<Shape>

    constructor(public pos:number, public visible:boolean){
        this.objects = new Array<Shape>()
    }

    addShape(sh:Shape){
        this.objects.push(sh)
    }

    getShapes(){
        return this.objects
    }

    addShapes(shapes: Shape[]) {
        shapes.forEach(element => {
            this.addShape(element)
        });
      }

}

export class Layers implements InterfaceObj{

    private layers:Array<Layer> = new Array<Layer>()

    constructor(){
    }


    addLayer(layer:Layer): void{
        
        layer.pos = this.layers.length
        this.layers.push(layer)

    }

    addLayernew(): void{
        this.layers.push(new Layer(this.layers.length, true))
    }


    addShape(sh:Shape, layer_id:number): boolean{
        if(layer_id >= this.layers.length){
            console.log("Invalid Layer")
            return false
        }
        this.layers[layer_id].addShape(sh)
        return true
    }

    getLayers() : Array<Layer> {
        return this.layers
    }

    getSortedShapes(): Array<Shape>{

        let objs = Array<Shape>()

        for (let layer_it = this.layers.length -1; layer_it <= 0 ; layer_it--) {
            
            this.layers[layer_it].getShapes().forEach(obj => {
                objs.push(obj)
            });
            
        }

        return objs

    }

}
