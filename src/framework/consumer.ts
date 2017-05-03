import { GFStatement } from './statement';
import * as lexer from './compiler/lexical-analyzer';
import * as parser from './compiler/syntax-parser';

//Non Terminals
const NODE = "Node";
const CODEBLOCK="CodeBlock";
const ASSIGNMENT="Assignment";
const METHOD="Method";
const CODE="Code";
const ARGUMENTS="Arguments";
const EDGEBLOCK="EdgeBlock";

/** Spits out a bunch of graphful statements after compiling them internally */
export class GFConsumer {

	input: string;
	output: GFStatement[];
	static readonly ruleList = [
		`${NODE} -> $19 ${NODE} $20 | $E`
	];
	// static readonly ruleList = [
	// 	`${NODE} -> $19 ${NODE} $20 ${CODEBLOCK}| $3 ${EDGEBLOCK} ${NODE} | $3 ${EDGEBLOCK}`,
	// 	`${CODEBLOCK} -> $25 ${CODE} $26 | $E`,
	// 	`${CODE} -> ${ASSIGNMENT} | ${METHOD}`,
	// 	`${CODE} -> ${ASSIGNMENT} $11 ${CODE} | ${METHOD} $11 ${CODE} `,
	// 	`${ASSIGNMENT} -> $3 $34 $4 | $3 $34 $35 $3 $35`,
	// 	`${ASSIGNMENT} -> $3 $34 ${METHOD} | $3 $34 $35 $5 $35 `,
	// 	`${METHOD} -> $3 $23 ${ARGUMENTS} $24`,
	// 	`${ARGUMENTS} ->$4 | $35 $3 $35 | $4 $11 ${ARGUMENTS} | $35 $3 $35 $11 ${ARGUMENTS} | $E`,
	// 	`${EDGEBLOCK} -> $23 $3 $6 $3 $6 $3 $24 | $E`
	// ];

	static readonly cfg = parser.ContextFreeGrammer.grammerFrom(GFConsumer.ruleList);

	constructor(input: string) {
		this.input = input;
	}

	compile(): boolean {
		let parsingResult = GFConsumer.cfg.parse(this.input);
		// console.log(parsingResult);
		if (parsingResult.status == parser.ParsingStatus.Passed) {
			return true;
		}
		return false;
	}

}