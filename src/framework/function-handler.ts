import { GFNode } from './node';
export interface GFFunctionHandler{
	execute(functionName:string,params:any,node:GFNode,lineNo:number):string;
}