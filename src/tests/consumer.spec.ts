import { ParserTable } from 'framework/compiler/parser-table';
import { ContextFreeGrammer } from 'framework/compiler/syntax-parser';
import { GFConsumer } from 'framework/consumer';
import { GFGraph } from 'framework/graph';
import { GFNode } from 'framework/node';
import { GFEdge } from 'framework/edge';

describe('Consumer', () => {

	describe('Syntax parsing', () => {
		it('should successfully parse single node: node1{};',()=>{
			let consumer=new GFConsumer("node1{};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully parse type: node1<MyType>{};',()=>{
			let consumer=new GFConsumer("node1<MyType>{};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully parse 1 attributes of int: node1{foo=23};',()=>{
			let consumer=new GFConsumer("node1{foo=23};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully parse 1 attributes of string: node1{foo=`osmestring`};',()=>{
			let consumer=new GFConsumer("node1{foo=`osmestring`};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully parse 1 attributes of float: node1{foo=2.3};',()=>{
			let consumer=new GFConsumer("node1{foo=2.3};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully parse 2 attributes: node1{foo=23,bar=`asfga`};',()=>{
			let consumer=new GFConsumer("node1{foo=23,bar=`asfga`};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully parse 3 attributes: node1{\n\tfoo=23,\n\tbar=`asfga`,\n\tbaz=2.3\n};',()=>{
			let consumer=new GFConsumer("node1{\nfoo=23,\nbar=`asfga`,\nbaz=2.3};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully accept ending comma in last attribute: node1{foo=23,bar=`asfga`,baz=2.3,};',()=>{
			let consumer=new GFConsumer("node1{foo=23,bar=`asfga`,baz=2.3};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully handle spaces between attributes: node1{foo=23,		bar=`asfga`,  baz=2.3};',()=>{
			let consumer=new GFConsumer("node1{foo=23,		bar=`asfga`,  baz=2.3};");
			expect(consumer.compile()).toBeTruthy();
		});
	});

	describe('Semantic graph', () => {
		
		it('should yield single node for node1{};',()=>{
			let consumer=new GFConsumer("node1{};");
			consumer.compile();
			let node=consumer.output.nodeList[0];
			expect(node.id).toBe("node1");
		});

		it('should yield single node for node1<MyType>{};',()=>{
			let consumer=new GFConsumer("node1<MyType>{};");
			consumer.compile();
			let node=consumer.output.nodeList[0];
			expect(node.id).toBe("node1");
			expect(node.type).toBe("MyType");
		});

		it('should yield node with correct attributes for int, string and float: node1{foo=23,bar=`asfga`,baz=2.3,};',()=>{
			let consumer=new GFConsumer("node1{foo=23,bar=`asfga`,baz=2.3};");
			consumer.compile();
			let node=consumer.output.nodeList[0];
			expect(node.id).toBe("node1");
			//TODO test if attributes match
		});

	});

});