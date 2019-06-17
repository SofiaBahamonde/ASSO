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
    addShape(sh, layer_id) {
        if (layer_id >= this.layers.length) {
            console.log("Invalid Layer");
            return false;
        }
        this.layers[layer_id].addShape(sh);
        return true;
    }
    getLayers() {
        return this.layers;
    }
    removeObject(sh_toremove) {
        this.layers.forEach(layer => {
            layer.getShapes().forEach(sh => {
                if (sh.getID() == sh_toremove.getID())
                    layer.getShapes().filter(o => o !== sh);
                return;
            });
        });
    }
    getSortedShapes() {
        let objs = Array();
        for (let layer_it = this.layers.length - 1; layer_it >= 0; layer_it--) {
            console.log("Getting Sorted Shapes: " + this.layers[layer_it].getShapes());
            this.layers[layer_it].getShapes().forEach(obj => {
                objs.push(obj);
            });
        }
        //console.log("Getting Sorted Shapes: " + this.layers[1].getShapes())
        return objs;
    }
}
exports.Layers = Layers;
//# sourceMappingURL=layer.js.map