import { GFNode } from './node';
import { GFEdge } from './edge';

export class GFGraph{
	nodeList:GFNode[]=[];
	edgeList:GFEdge[]=[];

	//methods for filtering nodes based on a selector

	getNodeById(id:string):GFNode{
		for(let i=0;i<this.nodeList.length;i++){
			if(this.nodeList[i].id==id){
				return this.nodeList[i];
			}
		}
		return null;
	}

	getNodesOfType(type:string):GFNode[]{
		let filteredNodes:GFNode[]=[];
		for(let i=0;i<this.nodeList.length;i++){
			if(this.nodeList[i].type==type){
				filteredNodes.push(this.nodeList[i]);
			}
		}
		return filteredNodes;
	}

	/** Returns nodes in a path in the object graph. TODO Not ready yet */
	getNodeInPath(path:string):GFNode{
		let pathItems:string[]=path.split(".");
		let rootNode=this.getNodeById(pathItems[0]);
		let parent=rootNode;
		let leaf=rootNode;
		for(let i=0;i<pathItems.length;i++){
			//TODO do this recursively
		}
		return leaf;
	}
}