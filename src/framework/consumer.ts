import { GFStatement } from './statement';
import * as lexer from './compiler/lexical-analyzer';
import { ParsingResult, ParsingStatus, ContextFreeGrammer,ParentParseTreeNode,LeafParseTreeNode } from './compiler/syntax-parser';
import { GFGraph } from './graph';
import { GFNode } from './node';

//Non Terminals
const NODE_LIST = "Statement";
const NODE = "Node";
const TYPE = "Type";
const BLOCK = "Block";
const ATTRIBUTE_LIST = "AttributeList";
const ATTRIBUTE = "Attribute";
const VALUE = "Value";
const VALUE_LIST = "ValueList";
const INTEGER = "Integer";
const FLOAT = "Float";
const STRING = "String";
const ARRAY = "Array";
const EDGE = "Edge";

/** Converts graphful code into a graph data structure */
export class GFConsumer {

	input: string;
	output: GFGraph;
	parsingResult:ParsingResult;
	static readonly ruleList = [
		`${NODE_LIST} -> ${NODE} ${NODE_LIST} | ${NODE}`,
		`${NODE} -> $3 ${TYPE} ${BLOCK} $36`,
		`${TYPE} -> $21 $3 $22 | $E`,
		`${BLOCK} -> $25 ${ATTRIBUTE_LIST} $26`,
		`${ATTRIBUTE_LIST} -> ${ATTRIBUTE} $11 ${ATTRIBUTE_LIST}| ${ATTRIBUTE} | $E`,
		`${ATTRIBUTE} -> $3 $34 ${VALUE}`,
		`${VALUE} -> ${INTEGER} | ${FLOAT} | ${STRING} | ${EDGE} | ${ARRAY}`,
		`${INTEGER} -> $4`,
		`${FLOAT} -> $4 $37 $4`,
		`${STRING} -> $38`,
		`${EDGE} -> $23 $3 $24`,
		`${ARRAY} -> $19 ${VALUE_LIST} $20`,
		`${VALUE_LIST} -> ${VALUE} $11 ${VALUE_LIST} | ${VALUE} | $E`,
		
	];

	static readonly cfg = ContextFreeGrammer.grammerFrom(GFConsumer.ruleList);

	constructor(input: string) {
		this.input = input;
	}

	compile(): boolean {
		this.parsingResult = GFConsumer.cfg.parse(this.input);
		if (this.parsingResult.status != ParsingStatus.Passed) {
			return false;
		}
		this.output=new GFGraph();
		this.extractNodesFrom(this.parsingResult.root,this.input,this.output);
		return true;
	}

	private extractNodesFrom(nodeListContainer:ParentParseTreeNode,input:string,graph:GFGraph) {
		//each child of the node container corresponds to a node in graph
		for(let child of nodeListContainer.children){
			//create a node from this child
			let node=new GFNode();
			this.getSimpleNodeInfo(<ParentParseTreeNode>child,input,node);
			graph.nodeList.push(node);
		}
	}

	private getSimpleNodeInfo(nodeContainer:ParentParseTreeNode,input:string,node:GFNode){

		//retrieve id from first child
		let id=nodeContainer.children[0].getLexeme().valueIn(input);
		node.id=id;
		
		//retrieve possible type from second child
		let typeContainer=<ParentParseTreeNode>nodeContainer.children[1];
		if(typeContainer.children.length==3){
			node.type=typeContainer.children[1].getLexeme().valueIn(input);
		}
	}

}