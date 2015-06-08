define(["require", "exports", './layers/LocalStorageLayer', './layers/ObjectLayer'], function (require, exports, LocalStorageLayer, ObjectLayer) {
    /*
      MLLCFGR
    */
    var MLLCFGR = (function () {
        function MLLCFGR(layers, options) {
            if (layers === void 0) { layers = []; }
            if (options === void 0) { options = {}; }
            this.options = options;
            this.priorities = [];
            this.layers = {};
            var self = this;
            layers.forEach(function (layer) {
                self.addLayer(layer);
            });
        }
        MLLCFGR.prototype.getLayer = function (name, strict) {
            if (strict === void 0) { strict = false; }
            var layer = this.layers[name];
            if (!layer && strict) {
                throw "Layer \"" + name + "\" does not exist.";
            }
            return layer;
        };
        MLLCFGR.prototype.addLayer = function (layer) {
            if (this.getLayer(layer.name)) {
                throw "Layer \"" + layer.name + "\" already exists.";
            }
            // Add the layer to the list
            this.layers[layer.name] = layer;
            // Push the name to the priorities list
            this.priorities.push(layer.name);
        };
        MLLCFGR.prototype.removeLayer = function (name, strict) {
            if (strict === void 0) { strict = false; }
            // Get the layer
            var layer = this.getLayer(name, strict);
            // Check if it's okay
            if (!layer) {
                return;
            }
            _.pull(this.priorities, layer.name);
            delete this.layers[name];
        };
        MLLCFGR.prototype.locate = function (path) {
            var self = this;
            // Find the first layer with a value
            var layerName = _.find(this.priorities, function (layerName) {
                var layer = self.getLayer(layerName);
                var layerValue = layer.get(path);
                return (layerValue !== undefined);
            });
            return layerName;
        };
        MLLCFGR.prototype.get = function (path, noMerge) {
            var self = this;
            // Find the exact value by going through all layers
            var value = _.reduceRight(this.priorities, function (value, layerName) {
                var layer = self.getLayer(layerName);
                var layerValue = layer.get(path);
                // Keep the old value if the layer doesn't have it
                if (layerValue !== undefined) {
                    return value;
                }
                else if (!noMerge && _.isObject(value) && _.isObject(layerValue)) {
                    return _.merge(value, layerValue);
                }
                else {
                    return layerValue;
                }
            });
            return value;
        };
        MLLCFGR.prototype.set = function (path, value, layerName) {
            // Get the layer
            var layer = this.getLayer(layerName, true);
            // Set the value
            layer.set(path, value);
        };
        MLLCFGR.LocalStorageLayer = LocalStorageLayer;
        MLLCFGR.ObjectLayer = ObjectLayer;
        return MLLCFGR;
    })();
    return MLLCFGR;
});
