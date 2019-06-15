
export abstract class Shape {

    public color:String = "white"

    constructor(public points: Array<number>) { }


    public setPos(new_points:Array<number>): void {
        this.points = new_points
    }


/* translation with array of points 

    translate(xd: number, yd: number): void {
        this.x += xd
        this.y += yd
    }
*/ 
}

export class Rectangle extends Shape {
    constructor(public points: Array<number>, public width: number, public height: number) {
        super(points)
    }
}

export class Circle extends Shape {
    constructor(public points: Array<number>, public radius: number) {
        super(points)
    }
}

export class Triangle extends Shape {
    constructor(public points: Array<number>) {
        super(points)
    }
}

export class Polygon extends Shape {
    constructor(public points: Array<number>) {
        super(points)
    }
}