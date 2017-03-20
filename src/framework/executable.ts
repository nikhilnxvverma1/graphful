import { GFExecutionItem } from './execution-item';
import { GFFunctionHandler } from './function-handler';

export class GFExecutable{
	itemList:GFExecutionItem[];
	/** Key value pairs that could be in the form of json data*/
	attributes:any;

	/** Flag that indicates the execution has happened at least once*/
	finishedExecution:boolean;

	/** Flag specifying weather this block was auto executed by the processor or not */
	autoExecuted:boolean;

	execute(handler:GFFunctionHandler){
		//TODO execute each item in the itemList
	}
}