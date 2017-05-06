import { GFNode } from './node';
import { GFObject,GFObjectType } from './object';

export class GFEdge implements GFObject{
	name:string;
	node1:GFNode;
	node2:GFNode;
	directed:boolean;//TODO change this
	
	value:GFEdge;

	constructor(){
		this.value=this;
	}

	getType():GFObjectType{
		return GFObjectType.Edge;
	}
}