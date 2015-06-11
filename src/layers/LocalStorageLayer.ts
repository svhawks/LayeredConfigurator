/// <reference path="../../typings/lodash/lodash.d.ts" />
import IMLLCFGRLayer from './IMLLCFGRLayer';

class LocalStorageLayer implements IMLLCFGRLayer {

  //constructor(name: string);
  constructor(public name: string, public prefix: string = '') {}

  private getLocalStorageKey(): string {

    return this.prefix + this.name;

  }

  private getLocalStorageObject(): Object {

    var key = this.getLocalStorageKey();

    try {

      var item = window.localStorage.getItem(key);

      return JSON.parse(item);

    } catch (e) {
      return {};
    }

  }

  private setLocalStorageObject(obj: Object): void {
 
    var key = this.getLocalStorageKey();

    try {

      var json = JSON.stringify(obj);

      window.localStorage.setItem(key, json);

    } catch (e) {}
 
  }

  get(path: string): any {

    var obj = this.getLocalStorageObject();

    return _.get(obj, path);

  }

  set(path: string, value: any): void {

    var obj = this.getLocalStorageObject();

    (<any>_).set(obj, path, value);

    this.setLocalStorageObject(obj);

  }

}

/*
  Exports
*/

export default LocalStorageLayer;
