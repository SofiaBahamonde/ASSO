"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("./actions");
const undo_1 = require("./undo");
const layer_1 = require("./layer");
class SimpleDrawDocument {
    constructor(update_call) {
        this.objects = new Array();
        this.undoManager = new undo_1.UndoManager();
        this.shapeDropbox = document.getElementById("shape-dropbox");
        this.uielems = new Array();
        this.update = update_call;
    }
    undo() {
        this.undoManager.undo();
    }
    redo() {
        this.undoManager.redo();
    }
    drawUI(uiRender) {
        uiRender.draw(...this.uielems);
    }
    draw(render) {
        // this.objects.forEach(o => o.draw(ctx))
        render.draw(this.getElemsToDraw());
    }
    add(r) {
        var option = document.createElement("OPTION");
        option.setAttribute("value", r.getID());
        option.innerHTML = r.getID();
        this.shapeDropbox.appendChild(option);
        this.objects.push(r);
    }
    do(a) {
        this.undoManager.onActionDone(a);
        const action_return = a.do();
        this.update();
        return action_return;
    }
    createRectangle(points, width, height) {
        return this.do(new actions_1.CreateRectangleAction(this, points, width, height));
    }
    createCircle(points, radius) {
        return this.do(new actions_1.CreateCircleAction(this, points, radius));
    }
    createPolygon(points) {
        return this.do(new actions_1.CreatePolygonAction(this, points));
    }
    translate(s, xd, yd) {
        return this.do(new actions_1.TranslateAction(this, s, xd, yd));
    }
    rotate(s, angle) {
        return this.do(new actions_1.RotationAction(this, s, angle));
    }
    addUIElem(elem) {
        var found = Boolean(false);
        this.uielems.forEach(element => {
            if (element === elem) {
                found = true;
                element = elem;
            }
        });
        if (found == false) {
            this.uielems.push(elem);
        }
    }
    getElemsToDraw() {
        //Figure out if the concept of layers exists, if not just return objects vector
        this.uielems.forEach(element => {
            if (element instanceof layer_1.Layers) {
                return element.getSortedShapes();
            }
        });
        return this.objects;
    }
}
exports.SimpleDrawDocument = SimpleDrawDocument;
//# sourceMappingURL=document.js.map