import { GFEdge } from './edge';

export class GFNode{
	id:string;
	type:string;
	content:string[];
	parent:GFNode;
	edgeList:GFEdge[];
	private code;

	getConnectedNodes(edgeName:string):GFNode[]{
		let connectedNodes:GFNode[]=[];
		for(let i=0;i<this.edgeList.length;i++){
			if(this.edgeList[i].name==name){
				connectedNodes.push(this.edgeList[i].node2);
			}
		}
		return connectedNodes;
	}
}