import { descriptorIsFunc } from './_helpers'

export const Timer = (label: string) => <T = any>(
	_target: Object,
	_name: string,
	descriptor: TypedPropertyDescriptor<T>
) => {
	// @ts-ignore
	const original = descriptor.value
	if (typeof original === 'function') {
		// @ts-ignore
		descriptor.value = function(...args) {
			console.time(label)
			debugger
			try {
				// @ts-ignore
				const result = original.apply(this, args)
				return result
			} catch (e) {
				console.log(`Error: ${e}`)
				throw e
			} finally {
				console.log(`${label}->${JSON.stringify(args)}`)
				console.timeEnd(label)
				console.log()
			}
		}
	}
	return descriptor
}

export const TryChatch = (errorHandler?: (...args: any[]) => any) => {
	if (!(typeof errorHandler === 'function') && errorHandler) {
		throw Error(
			`The ErrorHandler should be a function. ${JSON.stringify(
				errorHandler
			)} is not a function`
		)
	}

	return <T>(
		_target: Object,
		key: string | Symbol,
    descriptor: TypedPropertyDescriptor<T>
  ) => {
		const func = descriptor.value
		descriptorIsFunc(key, func)
		// @ts-ignore
		descriptor.value = function(...args: any[]) {
			let res
			try {
				// @ts-ignore
				res = func.apply(this, args)
			} catch (e) {
				;(errorHandler || console.error)(e)
			}
			return res
		}
		return descriptor
	}
}