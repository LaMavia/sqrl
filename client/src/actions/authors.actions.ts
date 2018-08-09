import { User } from "../dtos/user.dto"
import { Dispatch } from "redux";
import { sendQuery } from "../functions/sendQuery";

export const AUTHORS_LOADED = "AUTHORS_LOADED"

export const authorsLoaded = (authors: User[]) => ({
	type: AUTHORS_LOADED,
	authors
})

// Functions -----------------

export const getAuthors = (apiURL: string, conditions: string) =>
	[apiURL, conditions].some(x => typeof x === "undefined")
		// @ts-ignore because of "this" binding
		? getAuthors.bind(this, ...[apiURL, conditions])
		: (dispatch: Dispatch) => {
			sendQuery(`
			{
	
				Users(${conditions}) {
					_id
					Name
					Username
					Email
					ProfileImageURL
					BackgroundImageURL
				}
	
			}
		`, {}, apiURL)
				.then(res => res.json())
				.then(({ data }) => dispatch(authorsLoaded(data.Users)))

		}