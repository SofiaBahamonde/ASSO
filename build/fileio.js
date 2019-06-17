"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BMP {
    constructor(sizex, sizey) {
        console.log("Init of BMP FileIO");
    }
    import(fileloc) {
        console.log("Importing from BMP");
        return Array();
    }
    export(shapes) {
        console.log("Exporting Many shapes in BMP");
        return true;
    }
}
exports.BMP = BMP;
class XML {
    constructor() {
        console.log("Init of XML FileIO");
    }
    import(fileloc) {
        console.log("Importing from XML");
        return Array();
    }
    export(shapes) {
        console.log("Exporting Many shapes in XML");
        return true;
    }
}
exports.XML = XML;
//# sourceMappingURL=fileio.js.map