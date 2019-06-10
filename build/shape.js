"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    constructor(points) {
        this.points = points;
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