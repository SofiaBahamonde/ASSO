"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Tool is going to be instanced using factory design pattern and each has the virtual method action()
    that takes a object argument that contains its parameters
*/
class ActionParam {
    constructor(points, objects_sel) {
        this.points = points;
        this.objects_sel = objects_sel;
    }
}
exports.ActionParam = ActionParam;
class Tool {
    constructor(name, img_loc) {
        this.name = name;
        this.img_loc = img_loc;
    }
    action(action_para) {
        return false;
    }
}
exports.Tool = Tool;
class MoveTool extends Tool {
    action(action_para) {
        console.log("On Move Tool");
        action_para.objects_sel.forEach(element => {
            try {
                for (let i = 0; i < element.points.length; i++) {
                    if (i % 2)
                        element.points[i] += action_para.points[action_para.points.length - 1][0];
                    else
                        element.points[i] += action_para.points[action_para.points.length - 1][1];
                }
            }
            catch (e) {
                console.log("Error on MoveTool");
                return false;
            }
        });
        return true;
    }
}
exports.MoveTool = MoveTool;
class PaintTool extends Tool {
    constructor(color, name, img_loc) {
        super(name, img_loc);
        this.name = name;
        this.img_loc = img_loc;
        this.color = "Blue";
    }
    action(action_para) {
        action_para.objects_sel.forEach(element => {
            try {
                element.color = this.color;
            }
            catch (e) {
                console.log("Error on PaintTool");
                return false;
            }
        });
        return true;
    }
}
exports.PaintTool = PaintTool;
//# sourceMappingURL=tool.js.map