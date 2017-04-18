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

		
	}
}
