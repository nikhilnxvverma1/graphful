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

		it('should emit literal lexeme for `34df5`',()=>{
			let lexemeList=getLexemeList("`34df5`");
			expect(lexemeList.length).toBe(1+1);// 1 for eof
			expect(lexemeList[0].type).toBe(LexemeType.Literal);
		});
	});

});