import { GFEdge } from './edge';

export class GFNode{
	id:string;
	type:string;
	tags:string[];
	content:string[];
	parent:GFNode;
	children:GFNode[];
	edgeList:GFEdge[];
	private code;
}