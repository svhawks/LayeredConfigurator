interface IMLLCFGRLayer {

	name: string;

	//constructor(name: string);

	get(key: string): any;
	set(key: string, value: any): void;

}

/*
  Exports
*/

export default IMLLCFGRLayer;
