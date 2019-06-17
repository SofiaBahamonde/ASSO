
export abstract class Shape {
 
    public color:String = "Grey"
    public hightlighted = false

    constructor(public points: Array<number>) { }

//translation with array of points 

    translate(xd: number, yd: number): void {

        for( var item = 0 ; item < this.points.length-1 ; item+=2 ){
            this.points[item] += xd
            this.points[item+1] += yd
        }
    }

    rotate(angle: number): void {

        var xc = 0
        var yc = 0

        for(var i = 0; i < this.points.length-1; i+=2) {
            xc += this.points[i]
            yc += this.points[i+1]
         }
        
         xc /= this.points.length / 2
         yc /= this.points.length /2       

        for( var item = 0 ; item < this.points.length-1 ; item+=2 ){

            var xt= this.points[item] - xc
            var yt= this.points[item+1] - yc

            var xr = xt*Math.cos(angle) - yt*Math.sin(angle)
            var yr = xt*Math.sin(angle) + yt*Math.cos(angle)

            this.points[item] = xr + xc
            this.points[item+1] = yr + yc             
        }
    }

    setHighlight(value : boolean) {
        this.hightlighted = value;
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