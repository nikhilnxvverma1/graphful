import { NonTerminal,Terminal,SyntaxElementType } from 'framework/compiler/syntax-parser';
import { LexemeType } from 'framework/compiler/lexical-analyzer';

describe('Non Terminal', () => {
	let nonTerminal:NonTerminal;
	beforeEach(() => {
		nonTerminal=new NonTerminal(1);
	});

	it('should have type of non terminal',()=>{
		expect(nonTerminal.getType()).toEqual(SyntaxElementType.NonTerminal);
	});

	it('should not be augumented rule',()=>{
		expect(nonTerminal.id).not.toEqual(-1);
	});

});

describe('Terminal', () => {
	let terminal:Terminal;
	beforeEach(() => {
		terminal=new Terminal(LexemeType.Identifier);
	});

	it('should have type of terminal',()=>{
		expect(terminal.getType()).toEqual(SyntaxElementType.Terminal);
	});

	it('should not be end of file',()=>{
		expect(terminal.isEndOfFile()).toBeFalsy();
	});

});