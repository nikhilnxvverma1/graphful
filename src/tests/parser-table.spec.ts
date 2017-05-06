import { ParserTable } from 'framework/compiler/parser-table';
import { ContextFreeGrammer } from 'framework/compiler/syntax-parser';
import { ParsingResult,ParsingStatus } from 'framework/compiler/syntax-parser';

describe('Parser table', () => {
	let ruleList=[
		`S -> B C | D A`,
		`B -> $7`,
		`C -> A A`,
		`A -> $6`,
		`D -> $7 $6`

	]
	let cfg=ContextFreeGrammer.grammerFrom(ruleList,"Samya Daleh");

	it(`should be able to parse 'baabaa'`,()=>{
		let parsingResult=cfg.parse(`baabaa`);
		expect(parsingResult.status).toBe(ParsingStatus.Passed);
	})

});