import { GFStatement } from './statement';
import * as lexer from './compiler/lexical-analyzer';
import * as parser from './compiler/syntax-parser';

//Non Terminals
const NODE = "Node";

/** Spits out a bunch of graphful statements after compiling them internally */
export class GFConsumer {

	input: string;
	output: GFStatement[];
	static readonly ruleList = [
		`${NODE} -> $3 $25 $26 $36`
	];

	static readonly cfg = parser.ContextFreeGrammer.grammerFrom(GFConsumer.ruleList);

	constructor(input: string) {
		this.input = input;
	}

	compile(): boolean {
		let parsingResult = GFConsumer.cfg.parse(this.input);
		if (parsingResult.status == parser.ParsingStatus.Passed) {
			return true;
		}
		return false;
	}

}