import mongoose from "mongoose"
import dotenv from "dotenv"

export default async () => {
	const _env = process.env["NODE_ENV"] || "dev"
	if (_env === "production") dotenv.config()
	else dotenv.config({ path: "./dev.env" })

	await mongoose
		.connect(
			String(process.env["DB_LINK"]),
			{
				useNewUrlParser: true
			}
		)
		.catch(err => {
			console.error(err)
			throw new Error("Cannot connect to the Database")
		})
	return mongoose.connection
}