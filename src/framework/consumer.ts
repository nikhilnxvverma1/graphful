import { GFStatement } from './statement';
import * as lexer from './compiler/lexical-analyzer';
import * as parser from './compiler/syntax-parser';

const NODE = "Node";
const CODEBLOCK="CodeBlock"


/** Spits out a bunch of graphful statements after compiling them internally */
export class GFConsumer {

	input: string;
	output: GFStatement[];
	static readonly ruleList = [
		`${NODE} -> $19 ${NODE} $20 ${CODEBLOCK}| $3 ${NODE} | $3`,
		`${CODEBLOCK} -> $25 $26 | $E`
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