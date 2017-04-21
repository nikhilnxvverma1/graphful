import { Component,OnInit } from '@angular/core';
import { getLexemeList } from '../framework/compiler/lexical-analyzer';
import * as sp from '../framework/compiler/syntax-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
	title = 'app works!';

	ngOnInit(){
		this.testMathExpression();
	}

	testMathExpression(){
		const testString="2+4";
		const lexemeList=getLexemeList(testString);
		let ruleList=[
			"Expr -> Expr Op Expr | Num",
			"Op -> $4 | $5",
			"Num -> $2"
		];
		let cfg = sp.ContextFreeGrammer.grammerFrom(ruleList);
		let parsingResult = cfg.parse("2+4-2");
		console.log(parsingResult);
	}
}
