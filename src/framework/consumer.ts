import { GFStatement } from './statement';
import * as lexer from './compiler/lexical-analyzer';
import * as parser from './compiler/syntax-parser';

//Non Terminals
const NODE = "Node";
const CODEBLOCK="CodeBlock";
const ASSIGNMENT="Assignment";
const INVOCATION="Invocation";

/** Spits out a bunch of graphful statements after compiling them internally */
export class GFConsumer {

	input: string;
	output: GFStatement[];
	static readonly ruleList = [
		`${NODE} -> $19 ${NODE} $20 ${CODEBLOCK}| $3 ${NODE} | $3`,
		`${CODEBLOCK} -> $25 ${ASSIGNMENT} $26 | $E`,
		`${ASSIGNMENT} -> $3 $34 $4 | $3 $34 $35 $3 $35`
	];

	static readonly cfg = parser.ContextFreeGrammer.grammerFrom(GFConsumer.ruleList);

	constructor(input: string) {
		this.input = input;
	}

	compile(): boolean {
		let parsingResult = GFConsumer.cfg.parse(this.input);
		console.log(parsingResult);
		if (parsingResult.status == parser.ParsingStatus.Passed) {
			return true;
		}
		return false;
	}

}