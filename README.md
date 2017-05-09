# Graphful
Graphful is a domain specific language(DSL) for defining graph data. Unlike JSON and XML, Graphful establishes connections (as edges) between data nodes. 

## Description
To create any language, there are essentially two levels of development: The __frontend__ and the __backend__. Each contains a series of stages. The __frontend__ invloves a language's syntax, semantics and intermediate code. The __backend__ essentially comprises of the final _value_ that one aims achieve. In this case, the aim is to capture graph based data in a textual format.

## Current Status
1. Lexical Analysis - done
2. Syntax Parsing using LR(1) parser - done
4. Context Free Grammer of the language - done
3. Semantic parsing of parse tree - done
4. Graph data structure - done

## Instructions
Make sure you have node >= 6.9.0
1. npm install
2. npm test