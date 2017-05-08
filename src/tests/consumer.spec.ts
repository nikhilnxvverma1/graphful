import { ParserTable } from 'framework/compiler/parser-table';
import { ContextFreeGrammer,ParentParseTreeNode,LeafParseTreeNode } from 'framework/compiler/syntax-parser';
import { GFConsumer } from 'framework/consumer';
import { GFGraph } from 'framework/graph';
import { GFNode } from 'framework/node';
import { GFEdge } from 'framework/edge';
import { readFileSync } from 'fs';

describe('Graphful', () => {

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

		it('should work for negative floating attributes node1<MyType>{foo= -2.4};',()=>{
			let consumer=new GFConsumer("node1<MyType>{foo= -2.4};");
			consumer.compile();
			let node=consumer.graph.nodeList[0];
			expect(node.id).toBe("node1");
			expect(node.type).toBe("MyType");
			expect(node.getAttributeValue("foo")).toBe(-2.4);
		});

		it('should yield node with correct attributes for int, string and float: node1{foo=23,bar=`asfga`,baz=2.3,};',()=>{
			let consumer=new GFConsumer("node1{foo=23,bar=`asfga`,baz=2.3};");
			consumer.compile();
			let node=consumer.graph.nodeList[0];
			expect(node.id).toBe("node1");

			//test if attributes match
			expect(node.getAttributeValue("foo")).toBe(23);
			expect(node.getAttributeValue("bar")).toBe("asfga");
			expect(node.getAttributeValue("baz")).toBe(2.3);
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
		checkSpecsSyntax(consumer.graph);
	})

	function checkSpecsSyntax(graph:GFGraph){
		expect(graph.nodeList.length).toBe(8);

		let sceneNode=graph.getNodeById("scene");
		expect(sceneNode.type).toBe("GLScene");

		//camera
		let cameraNode=sceneNode.getAttributeValue("camera");
		expect(cameraNode).toBeTruthy();
		expect(cameraNode.type).toBe("Camera");
		expect(cameraNode.getAttributeValue("origin_z")).toBe(5);
		expect(cameraNode.getAttributeValue("origin_y")).toBe(3);
		expect(cameraNode.getAttributeValue("lookAt_y")).toBe(-1);
		expect(cameraNode.getAttributeValue("up_y")).toBe(1);
		expect(cameraNode.getAttributeValue("near")).toBe(1);
		expect(cameraNode.getAttributeValue("far")).toBe(100);
		expect(cameraNode.getAttributeValue("left")).toBe(-10);
		expect(cameraNode.getAttributeValue("right")).toBe(10);
		expect(cameraNode.getAttributeValue("top")).toBe(10);
		expect(cameraNode.getAttributeValue("bottom")).toBe(-10);
		
		//ambientLight
		let ambientLightNode=sceneNode.getAttributeValue("ambientLight");
		expect(ambientLightNode).toBeTruthy();
		expect(ambientLightNode.type).toBe("Color");
		expect(ambientLightNode.getAttributeValue("r")).toBe(200);
		expect(ambientLightNode.getAttributeValue("g")).toBe(200);
		expect(ambientLightNode.getAttributeValue("b")).toBe(200);
		expect(ambientLightNode.getAttributeValue("a")).toBe(255);

		//light list
		let lightArray=sceneNode.getAttributeValue("lightList");
		expect(lightArray.type).toBe("Array");
		expect(lightArray).toBeTruthy();
		expect(lightArray.edgeList.length).toBe(2);

		//light1
		let light1Node=lightArray.getAttributeValue("0");
		expect(light1Node).toBeTruthy();
		expect(light1Node.type).toBe("Light");
		expect(light1Node.getAttributeValue("x")).toBe(0);
		expect(light1Node.getAttributeValue("y")).toBe(2);
		expect(light1Node.getAttributeValue("z")).toBe(5);
		expect(light1Node.getAttributeValue("initWith")).toBe("#FFFF36");

		//light2
		let light2Node=lightArray.getAttributeValue("1");
		expect(light2Node).toBeTruthy();
		expect(light2Node.type).toBe("Light");
		expect(light2Node.getAttributeValue("x")).toBe(15);
		expect(light2Node.getAttributeValue("y")).toBe(0);
		expect(light2Node.getAttributeValue("z")).toBe(-2);
		expect(light2Node.getAttributeValue("initWith")).toBe("#DE72A4");
		

		//drawable list
		let drawableArray=sceneNode.getAttributeValue("drawableList");
		expect(drawableArray.type).toBe("Array");
		expect(drawableArray).toBeTruthy();
		expect(drawableArray.edgeList.length).toBe(3);

		//cylinder
		let cylinder=drawableArray.getAttributeValue("0");
		expect(cylinder).toBeTruthy();
		expect(cylinder.type).toBe("CustomVertexDrawable");
		expect(cylinder.getAttributeValue("shape")).toBe("cylinder");
		
		//cylinder args
		let cylinderArgs=cylinder.getAttributeValue("args");
		expect(cylinderArgs.type).toBe("Array");
		expect(cylinderArgs).toBeTruthy();
		expect(cylinderArgs.edgeList.length).toBe(2);
		expect(cylinderArgs.getAttributeValue("0")).toBe(7);
		expect(cylinderArgs.getAttributeValue("1")).toBe(5);

		//cube
		let cube=drawableArray.getAttributeValue("1");
		expect(cube).toBeTruthy();
		expect(cube.type).toBe("CustomVertexDrawable");
		expect(cube.getAttributeValue("shape")).toBe("cube");
		expect(cube.getAttributeValue("x")).toBe(-15);
		
		//cube args
		let cubeArgs=cube.getAttributeValue("args");
		expect(cubeArgs.type).toBe("Array");
		expect(cubeArgs).toBeTruthy();
		expect(cubeArgs.edgeList.length).toBe(1);
		expect(cubeArgs.getAttributeValue("0")).toBe(3);

		//sphere
		let sphere=drawableArray.getAttributeValue("2");
		expect(sphere).toBeTruthy();
		expect(sphere.type).toBe("CustomVertexDrawable");
		expect(sphere.getAttributeValue("shape")).toBe("sphere");
		expect(sphere.getAttributeValue("x")).toBe(16);
		
		//sphere args
		let sphereArgs=sphere.getAttributeValue("args");
		expect(sphereArgs.type).toBe("Array");
		expect(sphereArgs).toBeTruthy();
		expect(sphereArgs.edgeList.length).toBe(1);
		expect(sphereArgs.getAttributeValue("0")).toBe(4);

		
	}
});


