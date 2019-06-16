"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Layer {
    constructor(pos, visible) {
        this.pos = pos;
        this.visible = visible;
        this.objects = new Array();
    }
    addShape(sh) {
        this.objects.push(sh);
    }
    getShapes() {
        return this.objects;
    }
    addShapes(shapes) {
        shapes.forEach(element => {
            this.addShape(element);
        });
    }
}
exports.Layer = Layer;
class Layers {
    constructor() {
        this.layers = new Array();
    }
    addLayer(layer) {
        layer.pos = this.layers.length;
        this.layers.push(layer);
    }
    addLayernew() {
        this.layers.push(new Layer(this.layers.length, true));
    }
    getLayers() {
        return this.layers;
    }
    getSortedShapes() {
        let objs = Array();
        for (let layer_it = this.layers.length - 1; layer_it <= 0; layer_it--) {
            this.layers[layer_it].getShapes().forEach(obj => {
                objs.push(obj);
            });
        }
        return objs;
    }
}
exports.Layers = Layers;
//# sourceMappingURL=layer.js.map