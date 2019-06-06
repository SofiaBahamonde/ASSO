
export abstract class Shape {
    constructor(public x: number, public y: number) { }

    translate(xd: number, yd: number): void {
        this.x += xd
        this.y += yd
    }
}

export class Rectangle extends Shape {
    constructor(public x: number, public y: number, public width: number, public height: number) {
        super(x, y)
    }
}

export class Circle extends Shape {
    constructor(public x: number, public y: number, public radius: number) {
        super(x, y)
    }
}

export class Triangle extends Shape {
    constructor(public x: number, public y: number, public x2: number, public y2: number, public x3: number, public y3: number,) {
        super(x, y)
    }
}