const Parser=require('jison').Parser;

var grammer={
	"lex":{
		"rules":[
			["\\s+", "/* skip whitespace */"],
			["[a-f0-9]+", "return 'HEX';"]
		]
	},

	"bnf":{
		"hex_strings":[ "hex_strings HEX","HEX" ]
	}
};

var parser=new Parser(grammer);


parser.parse("adfe34bc e82a");

//this will throw an exception
// parser.parse("adfe34bc zxg");