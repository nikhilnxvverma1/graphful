import { ParserTable } from 'framework/compiler/parser-table';
import { GFConsumer } from 'framework/consumer';

describe('Consumer', () => {

	describe('Successful syntax parsing', () => {
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

		it('should successfully parse 3 attributes: node1{foo=23,bar=`asfga`,baz=2.3};',()=>{
			let consumer=new GFConsumer("node1{foo=23,bar=`asfga`,baz=2.3};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully accept ending comma in last attribute: node1{foo=23,bar=`asfga`,baz=2.3,};',()=>{
			let consumer=new GFConsumer("node1{foo=23,bar=`asfga`,baz=2.3};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully handle spaces between attributes: node1{foo=23,		bar=`asfga`,  baz=2.3};',()=>{
			let consumer=new GFConsumer("node1{foo=23,bar=`asfga`,baz=2.3};");
			expect(consumer.compile()).toBeTruthy();
		});
	});

});