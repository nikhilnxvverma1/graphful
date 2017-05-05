import { NonTerminal,Terminal,SyntaxElementType } from 'framework/compiler/syntax-parser';
import { Rule,ContextFreeGrammer } from 'framework/compiler/syntax-parser';
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

describe('ContextFreeGrammer generation for 5 rules', () => {
	let cfg:ContextFreeGrammer;
	let expectedNonTerminals;
	let expectedTerminals;
	let expectedRules;

	const ruleList = [
		"Expr -> Expr Op Expr | $4",
		"Op -> $6 | $7"
	];
	cfg=ContextFreeGrammer.grammerFrom(ruleList);
	expectedNonTerminals=2+1;//1 for the augumented rule
	expectedTerminals=3+1;//1 for eof
	expectedRules=4+1;//1 for augumented rule
	// beforeEach(() => {
	// });

	it('should start with an augumented rule',()=>{
		expect(cfg.start.isAugumentedVariable()).toBeTruthy();
	});

	it('should contain all the non terminals',()=>{
		expect(cfg.variableList.length).toBe(expectedNonTerminals);
	});

	it('should contain all the terminals',()=>{
		expect(cfg.terminalList.length).toBe(expectedTerminals);
	});

	it('should contain all the rules',()=>{
		expect(cfg.relation.length).toBe(expectedRules);
	});

	it('should have correct LHS in all the rules',()=>{
		expect(cfg.relation[0].lhs.isAugumentedVariable()).toBeTruthy();
		expect(cfg.relation[1].lhs.representation).toEqual("Expr");
		expect(cfg.relation[2].lhs.representation).toEqual("Expr");
		expect(cfg.relation[3].lhs.representation).toEqual("Op");
		expect(cfg.relation[4].lhs.representation).toEqual("Op");
	});

	it('should have correct RHS in all the rules',()=>{
		//augumented
		expect(cfg.relation[0].rhs[0].getType()).toBe(SyntaxElementType.NonTerminal);
		expect((cfg.relation[0].rhs[0] as NonTerminal).representation).toBe("Expr");

		//Expr -> Expr Op Expr
		expect(cfg.relation[1].rhs[0].getType()).toBe(SyntaxElementType.NonTerminal);
		expect((cfg.relation[1].rhs[0] as NonTerminal).representation).toBe("Expr");
		expect(cfg.relation[1].rhs[1].getType()).toBe(SyntaxElementType.NonTerminal);
		expect((cfg.relation[1].rhs[1] as NonTerminal).representation).toBe("Op");
		expect(cfg.relation[1].rhs[2].getType()).toBe(SyntaxElementType.NonTerminal);
		expect((cfg.relation[1].rhs[2] as NonTerminal).representation).toBe("Expr");

		//Expr -> $4
		expect(cfg.relation[2].rhs[0].getType()).toBe(SyntaxElementType.Terminal);
		expect((cfg.relation[2].rhs[0] as Terminal).token).toBe(4);
		
		//Op -> $6
		expect(cfg.relation[3].rhs[0].getType()).toBe(SyntaxElementType.Terminal);
		expect((cfg.relation[3].rhs[0] as Terminal).token).toBe(6);
		
		//Op -> $7
		expect(cfg.relation[4].rhs[0].getType()).toBe(SyntaxElementType.Terminal);
		expect((cfg.relation[4].rhs[0] as Terminal).token).toBe(7);
		
		
	});

	it("should identify shift reduce conflicts",()=>{
		expect(cfg.hasShiftReduceConflicts()).toBeTruthy();
	});



});

describe('ContextFreeGrammer : Node -> id', () => {

	let cfg:ContextFreeGrammer;
	let expectedNonTerminals;
	let expectedTerminals;
	let expectedRules;

	const ruleList = [
		"Node -> $3"
	];
	cfg=ContextFreeGrammer.grammerFrom(ruleList);
	expectedNonTerminals=1+1;//1 for the augumented rule
	expectedTerminals=1+1;//1 for eof
	expectedRules=1+1;//1 for augumented rule

	describe('Construction and parser table', () => {
		it('should start with an augumented rule',()=>{
				expect(cfg.start.isAugumentedVariable()).toBeTruthy();
			});

			it('should contain all the non terminals',()=>{
				expect(cfg.variableList.length).toBe(expectedNonTerminals);
			});

			it('should contain all the terminals',()=>{
				expect(cfg.terminalList.length).toBe(expectedTerminals);
			});

			it('should contain all the rules',()=>{
				expect(cfg.relation.length).toBe(expectedRules);
			});

			it('should have correct LHS in all the rules',()=>{
				expect(cfg.relation[0].lhs.isAugumentedVariable()).toBeTruthy();
				expect(cfg.relation[1].lhs.representation).toEqual("Node");
			});

			it('should have correct RHS in all the rules',()=>{
				//augumented
				expect(cfg.relation[0].rhs[0].getType()).toBe(SyntaxElementType.NonTerminal);
				expect((cfg.relation[0].rhs[0] as NonTerminal).representation).toBe("Node");

				//Node -> identifier
				expect(cfg.relation[1].rhs[0].getType()).toBe(SyntaxElementType.Terminal);
				expect((cfg.relation[1].rhs[0] as Terminal).token).toBe(3);
				
			});
	});

	describe('Parsing input', () => {
		it('should parse simple asdf3',()=>{
			expect(cfg.parse("asdf3")).toBeTruthy();
		});
	});
});
