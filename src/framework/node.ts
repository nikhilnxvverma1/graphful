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
			if(this.edgeList[i].name==edgeName){
				connectedNodes.push(this.edgeList[i].node2);
			}
		}
		return connectedNodes;
	}

	getFirstConnectedNodeBy(edgeName:string):GFNode{
		let connectedNode:GFNode;
		for(let i=0;i<this.edgeList.length;i++){
			if(this.edgeList[i].name==edgeName){
				return this.edgeList[i].node2;
			}
		}
		return null;
	}

	getAttributeValue(attributeName:string):any{
		let connectedNode:GFNode;
		let attributeEdge=this.edgeBy(attributeName,this.attributeEdges);
		if(attributeEdge==null){
			attributeEdge=this.edgeBy(attributeName,this.edgeList);
		}
		
		if(attributeEdge!=null){
			return attributeEdge.node2.value;
		}else{
			return null;
		}
	}

	private edgeBy(name:string,edgeList:GFEdge[]):GFEdge{
		for(let edge of edgeList){
			if(edge.name==name){
				return edge;
			}
		}
		return null;
	}
}
