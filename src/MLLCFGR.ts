/// <reference path="../typings/lodash/lodash.d.ts" />
import * as _ from 'lodash';
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

  getLayer(layer: IMLLCFGRLayer): IMLLCFGRLayer;
  getLayer(layerName: string): IMLLCFGRLayer;
  getLayer(layerOrLayerName: any): IMLLCFGRLayer {

    if (typeof layerOrLayerName === 'object') {

      var layer = <IMLLCFGRLayer>layerOrLayerName;

      return this.layers[layer.name];

    } else if (typeof layerOrLayerName === 'string') {

      var layerName = <string>layerOrLayerName;

      return this.layers[layerName];

    }

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

  removeLayer(layer: IMLLCFGRLayer): boolean;
  removeLayer(layerName: string): boolean;
  removeLayer(layerOrLayerName: any): boolean {

    // Get the layer
    var layer = this.getLayer(layerOrLayerName);

    // Check if we could find a layer to remove
    if (!layer) {
      return false;
    }

    // Remove layer's name from the priority list
    _.pull(this.priorities, layer.name);

    // Remove layer from the layer list
    delete this.layers[layer.name];

    return true;

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

  set(path: string, value: any, layer: IMLLCFGRLayer): void;
  set(path: string, value: any, layerName: string): void;
  set(path: string, value: any, layerOrLayerName: any): void {

    // Get the layer
    var layer = this.getLayer(layerOrLayerName);

    // Check if we could find a layer
    if (!layer) {
      throw `Layer could not be found.`;
    }

    // Set the value
    layer.set(path, value);

  }

}

/*
  Exports
*/

export default MLLCFGR;
