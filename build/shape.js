"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    constructor(points) {
        this.points = points;
    }
    //translation with array of points 
    translate(xd, yd) {
        for (var item = 0; item < this.points.length - 1; item += 2) {
            this.points[item] += xd;
            this.points[item + 1] += yd;
        }
    }
    rotate(angle) {
        for (var item = 0; item < this.points.length - 1; item += 2) {
            // this.points[item] = Math.cos(angle) - Math.sin(angle) + this.points[item]*(1-Math.cos(angle))+this.points[item+1]*Math.sin(angle)
            //this.points[item+1] =  Math.sin(angle) + Math.cos(angle) + this.points[item+1]*(1-Math.cos(angle))-this.points[item+1]*Math.sin(angle)
            this.points[item] = this.points[item] * Math.cos(angle) - this.points[item + 1] * Math.sin(angle);
            this.points[item + 1] = this.points[item + 1] * Math.sin(angle) + this.points[item] * Math.cos(angle);
        }
    }
}
exports.Shape = Shape;
class Rectangle extends Shape {
    constructor(points, width, height) {
        super(points);
        this.points = points;
        this.width = width;
        this.height = height;
    }
}
exports.Rectangle = Rectangle;
class Circle extends Shape {
    constructor(points, radius) {
        super(points);
        this.points = points;
        this.radius = radius;
    }
}
exports.Circle = Circle;
class Triangle extends Shape {
    constructor(points) {
        super(points);
        this.points = points;
    }
}
exports.Triangle = Triangle;
class Polygon extends Shape {
    constructor(points) {
        super(points);
        this.points = points;
    }
}
exports.Polygon = Polygon;
//# sourceMappingURL=shape.js.map