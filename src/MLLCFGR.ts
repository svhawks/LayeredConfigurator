/// <reference path="../typings/lodash/lodash.d.ts" />
import IMLLCFGRLayer from './layers/IMLLCFGRLayer';
import LocalStorageLayer from './layers/LocalStorageLayer';
import ObjectLayer from './layers/ObjectLayer';

/*
  MLLCFGR
*/

class MLLCFGR {

  static LocalStorageLayer = LocalStorageLayer;
  static ObjectLayer = ObjectLayer;

  private priorities: Array<string> = [];
  private layers: { [name: string]: IMLLCFGRLayer } = {};

  constructor(layers: Array<IMLLCFGRLayer> = [], public options: Object = {}) {

    var self = this;

    layers.forEach(function (layer) {
      self.addLayer(layer);
    });

  }

  getLayer(name: string): IMLLCFGRLayer {

    var layer = this.layers[name];

    return layer;

  }

  addLayer(layer: IMLLCFGRLayer): void {

    if (this.getLayer(layer.name)) {
      throw `Layer "${layer.name}" already exists.`;
    }

    // Add the layer to the list
    this.layers[layer.name] = layer;

    // Push the name to the priorities list
    this.priorities.push(layer.name);

  }

  removeLayer(name: string): void {

    // Get the layer
    var layer = this.getLayer(name);

    // Check if it's okay
    if (!layer) {
      return;
    }

    _.pull(this.priorities, layer.name);

    delete this.layers[name];

  }

  locate(path: string): string {

    var self = this;

    // Find the first layer with a value
    var layerName = _.find(this.priorities, function (layerName) {

      var layer = self.getLayer(layerName);
      var layerValue = layer.get(path);

      return (layerValue !== undefined);

    });

    return layerName;

  }

  get(path: string, noMerge: boolean): any {

    var self = this;

    // Find the exact value by going through all layers
    var value = _.reduceRight(this.priorities, function(value, layerName) {

      var layer = self.getLayer(layerName);
      var layerValue = layer.get(path);

      // Keep the old value if the layer doesn't have it
      if (layerValue !== undefined) {
        return value;
      // Merge layer's value with old value if we can
      } else if (!noMerge && _.isObject(value) && _.isObject(layerValue)) {
        return _.merge(value, layerValue);
      // Use layer's value
      } else {
        return layerValue;
      }

    });

    return value;

  }

  set(path: string, value: any, layerName: string): void {

    // Get the layer
    var layer = this.getLayer(layerName);

    if (!layer) {
      throw `Layer "${layerName}" does not exist.`;
    }

    // Set the value
    layer.set(path, value);

  }

}

/*
  Exports
*/

export default MLLCFGR;
