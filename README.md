# Graphful
Graphful is a domain specific language(DSL) for defining graph data. Unlike JSON and XML, Graphful establishes connections (as edges) between data nodes. 

## Description
To create any language, there are essentially two levels of development: The __frontend__ and the __backend__. Each contains a series of stages. The __frontend__ invloves a language's syntax, semantics and intermediate code. The __backend__ essentially comprises of the final _value_ that one aims achieve. In this case, the aim is to capture graph based data in a textual format.

## Current Status
1. Lexical Analysis(basic version implemented)
2. Syntax Parsing(LR(1) parser implemented)
3. Semantic Analysis (undone)
4. Backend framework (realized and implemented early design)

## Instructions
1. npm install
2. Make sure [OrientDB server is installed and running](http://orientdb.com/docs/2.1/Tutorial-Run-the-server.html)
3. npm run build:client
4. npm run compile:server
5. npm start
6. npm run watch:client (in a separate window)