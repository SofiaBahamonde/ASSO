
export abstract class Shape {
    constructor(public points: Array<number>) { }

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