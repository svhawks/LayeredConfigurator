define(["require", "exports"], function (require, exports) {
    var LocalStorageLayer = (function () {
        //constructor(name: string);
        function LocalStorageLayer(name, prefix) {
            if (prefix === void 0) { prefix = ''; }
            this.name = name;
            this.prefix = prefix;
        }
        LocalStorageLayer.prototype.getLocalStorageKey = function () {
            return this.prefix + this.name;
        };
        LocalStorageLayer.prototype.getLocalStorageObject = function () {
            var key = this.getLocalStorageKey();
            try {
                var item = window.localStorage.getItem(key);
                return JSON.parse(item);
            }
            catch (e) {
                return {};
            }
        };
        LocalStorageLayer.prototype.setLocalStorageObject = function (obj) {
            var key = this.getLocalStorageKey();
            try {
                var json = JSON.stringify(obj);
                window.localStorage.setItem(key, json);
            }
            catch (e) { }
        };
        LocalStorageLayer.prototype.get = function (path) {
            var obj = this.getLocalStorageObject();
            return _.get(obj, path);
        };
        LocalStorageLayer.prototype.set = function (path, value) {
            var obj = this.getLocalStorageObject();
            _.set(obj, path, value);
            this.setLocalStorageObject(obj);
        };
        return LocalStorageLayer;
    })();
    return LocalStorageLayer;
});
