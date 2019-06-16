import { Shape } from "./shape";

export interface FileIO{

    import(fileloc:String) : Array<Shape>
    export(shapes:Array<Shape>) : boolean

}

export class BMP implements FileIO {

    constructor(sizex:number, sizey:number){
        console.log("Init of BMP FileIO")
    }

    import(fileloc: String): Shape[] {
        console.log("Importing from BMP")
        return Array<Shape>()
    }
    export(shapes:Array<Shape>): boolean {
        console.log("Exporting Many shapes in BMP")
        return true
    }

}

export class XML implements FileIO {

    constructor(){
        console.log("Init of XML FileIO")
    }

    import(fileloc: String): Shape[] {
        console.log("Importing from XML")
        return Array<Shape>()
    }
    export(shapes:Array<Shape>): boolean {
        console.log("Exporting Many shapes in XML")
        return true
    }

}