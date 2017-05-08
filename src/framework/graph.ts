import { GFNode } from './node';
import { GFEdge } from './edge';

export class GFGraph{
	/** Holds all higher level nodes (list of Object nodes) */
	nodeList:GFNode[]=[];
	/** Holds only edges that act as links between two 'Object' nodes or an 'Object' node and an 'Array' node */
	edgeList:GFEdge[]=[];

	//methods for filtering nodes based on a selector

	getNodeById(id:string,makeIfNeeded=false):GFNode{
		for(let i=0;i<this.nodeList.length;i++){
			if(this.nodeList[i].id==id){
				return this.nodeList[i];
			}
		}
		if(makeIfNeeded){
			let node=new GFNode();
			node.id=id;
			//by default the node will hold a value of itself to represent an object
			node.value=node;
			node.placeholder=true;
			return node;
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