
export abstract class Shape {
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

export class Polygon extends Shape {
    constructor(public points: Array<number>) {
        super(points)
    }
}