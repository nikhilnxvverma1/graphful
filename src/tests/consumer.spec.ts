import { ParserTable } from 'framework/compiler/parser-table';
import { ContextFreeGrammer,ParentParseTreeNode,LeafParseTreeNode } from 'framework/compiler/syntax-parser';
import { GFConsumer } from 'framework/consumer';
import { GFGraph } from 'framework/graph';
import { GFNode } from 'framework/node';
import { GFEdge } from 'framework/edge';
import { readFileSync } from 'fs';

xdescribe('Graphful', () => {

	describe('Syntax', () => {
		it('should successfully parse single node: node1{};',()=>{
			let consumer=new GFConsumer("node1{};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully parse type: node1<MyType>{};',()=>{
			let consumer=new GFConsumer("node1<MyType>{};");
			expect(consumer.compile()).toBeTruthy();
		});

		it('should successfully parse 2 nodes: node1<MyType>{};node2<SomeOtherType>{};',()=>{
			let consumer=new GFConsumer("node1<MyType>{};node2<SomeOtherType>{};");
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

	describe('Semantic', () => {
		
		it('should yield single node for node1{};',()=>{
			let consumer=new GFConsumer("node1{};");
			consumer.compile();
			let node=consumer.graph.nodeList[0];
			expect(node.id).toBe("node1");
		});

		it('should yield single node for node1<MyType>{};',()=>{
			let consumer=new GFConsumer("node1<MyType>{};");
			consumer.compile();
			let node=consumer.graph.nodeList[0];
			expect(node.id).toBe("node1");
			expect(node.type).toBe("MyType");
		});

		it('should yield node with correct attributes for int, string and float: node1{foo=23,bar=`asfga`,baz=2.3,};',()=>{
			let consumer=new GFConsumer("node1{foo=23,bar=`asfga`,baz=2.3};");
			consumer.compile();
			let node=consumer.graph.nodeList[0];
			expect(node.id).toBe("node1");

			//test if attributes match
			// expect(node.attributes[0].name).toBe("foo");
			// expect(node.attributes[0].object.value).toBe(23);

			// expect(node.attributes[1].name).toBe("bar");
			// expect(node.attributes[1].object.value).toBe("asfga");

			// expect(node.attributes[2].name).toBe("baz");
			// expect(node.attributes[2].object.value).toBe(2.3);
		});

		it('should yield 2 nodes connected via edge for node1<MyType>{foo=(node2)}; node2{}',()=>{
			let consumer=new GFConsumer("node1<MyType>{foo=(node2)}; node2{};");
			let syntaxOk=consumer.compile();

			expect(syntaxOk).toBeTruthy();

			let node1=consumer.graph.nodeList[0];
			expect(node1.id).toBe("node1");
			expect(node1.type).toBe("MyType");

			let node2=consumer.graph.nodeList[1];
			expect(node2.id).toBe("node2");
			
			expect(node1.edgeList[0].name).toBe("foo");
			expect(node1.edgeList[0].node2).toBe(node2);
		});

	});

});

describe("Graphics Specs",()=>{

	let specs=`

		scene<GLScene>{
			camera=(camera),
			drawableList=[(cylinder),(cube),(sphere)],
			lightList=[(light1),(light2)],
			ambientLight=(ambientLight)
		};

		camera<Camera>{
			origin_z=5,
			origin_y=3,
			lookAt_y=-1,
			up_y=1,
			near=1,
			far=100,
			left=-10,
			right=10,
			top=10,
			bottom=-10,
		};

		ambientLight<Color>{
			r=200,
			g=200,
			b=200,
			a=255
		};

		light1<Light>{
			x=0,
			y=2,
			z=5,
			initWith="#FFFF36"
		};

		light2<Light>{
			x=15,
			y=0,
			z=-2,
			initWith="#DE72A4"
		};

		cylinder<CustomVertexDrawable>{
			shape="cylinder",
			args=[7,5]
		};

		cube<CustomVertexDrawable>{
			shape="cube",
			x=-15,
			args=[3]
		};

		sphere<CustomVertexDrawable>{
			shape="sphere",
			x=16,
			args=[4]
		};


	`;
	it("should parse simple graphics code",()=>{
		let consumer=new GFConsumer(specs);
		let syntaxOk=consumer.compile();
		expect(syntaxOk).toBeTruthy();
	})
});


