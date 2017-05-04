import { GFStatement } from './statement';
import * as lexer from './compiler/lexical-analyzer';
import { ParsingResult, ParsingStatus, ContextFreeGrammer } from './compiler/syntax-parser';
import { GFGraph } from './graph';

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
		`${STRING} -> $35 $3 $35`, //TODO change to support string on lexical stage
		`${EDGE} -> $23 $3 $24`,
		`${ARRAY} -> $19 ${VALUE_LIST} $20`,
		`${VALUE_LIST} -> ${VALUE} $11 ${VALUE_LIST} | ${VALUE} | $E`,
		
	];

	static readonly cfg = ContextFreeGrammer.grammerFrom(GFConsumer.ruleList);

	constructor(input: string) {
		this.input = input;
	}

	compile(): boolean {
		let parsingResult = GFConsumer.cfg.parse(this.input);
		if (parsingResult.status != ParsingStatus.Passed) {
			return false;
		}
		this.convertParseTreeToGraph(parsingResult);
		return true;
	}

	private convertParseTreeToGraph(parsingResult: ParsingResult) {
		let root=parsingResult.root;
	}

}