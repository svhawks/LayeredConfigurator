define(["require", "exports"], function (require, exports) {
    /*
      Object Layer
    */
    var ObjectLayer = (function () {
        //constructor(name: string);
        function ObjectLayer(name, obj) {
            if (obj === void 0) { obj = {}; }
            this.name = name;
            this.obj = obj;
        }
        ObjectLayer.prototype.get = function (path) {
            return _.get(this.obj, path);
        };
        ObjectLayer.prototype.set = function (path, value) {
            _.set(this.obj, path, value);
        };
        return ObjectLayer;
    })();
    return ObjectLayer;
});
