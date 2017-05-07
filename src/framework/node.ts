import { GFEdge } from './edge';
import { GFAttribute } from './attribute';

export class GFNode{
	id:string;
	type:string;
	edgeList:GFEdge[]=[];
	/** Attributes associated to this node, weather they are primitives or array objects */
	attributeEdges:GFEdge[]=[];
	/** In case this node is a primitive, this is where the final value is stored */
	value:any;
	// attributes:GFAttribute[]=[];
	/** Placeholder nodes are used by edges that don't have actual nodes prepared up yet */
	placeholder=false;

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