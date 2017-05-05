import { GFEdge } from 'framework/edge';

export enum GFObjectType{
	Integer,
	Float,
	String,
	Array,
	Edge
}

export interface GFObject{
	value:any;
	getType():GFObjectType;
}

export class GFIntegerObject implements GFObject{
	value:number;

	constructor(value:number){
		this.value=value;
	}

	getType():GFObjectType{
		return GFObjectType.Integer;
	}
}

export class GFFloatObject implements GFObject{
	value:number;

	constructor(value:number){
		this.value=value;
	}

	getType():GFObjectType{
		return GFObjectType.Float;
	}
}

export class GFStringObject implements GFObject{
	value:string;

	constructor(value:string){
		this.value=value;
	}

	getType():GFObjectType{
		return GFObjectType.String;
	}
}

export class GFArrayObject implements GFObject{
	value:GFObject[];

	getType():GFObjectType{
		return GFObjectType.Array;
	}
}

export class GFEdgeObject implements GFObject{
	value:GFEdge;

	constructor(value:GFEdge){
		this.value=value;
	}

	getType():GFObjectType{
		return GFObjectType.Edge;
	}
}