export type DataState = {
		data: Data
	}
	
export  type Lang =  {
	[key:string]:string
}

export type Data =  {
	lang:string,
	L: {[lang:string]:Lang},
	page: string,
	address: string
}
/* export type Pair =  {
	token1:string,
	token2:string,
	reward:string,
	daily:number,
	apr:number
} */

/* export type ChartData =  {
	time:string,
	y:number
} */
export type MineState =  {
	pairs: Array<string>,
	/* chart: Array<ChartData>, */
	tvl:number
}
