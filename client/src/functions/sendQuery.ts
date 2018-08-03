interface ObjectLit {
	[key: string]: any
}
export const sendQuery = (
	query: string,
	variables: ObjectLit = {},
	apiURL = `${location.origin}/graphql`
) =>
	fetch(apiURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({ query, variables }),
		mode: "cors"
	})
