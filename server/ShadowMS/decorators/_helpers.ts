export const descriptorIsFunc = (key: string | Symbol, func: any) => {
	if (!(typeof func === 'function')) {
		throw Error(`${key} is not a function!`)
	}
	return true
}
