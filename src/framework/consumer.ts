import * as lexer from './compiler/lexical-analyzer';
import { ParsingResult, ParsingStatus, ContextFreeGrammer, ParentParseTreeNode, LeafParseTreeNode } from './compiler/syntax-parser';
import { ParseTreeNodeType } from './compiler/syntax-parser';
import { GFGraph } from './graph';
import { GFNode } from './node';
import { GFAttribute } from './attribute';
import { GFIntegerObject,GFFloatObject,GFArrayObject,GFStringObject,GFEdgeObject } from './object';

//Non Terminals
const NODE_LIST = "NodeList";
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
	parsingResult: ParsingResult;
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
		this.output = new GFGraph();
		this.extractGraphFrom(this.parsingResult.root, this.input, this.output);
		return true;
	}

	private extractGraphFrom(nodeListContainer: ParentParseTreeNode, input: string, graph: GFGraph) {
		let pairs: ContainerNodePair[] = [];
		//each child of the node container corresponds to a node in graph
		for (let child of nodeListContainer.children) {
			//create a node from this child
			let node = new GFNode();
			let nodeContainer = <ParentParseTreeNode>child;
			this.getSimpleNodeInfo(nodeContainer, input, node);
			graph.nodeList.push(node);
			pairs.push(new ContainerNodePair(nodeContainer, node));
		}

		//find attributes for each child
		for (let pair of pairs) {

			let container = pair.container;
			let node = pair.node;
			let blockContainer = <ParentParseTreeNode>container.children[2];
			//the second contianer contains the attribute list
			let attributeListContainer = <ParentParseTreeNode>blockContainer.children[1];

			this.extractAttributeList(attributeListContainer, node, input);
		}
	}



	private getSimpleNodeInfo(nodeContainer: ParentParseTreeNode, input: string, node: GFNode) {

		//retrieve id from first child
		let id = nodeContainer.children[0].getLexeme().valueIn(input);
		node.id = id;

		//retrieve possible type from second child
		let typeContainer = <ParentParseTreeNode>nodeContainer.children[1];
		if (typeContainer.children.length == 3) {
			node.type = typeContainer.children[1].getLexeme().valueIn(input);
		}
	}

	private extractAttributeList(attributeListContainer: ParentParseTreeNode, node: GFNode, input: string) {

		//loop through all the attributes of this container
		for (let child of attributeListContainer.children) {
			if (child.getType() == ParseTreeNodeType.Parent) {
				let container = <ParentParseTreeNode>child;

				//container is an attribute container
				if (container.getNonTerminal().representation == ATTRIBUTE) {
					this.extractAttribute(container, node, input);
				} else {
					//container can only be an attribute list container,in which case recurse
					this.extractAttributeList(container, node, input);
				}
			}
		}
	}

	private extractAttribute(attributeContainer: ParentParseTreeNode, node: GFNode, input: string) {

		//this will only have 3 children :
		let attribute = new GFAttribute();
		//first is the identifier
		attribute.name = attributeContainer.children[0].getLexeme().valueIn(input);

		//second is equals sign
		//third is the value itself
		this.extractValue(<ParentParseTreeNode>attributeContainer.children[2],attribute,input);
		node.attributes.push(attribute);
	}

	private extractValue(valueContainer:ParentParseTreeNode,attribute:GFAttribute,input:string){
		let valueTypeContainer=<ParentParseTreeNode>valueContainer.children[0];
		//check the expression of the non terminal
		if(valueTypeContainer.getNonTerminal().representation==INTEGER){
			//get the only lexeme from this container, and parse it to create a integer value
			let value=valueTypeContainer.children[0].getLexeme().valueIn(input);
			attribute.object=new GFIntegerObject(parseInt(value));
		}else if(valueTypeContainer.getNonTerminal().representation==FLOAT){
			//get the 2 lexemes on the outer side, and parse it to create a float value
			let beforeDecimal=valueTypeContainer.children[0].getLexeme().valueIn(input);
			let afterDecimal=valueTypeContainer.children[2].getLexeme().valueIn(input);
			attribute.object=new GFIntegerObject(parseFloat(beforeDecimal+"."+afterDecimal));
		}else if(valueTypeContainer.getNonTerminal().representation==STRING){
			//get the only lexeme from this container, and parse it to create a string value
			let value=valueTypeContainer.children[0].getLexeme().valueIn(input);
			attribute.object=new GFStringObject(value);
		}else if(valueTypeContainer.getNonTerminal().representation==EDGE){

		}else if(valueTypeContainer.getNonTerminal().representation==ARRAY){

		}
	}

}

class ContainerNodePair {
	container: ParentParseTreeNode;
	node: GFNode;
	constructor(container: ParentParseTreeNode, node: GFNode) {
		this.container = container;
		this.node = node;
	}


}