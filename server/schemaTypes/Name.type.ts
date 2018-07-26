import mongoose from "mongoose"

export class Name extends mongoose.SchemaType {
	constructor(key: string, options: any) {
		super(key, options, "Name")
	}

	cast(val: { First: string; Last: string }) {
		if (!val || !val.First || !val.Last) {
			throw new Error(
				`Name: {First: ${val.First}, Last: ${
					val.Last
				}} is not assignable to the type Name`
			)
    }
    return val
	}
}
// @ts-ignore
mongoose.SchemaTypes.Name = Name
