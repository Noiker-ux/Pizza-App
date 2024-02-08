export function LoadState <T>(key: string):T|undefined{
	try{
		const jsonState = localStorage.getItem(key);
		if (!jsonState){
			return undefined;
		}
		return JSON.parse(jsonState);
	}   catch(e) {
		return undefined;
	}
}

export function saveState<T>(state:T, key:string){
	const strngState = JSON.stringify(state);
	localStorage.setItem(key, strngState);
}