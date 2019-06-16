
export abstract class Shape {

    public color:String = "Grey"

    constructor(public points: Array<number>) { }

//translation with array of points 

    translate(xd: number, yd: number): void {

        for( var item = 0 ; item < this.points.length-1 ; item+=2 ){
            this.points[item] += xd
            this.points[item+1] += yd
        }
    }

    rotate(angle: number): void {

        for( var item = 0 ; item < this.points.length-1 ; item+=2 ){
           // this.points[item] = Math.cos(angle) - Math.sin(angle) + this.points[item]*(1-Math.cos(angle))+this.points[item+1]*Math.sin(angle)
            //this.points[item+1] =  Math.sin(angle) + Math.cos(angle) + this.points[item+1]*(1-Math.cos(angle))-this.points[item+1]*Math.sin(angle)
            this.points[item] = this.points[item]*Math.cos(angle) - this.points[item+1]*Math.sin(angle) 
            this.points[item+1] =  this.points[item+1]*Math.sin(angle) +  this.points[item]*Math.cos(angle) 
            
        }
    }

    abstract getID() : string;
 
}

export class Rectangle extends Shape{
    static idCounter: number =0;
    id: number;

    constructor(public points: Array<number>, public width: number, public height: number) {
        super(points)
        this.id = Circle.idCounter++;
    }

    getID(): string {
        return "rect_" + this.id;
     }

}

export class Circle extends Shape {
    static idCounter: number =0;
    id: number;

    constructor(public points: Array<number>, public radius: number) {
        super(points);
        this.id = Circle.idCounter++;
    }

    getID(): string {
        return "circle_" + this.id;
     }
}

export class Polygon extends Shape {
    static idCounter: number =0;
    id: number;

    constructor(public points: Array<number>) {
        super(points)
        this.id = Circle.idCounter++;
    }

    getID(): string {
        return "polygon_" + this.id;
     }
}