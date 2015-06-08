/// <reference path="../../typings/tsd.d.ts" />
import IMLLCFGRLayer from './IMLLCFGRLayer';

/*
  Object Layer
*/

export class ObjectLayer implements IMLLCFGRLayer {

  //constructor(name: string);
  constructor(public name: string, public obj: Object = {}) {}

  get(path: string): any {

    return _.get(this.obj, path);

  }

  set(path:string, value: any): void {

    (<any>_).set(this.obj, path, value);

  }

}
