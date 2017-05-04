import { getLexemeList,LexemeType } from 'framework/compiler/lexical-analyzer';
describe('Lexical Analysis', () => {

	describe('Lexeme types', () => {
		it('should emit Identifier lexeme for  id3nt13r',()=>{
			let lexemeList=getLexemeList("id3nt13r");
			expect(lexemeList.length).toBe(1+1);// 1 for eof
			expect(lexemeList[0].type).toBe(LexemeType.Identifier);
		});

		it('should emit Number lexeme for 345',()=>{
			let lexemeList=getLexemeList("345");
			expect(lexemeList.length).toBe(1+1);// 1 for eof
			expect(lexemeList[0].type).toBe(LexemeType.Number);
		});

		it('should emit literal lexeme for backticks `34df5`',()=>{
			let lexemeList=getLexemeList("`34df5`");
			expect(lexemeList.length).toBe(1+1);// 1 for eof
			expect(lexemeList[0].type).toBe(LexemeType.Literal);
		});

		it('should emit literal lexeme for double quotes "34df5"',()=>{
			let lexemeList=getLexemeList(`"34df5"`);
			expect(lexemeList.length).toBe(1+1);// 1 for eof
			expect(lexemeList[0].type).toBe(LexemeType.Literal);
		});
		
		it("should emit literal lexeme for single quotes '34df5'",()=>{
			let lexemeList=getLexemeList("'34df5'");
			expect(lexemeList.length).toBe(1+1);// 1 for eof
			expect(lexemeList[0].type).toBe(LexemeType.Literal);
		});

		xit("should emit literal lexeme for escaped strings '34\\'df5'",()=>{
			let lexemeList=getLexemeList("'34\\'df5'");
			expect(lexemeList.length).toBe(1+1);// 1 for eof
			expect(lexemeList[0].type).toBe(LexemeType.Literal);
		});
	});

	describe('Whitespace and newline', () => {
		it("should ignore whitespaces in 4+ 4 - 3",()=>{
			let lexemeList=getLexemeList("4+ 4 - 3");
			expect(lexemeList.length).toBe(5+1);// 1 for eof
			expect(lexemeList[0].type).toBe(LexemeType.Number);
			expect(lexemeList[1].type).toBe(LexemeType.Plus);
			expect(lexemeList[2].type).toBe(LexemeType.Number);
			expect(lexemeList[3].type).toBe(LexemeType.Minus);
			expect(lexemeList[4].type).toBe(LexemeType.Number);
		});
		it("should ignore newline in 4+4\n- 3",()=>{
			let lexemeList=getLexemeList("4+4\n- 3");
			expect(lexemeList.length).toBe(5+1);// 1 for eof
			expect(lexemeList[0].type).toBe(LexemeType.Number);
			expect(lexemeList[1].type).toBe(LexemeType.Plus);
			expect(lexemeList[2].type).toBe(LexemeType.Number);
			expect(lexemeList[3].type).toBe(LexemeType.Minus);
			expect(lexemeList[4].type).toBe(LexemeType.Number);
		});

		it("should ignore tabs in 4+4\t- 3",()=>{
			let lexemeList=getLexemeList("4+4\t- 3");
			expect(lexemeList.length).toBe(5+1);// 1 for eof
			expect(lexemeList[0].type).toBe(LexemeType.Number);
			expect(lexemeList[1].type).toBe(LexemeType.Plus);
			expect(lexemeList[2].type).toBe(LexemeType.Number);
			expect(lexemeList[3].type).toBe(LexemeType.Minus);
			expect(lexemeList[4].type).toBe(LexemeType.Number);
		});
	});

});