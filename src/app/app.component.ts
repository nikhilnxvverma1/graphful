import { Component,OnInit } from '@angular/core';
import { getLexemeList } from '../framework/compiler/lexical-analyzer';
import * as sp from '../framework/compiler/syntax-parser';
import {SimpleCalculator} from '../framework/compiler/simple-calculator';
import { GFConsumer } from '../framework/consumer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
	title = 'app works!';

	ngOnInit(){
		// this.testMathExpression();
		// this.computeMathExpression("2-9+5-5+12");
		// this.testGraphfulExpression("[sdfg(id1-relation-id2)[gsfg]]{something(),another=4,yetAnother=`value`,fromMethod=method(3,`gasdf`)}");
		this.testGraphfulExpression("[]");
	}

	testMathExpression(){
		const testString="2+4";
		const lexemeList=getLexemeList(testString);
		// let ruleList=[//ambigious grammer
		// 	"Expr -> Expr Op Expr | Num",
		// 	"Op -> $4 | $5",
		// 	"Num -> $2"
		// ];
		let ruleList=[
			"Expr -> Expr Op Expr | $2",
			"Op -> $4 | $5"
		];
		// let ruleList=[
		// 	"E -> T $5 E | T",
		// 	"T -> $2"
		// ];
		let cfg = sp.ContextFreeGrammer.grammerFrom(ruleList);
		let parsingResult = cfg.parse("2+4-2");
		console.log(parsingResult);
	}

	computeMathExpression(expression:string){
		let calc=new SimpleCalculator(expression);
		if(calc.parsingResult.status==sp.ParsingStatus.Passed){
			console.log(`For the expression ${expression}, the result is ${calc.result}`);
		}else{
			console.log("Expression is invalid as per the context free grammer");
		}
		
	}

	testGraphfulExpression(input:string){
		let consumer=new GFConsumer(input);
		let passed=consumer.compile();
		if(passed){
			console.log("grammer passed");
		}else{
			console.log("grammer failed");
		}
	}
}
